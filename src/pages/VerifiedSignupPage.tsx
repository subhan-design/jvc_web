const getRuntimeConfig = () => (window as any).__RUNTIME_CONFIG__ || { environment: 'production' };
const getIsDev = () => getRuntimeConfig().environment === 'development';
const getConsumerVerifiedEnvironment = () => {
  const rc = getRuntimeConfig();
  const ec = rc[rc.environment] || {};
  return ec.consumerVerifiedEnvironment || 'production';
};
// ─────────────────────────────────────────────────────────────────────────────
// VerifiedSignupPage.tsx
// Verified 1-Click Signup embedded flow for JVC Rewards
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { createVerifiedSession, getVerifiedUserByIdentity } from '@/lib/api';
import { useConsumerData } from '@/context/ConsumerDataContext';
import DisclosuresAndReferralScreen from '@/components/consumer-application/verified-signup/DisclosuresAndReferralScreen';
import OfferScreen from '@/components/consumer-application/verified-signup/OfferScreen';
import RewardsCreatedScreen from '@/components/consumer-application/verified-signup/RewardsCreatedScreen';
import MarketAreaRestrictedModal, { isMarketAreaRestricted, type MarketAreaError } from '@/components/consumer-application/MarketAreaRestrictedModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Import Verified SDK types
// Install: npm install @verifiedinc-public/client-sdk
import type { VerifiedClientSdk } from '@verifiedinc-public/client-sdk';

// SDK event types from Verified
type VerifiedResultType =
  | 'USER_SHARED_CREDENTIALS'
  | 'USER_OPTED_OUT'
  | 'NO_CREDENTIALS_FOUND'
  | 'RISK_SCORE_TOO_HIGH'
  | 'MAX_INPUT_ATTEMPTS_EXCEEDED'
  | 'MAX_VERIFICATION_CODE_ATTEMPTS_EXCEEDED';

interface VerifiedResultData {
  type: VerifiedResultType;
  identityUuid?: string;
}

interface OfferData {
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

// Flow states
type FlowState =
  | 'initializing'
  | 'sdk-ready'
  | 'saving-data'
  | 'disclosures'
  | 'offer'
  | 'success'
  | 'error';

export default function VerifiedSignupPage() {
  const navigate = useNavigate();
  const { setConsumerData, setCurrentStep, setIsFromVerified, setConsumerSessionId, sessionId: consumerSessionId, showResumeDialog, handleResumeSession, handleStartNewSession } = useConsumerData();
  const sdkRef = useRef<VerifiedClientSdk | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [flowState, setFlowState] = useState<FlowState>('initializing');
  const [identityUuid, setIdentityUuid] = useState<string>('');
  const [rewardsUserId, setRewardsUserId] = useState<string>('');
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [retryCount, setRetryCount] = useState<number>(0);
  const [marketAreaError, setMarketAreaError] = useState<MarketAreaError | null>(null);

  // Initialize Verified SDK
  const initializeVerifiedSDK = async () => {
    try {
      setFlowState('initializing');
      setErrorMessage('');

      if (getIsDev()) console.log('[Verified] Requesting session...');
      const { sessionKey, sessionId } = await createVerifiedSession();
      if (getIsDev()) console.log('[Verified] Session key received:', sessionKey, 'Session ID:', sessionId);

      //sets consumer session id returned from verified response
      if (sessionId) {
        setConsumerSessionId(sessionId);
      }

      // Set state to sdk-ready first to render the container
      setFlowState('sdk-ready');

      // Wait for next tick to ensure DOM is updated
      await new Promise(resolve => setTimeout(resolve, 100));

      // Dynamically import Verified SDK
      // NOTE: To switch from sandbox to production, change environment to 'production'
      const { VerifiedClientSdk } = await import('@verifiedinc-public/client-sdk');

      if (getIsDev()) console.log('[Verified] Initializing SDK...');
      const sdk = new VerifiedClientSdk({
        environment: getConsumerVerifiedEnvironment(),
        sessionKey,
        onResult: handleVerifiedResult,
        onError: handleVerifiedError,
      });

      sdkRef.current = sdk;
      
      // Embed SDK into container
      if (containerRef.current) {
        if (getIsDev()) console.log('[Verified] Embedding SDK into container...');
        sdk.show(containerRef.current);
        toast.success('Verified 1-Click Signup loaded');

        // Hide "Sign up manually instead" link rendered by SDK
        const hideManualLink = () => {
          if (!containerRef.current) return;
          containerRef.current.querySelectorAll('a, button, span, p, div').forEach((el) => {
            if (el.textContent?.toLowerCase().includes('manually')) {
              (el as HTMLElement).style.display = 'none';
            }
          });
        };
        hideManualLink();
        const observer = new MutationObserver(hideManualLink);
        observer.observe(containerRef.current, { childList: true, subtree: true });

        // --- Ensure Confirm button is visible (scroll into view if needed) ---
        setTimeout(() => {
          if (!containerRef.current) return;
          // Try to find a button with text 'Confirm' (case-insensitive)
          const confirmBtn = Array.from(containerRef.current.querySelectorAll('button, input[type="submit"], a'))
            .find(el => el.textContent?.toLowerCase().includes('confirm'));
          if (confirmBtn) {
            (confirmBtn as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 500);

        // Make container scrollable if content overflows (desktop only)
        if (window.innerWidth >= 640) {
          containerRef.current.style.overflowY = 'auto';
          containerRef.current.style.maxHeight = '590px';
        }
      } else {
        throw new Error('SDK container not found');
      }
    } catch (error: any) {
      if (getIsDev()) console.error('[Verified] Initialization error:', error);
      
      // Better error messages for different scenarios
      let userMessage = 'Failed to initialize Verified signup. Please try again.';
      
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError') || error.message?.includes('fetch')) {
        userMessage = 'Service temporarily unavailable. Our servers may be under maintenance. Please try again later or contact support at support@jvcrewards.com';
      } else if (error.message?.includes('timeout') || error.message?.includes('ECONNREFUSED')) {
        userMessage = 'Unable to connect to our services. Please check your internet connection or contact support at support@jvcrewards.com';
      } else if (error.message) {
        userMessage = error.message;
      }
      
      setErrorMessage(userMessage);
      setFlowState('error');
      toast.error('Service unavailable');
    }
  };

  // Handle Verified SDK result
  const handleVerifiedResult = async (data: VerifiedResultData) => {
    if (getIsDev()) console.log('[Verified] Result received:', data);

    switch (data.type) {
      case 'USER_SHARED_CREDENTIALS':
        // User successfully shared credentials
        if (data.identityUuid) {
          if (getIsDev()) console.log('[Verified] Identity UUID:', data.identityUuid);
          setIdentityUuid(data.identityUuid);
          toast.success('Identity verified successfully!');

          // Save verified user data to database before proceeding
          await saveVerifiedData(data.identityUuid);
        } else {
          if (getIsDev()) console.error('[Verified] Missing identityUuid in result');
          setErrorMessage('Identity verification failed. Missing user data.');
          setFlowState('error');
        }
        break;

      case 'USER_OPTED_OUT':
      case 'NO_CREDENTIALS_FOUND':
      case 'RISK_SCORE_TOO_HIGH':
      case 'MAX_INPUT_ATTEMPTS_EXCEEDED':
      case 'MAX_VERIFICATION_CODE_ATTEMPTS_EXCEEDED':
        // No-op — manual signup option is disabled
        if (getIsDev()) console.log('[Verified] Ignored opt-out. Reason:', data.type);
        break;

      default:
        if (getIsDev()) console.warn('[Verified] Unknown result type:', data.type);
        setErrorMessage('Unexpected result from Verified.');
        setFlowState('error');
    }
  };

  // Helper to format phone from Verified API: +12125550010 -> (212) 555-0010
  const formatPhone = (phone: string | undefined): string => {
    if (!phone) return '';
    let digits = phone.replace(/\D/g, '');
    if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
    if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    return phone;
  };

  // Helper to format birth date to YYYY-MM-DD
  const formatBirth = (birthDate: string | undefined): string => {
    if (!birthDate) return '';
    if (/^\d+$/.test(birthDate)) {
      const d = new Date(parseInt(birthDate, 10));
      if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) return birthDate;
    const d = new Date(birthDate);
    if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
    return birthDate;
  };

  // Fetch verified user data and move to SignUpStep
  const saveVerifiedData = async (uuid: string) => {
    try {
      setFlowState('saving-data');

      const currentSessionId = localStorage.getItem('consumer_onboarding_session');
      if (getIsDev()) console.log('[Verified] Fetching user data from backend...', 'sessionId:', currentSessionId);

      const response = await getVerifiedUserByIdentity(uuid, currentSessionId);

      if (response.success && response.data) {
        if (getIsDev()) console.log('[Verified] User data fetched successfully:', response.data);
        toast.success('User data retrieved!');

        const credentials = response.data.credentials;
        const signUpData = {
          firstName: credentials?.fullName?.firstName || '',
          lastName: credentials?.fullName?.lastName || '',
          email: '',
          phoneNumber: formatPhone(credentials?.phone),
          dateOfBirth: formatBirth(credentials?.birthDate),
          ssn: credentials?.ssn || '',
          ssnFull: credentials?.ssn || '',
          zipCode: credentials?.address?.zipCode || '',
          address: credentials?.address?.line1 || '',
          city: credentials?.address?.city || '',
          state: credentials?.address?.state || '',
        };

        if (getIsDev()) console.log('[Verified] Pre-populating signup form with:', signUpData);

        setConsumerData(prev => ({ ...prev, signUp: signUpData as any }));
        setIsFromVerified(true);
        setCurrentStep(2);
      } else {
        throw new Error(response.message || 'Failed to fetch user data');
      }
    } catch (error: any) {
      if (getIsDev()) console.error('[Verified] Failed to fetch user data:', error);

      // Check for market area restriction (out-of-state user)
      const areaError = isMarketAreaRestricted(error);
      if (areaError) {
        setMarketAreaError(areaError);
        setFlowState('sdk-ready'); // go back so user can see the modal over the SDK
        return;
      }

      setErrorMessage(error.message || 'Failed to retrieve your information. Please try again.');
      setFlowState('error');
      toast.error('Failed to fetch user data');
    }
  };

  // Handle Verified SDK errors
  const handleVerifiedError = (error: any) => {
    if (getIsDev()) console.error('[Verified] Error received:', error);

    switch (error.type) {
      case 'INVALID_SESSION_KEY':
      case 'SESSION_TIMEOUT':
      case 'SHARE_CREDENTIALS_ERROR':
        // Automatically retry with new session
        if (retryCount < 3) {
          if (getIsDev()) console.log(`[Verified] Retrying... Attempt ${retryCount + 1}/3`);
          setRetryCount((prev) => prev + 1);
          toast.warning('Session expired. Restarting...');
          setTimeout(() => {
            cleanupSDK();
            initializeVerifiedSDK();
          }, 1000);
        } else {
          if (getIsDev()) console.error('[Verified] Max retry attempts reached');
          setErrorMessage('Unable to connect to Verified. Please try manual signup.');
          setFlowState('error');
          toast.error('Connection failed. Please try manual signup.');
        }
        break;

      default:
        if (getIsDev()) console.error('[Verified] Unknown error type:', error.type);
        setErrorMessage(error.message || 'An unexpected error occurred.');
        setFlowState('error');
        toast.error(error.message || 'Signup error');
    }
  };

  // Handle disclosures acceptance and complete signup
  const handleDisclosuresComplete = async (
    acceptedDisclosures: boolean,
    referralCode?: string
  ) => {
    if (!acceptedDisclosures) {
      toast.error('You must accept all disclosures to continue');
      return;
    }

    if (getIsDev()) console.log('[Verified] Completing signup with referralCode:', referralCode);
    setFlowState('disclosures'); // Keep on disclosures while processing
  };

  // Handle signup completion response
  const handleSignupComplete = (
    userId: string,
    prescreenStatus: 'PREAPPROVED' | 'NOT_PREAPPROVED',
    offer?: OfferData
  ) => {
    setRewardsUserId(userId);

    if (prescreenStatus === 'PREAPPROVED' && offer) {
      // Show offer screen
      if (getIsDev()) console.log('[Verified] User preapproved. Showing offer...');
      setOfferData(offer);
      setFlowState('offer');
    } else {
      // Show success screen (not preapproved)
      if (getIsDev()) console.log('[Verified] User not preapproved. Showing success...');
      setFlowState('success');
    }
  };

  // Handle offer acceptance
  const handleOfferAccept = () => {
    if (getIsDev()) console.log('[Verified] User accepted offer');
    // TODO: Call backend to confirm offer acceptance
    setFlowState('success');
    toast.success('Offer accepted!');
  };

  // Cleanup SDK on unmount
  const cleanupSDK = () => {
    if (sdkRef.current) {
      if (getIsDev()) console.log('[Verified] Cleaning up SDK...');
      // Verified SDK cleanup (if SDK provides destroy method)
      // sdkRef.current.destroy?.();
      sdkRef.current = null;
    }
  };

  const handleStartNew = () => {
    handleStartNewSession();
    initializeVerifiedSDK();
  };

  // Initialize on mount (only once)
  useEffect(() => {
    const existingSession = localStorage.getItem('consumer_onboarding_session');
    if (!existingSession || existingSession==='undefined') {
      initializeVerifiedSDK();
    }
    else{
      setFlowState('sdk-ready');
    }
    return () => {
      cleanupSDK();
    };
  }, []); // Only run once on mount

  // Render based on flow state
  return (
    <>
      <Dialog open={showResumeDialog} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[500px]" onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-2xl">Welcome Back!</DialogTitle>
            <DialogDescription className="text-base pt-2">
              We found an existing application in progress. Would you like to continue where you left off, or start a new application?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleStartNew}
              className="w-full sm:w-auto"
            >
              Start New Application
            </Button>
            <Button
              onClick={handleResumeSession}
              className="w-full sm:w-auto"
            >
              Resume Previous Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {flowState === 'initializing' && (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-10 sm:p-12 text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Setting Up Your Experience
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Preparing your secure 1-Click signup...
        </p>

        {/* subtle progress dots */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>

      {/* bottom accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
    </div>
  )}

  {flowState === 'sdk-ready' && (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header strip */}
      <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">Verified 1-Click Signup</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Secure identity verification - takes about a minute
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Ready
          </span>
        </div>
      </div>

      {/* SDK frame */}
      <div className="p-2 sm:p-3">
        <div className="rounded-xl border border-gray-100 bg-white">
          <div
            // id="verifiedClientSdk-container"
            ref={containerRef}
            className="w-full min-h-[400px] sm:min-h-[600px] max-h-none sm:max-h-[600px] overflow-visible sm:overflow-y-auto"
            style={{ position: 'relative' }}
          />
        </div>
      </div>
    </div>
  )}

  {flowState === 'saving-data' && (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-10 sm:p-12 text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Saving Your Information
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Please wait while we securely save your verified data...
        </p>

        {/* subtle progress dots */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-green-600 animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-green-600 animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-green-600 animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>

      {/* bottom accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-green-600 via-teal-600 to-blue-600" />
    </div>
  )}

        {flowState === 'disclosures' && (
          <DisclosuresAndReferralScreen
            identityUuid={identityUuid}
            onComplete={handleDisclosuresComplete}
            onSignupComplete={handleSignupComplete}
            onBack={() => {
              cleanupSDK();
              initializeVerifiedSDK();
            }}
          />
        )}

        {flowState === 'offer' && offerData && (
          <OfferScreen
            offer={offerData}
            onAccept={handleOfferAccept}
            onDecline={() => {
              setFlowState('success');
              toast.info('Offer declined. Account still created.');
            }}
          />
        )}

        {flowState === 'success' && (
          <RewardsCreatedScreen
            rewardsUserId={rewardsUserId}
            hasOffer={!!offerData}
            onContinue={() => {
              // Navigate to rewards dashboard or home
              navigate('/');
              toast.success('Welcome to JVC Rewards!');
            }}
          />
        )}

        {/* Market Area Restriction Modal */}
        <MarketAreaRestrictedModal
          open={!!marketAreaError}
          onClose={() => setMarketAreaError(null)}
          error={marketAreaError}
        />

        {flowState === 'error' && (
          <div className="bg-white rounded-2xl shadow-2xl p-10 text-center backdrop-blur-sm max-w-2xl mx-auto">
            {/* Icon with animation */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center relative shadow-lg">
                <svg 
                  className="w-12 h-12 text-amber-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Service Temporarily Unavailable
            </h2>
            
            <p className="text-gray-600 mb-6 text-base leading-relaxed max-w-lg mx-auto">
              {errorMessage}
            </p>
            
            {/* Support contact info */}
            {/* <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl max-w-md mx-auto border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Assistance?</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:support@jvcrewards.com" className="text-blue-600 hover:text-blue-700 font-medium">
                    support@jvcrewards.com
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:18885678688" className="text-blue-600 hover:text-blue-700 font-medium">
                    1-888-567-8688
                  </a>
                </div>
              </div>
            </div> */}

            <p className="text-sm text-gray-500">
              We apologize for the inconvenience. Please try again later.
            </p>
          </div>
        )}
    </>

  );
}
