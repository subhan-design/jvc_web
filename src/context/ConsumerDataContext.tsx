import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ConsumerApplicationData } from "@/components/consumer-application/types";
import { createOnboardingSession, saveOnboardingStep, getOnboardingSession, type VerifiedUserData, getConsumerOnboardingSession } from '@/lib/api';
import { CLIENT_ID } from '@/config/app';
import { toast } from 'sonner';


type ConsumerDataContextType = {
  consumerData: ConsumerApplicationData;
  setConsumerData: React.Dispatch<React.SetStateAction<ConsumerApplicationData>>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  sessionId: string;
  setConsumerSessionId: (id: string) => void;
  saveStepToServer: (step: number, data: any) => Promise<any>;
  completeSession: () => void;
  showResumeDialog: boolean;
  handleResumeSession: () => void;
  handleStartNewSession: () => void;
  formKey: number;
  isFromVerified: boolean; // Flag to indicate if data came from Verified flow
  setIsFromVerified: (v: boolean) => void;
};

const ConsumerDataContext = createContext<ConsumerDataContextType | undefined>(undefined);

const CONSUMER_SESSION_STORAGE_KEY = 'consumer_onboarding_session';

export const ConsumerDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [consumerData, setConsumerData] = useState<ConsumerApplicationData>({});

  const [currentStep, setCurrentStepState] = useState<number>(1);
  const [sessionId, setSessionId] = useState<string>(() => {
  const stored = localStorage.getItem(CONSUMER_SESSION_STORAGE_KEY);
    
  return stored && stored !== 'undefined' ? stored : '';
  });
  const [remoteSessionCreated, setRemoteSessionCreated] = useState<boolean>(false);
  const [showResumeDialog, setShowResumeDialog] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(0);
  const [isFromVerified, setIsFromVerified] = useState<boolean>(false);

  // Ref to hold an in-flight ensureRemoteSession promise so concurrent callers wait on same creation
  const ensureRemoteSessionRef = useRef<Promise<string> | null>(null);

  // Helper function to convert birthDate from Verified API
  // Verified API returns birthDate as timestamp (milliseconds) or ISO string
  const formatBirthDate = (birthDate: string | undefined): string => {
    if (!birthDate) return '';

    // Check if it's a timestamp (all digits)
    if (/^\d+$/.test(birthDate)) {
      const date = new Date(parseInt(birthDate, 10));
      if (!isNaN(date.getTime())) {
        // Format as YYYY-MM-DD for input[type="date"]
        return date.toISOString().split('T')[0];
      }
    }

    // Check if it's already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      return birthDate;
    }

    // Try parsing as ISO string or other date format
    const date = new Date(birthDate);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }

    return birthDate;
  };

  // Helper function to mask SSN (show only last 4 digits)
  const formatMaskedSSN = (ssn: string | undefined): string => {
    if (!ssn) return '';
    // If SSN is 9 digits, mask first 5 and show last 4
    if (ssn.length === 9) {
      return `•••••${ssn.slice(-4)}`;
    }
    // If already 4 digits, just return it
    if (ssn.length === 4) {
      return ssn;
    }
    // Otherwise mask all but last 4
    return `${'•'.repeat(Math.max(0, ssn.length - 4))}${ssn.slice(-4)}`;
  };

  // Helper function to format phone number from Verified API
  // Verified returns: +12125550010 -> we need: (212) 555-0010
  const formatPhoneNumber = (phone: string | undefined): string => {
    if (!phone) return '';

    // Remove country code (+1) and any non-digits
    let digits = phone.replace(/\D/g, '');

    // If starts with 1 and has 11 digits, remove the country code
    if (digits.length === 11 && digits.startsWith('1')) {
      digits = digits.slice(1);
    }

    // Format as (XXX) XXX-XXXX if we have 10 digits
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    return phone; // Return original if can't format
  };

  // Check for verified data passed via navigation state
  useEffect(() => {
    const state = location.state as { verifiedData?: VerifiedUserData; identityUuid?: string; fromVerified?: boolean } | null;

    if (state?.fromVerified && state?.verifiedData) {
      console.log('[ConsumerDataContext] Received verified data from navigation:', state.verifiedData);

      const verifiedData = state.verifiedData;
      const credentials = verifiedData.credentials;

      // Map Verified API v2 nested structure to signup form format
      const signUpData = {
        firstName: credentials?.fullName?.firstName || '',
        lastName: credentials?.fullName?.lastName || '',
        email: '', // Verified API doesn't provide email
        phoneNumber: formatPhoneNumber(credentials?.phone), // Format phone: +12125550010 -> (212) 555-0010
        dateOfBirth: formatBirthDate(credentials?.birthDate),
        ssn: credentials?.ssn || '', // Store full SSN for backend, display will be masked
        ssnFull: credentials?.ssn || '', // Keep full SSN for API calls
        zipCode: credentials?.address?.zipCode || '',
        // Store full address data for later use if needed
        address: credentials?.address?.line1 || '',
        city: credentials?.address?.city || '',
        state: credentials?.address?.state || '',
      };

      console.log('[ConsumerDataContext] Pre-populating signup form with:', signUpData);

      setConsumerData(prev => ({
        ...prev,
        signUp: signUpData as any,
      }));

      // Set flag to indicate data came from Verified flow (fields should be read-only)
      setIsFromVerified(true);

      // Clear the navigation state to prevent re-population on refresh
      window.history.replaceState({}, document.title);

      toast.success('Your verified information has been pre-filled!');
    }
  }, [location.state]);

  // Save sessionId to localStorage 
  useEffect(() => {
    if (!sessionId || sessionId === 'undefined') return;
    try {
      console.log('[ConsumerDataContext] Saving session ID to localStorage:', sessionId);
      localStorage.setItem(CONSUMER_SESSION_STORAGE_KEY, sessionId);
    } catch (e) {
      console.warn('[ConsumerDataContext] Failed to save sessionId:', e);
    }
  }, [sessionId]);

  // set consumer session ID (called from VerifiedSignupPage after /api/verified/session)
  const setConsumerSessionId = useCallback((id: string) => {
    console.log('[ConsumerDataContext] Setting consumer session ID:', id);
    setSessionId(id);
    setRemoteSessionCreated(true);
  }, []);

  //----check for existing consumer session on mount (localStorage only)
  useEffect(() => {
  const storedSessionId = localStorage.getItem(CONSUMER_SESSION_STORAGE_KEY);

  if (storedSessionId && storedSessionId !== 'undefined') {
    console.log('[ConsumerDataContext] Found existing consumer session:', storedSessionId);
    setShowResumeDialog(true);
  } else {
    setShowResumeDialog(false);
  }
}, []);

  const ensureRemoteSession = useCallback(async (): Promise<string> => {
    if (remoteSessionCreated && sessionId) return sessionId;
    if (ensureRemoteSessionRef.current) return ensureRemoteSessionRef.current;

    const p = (async () => {
      try {
        // Pass the frontend-generated sessionId so backend uses the same one
        //await createOnboardingSession(CLIENT_ID, sessionId);
        //console.debug('[consumer] ensureRemoteSession registered:', sessionId);
       // setRemoteSessionCreated(true);
       // return sessionId;
      } catch (err) {
        console.warn('ensureRemoteSession failed:', err);
        throw err;
      }
    })();

   // ensureRemoteSessionRef.current = p;
    try {
      const sid = await p;
      ensureRemoteSessionRef.current = null;
     // return sid;
    } catch (err) {
      ensureRemoteSessionRef.current = null;
      throw err;
    }
  }, [remoteSessionCreated, sessionId]);

  const setCurrentStep = useCallback((step: number) => {
    setCurrentStepState(step);
  }, []);

  const saveStepToServer = useCallback(async (step: number, data: any) => {
    // Ensure we have a remote session on the server before first save
    let effectiveSessionId = sessionId;
    if (!remoteSessionCreated) {
      try {
        effectiveSessionId = await ensureRemoteSession();
      } catch (e) {
        console.warn('Failed to ensure remote session before save:', e);
        throw new Error('Cannot save: No active session');
      }
    }

    const maxRetries = 3;
    let attempt = 0;
    let lastError: any = null;
    let response: any = null;

    while (attempt < maxRetries) {
      try {
        console.debug('[consumer] saving step to server', { sessionId: effectiveSessionId, step, data });
        response = await saveOnboardingStep(effectiveSessionId, step, data);
        lastError = null;
        break;
      } catch (err: any) {
        lastError = err;
        if (err && err.status && err.status >= 400 && err.status < 500) {
          console.error('Client error saving onboarding step; will not retry:', err);
          break;
        }
        attempt += 1;
        const backoff = 500 * Math.pow(2, attempt);
        await new Promise ((r) => setTimeout(r, backoff));
      }
    }

    if (lastError) {
      console.error('Failed to save onboarding step to backend after retries:', lastError);
      const msg = lastError?.responseText
        ? `Failed to sync to server: ${lastError.responseText}`
        : 'Failed to sync changes to server.';
      toast.error(msg);
      throw lastError;
    }

    // Return the backend response so caller can check applicationStatus
    return response;
  }, [sessionId, remoteSessionCreated, ensureRemoteSession]);

  //Clear all session related state and localStorage
  const clearSession = useCallback(() => {
    setConsumerData({});
    setCurrentStepState(1);
    setRemoteSessionCreated(false);
    setSessionId('');
    localStorage.removeItem('vconnect_session_token');
    localStorage.removeItem('consumer_agreement_signature');
    localStorage.removeItem(CONSUMER_SESSION_STORAGE_KEY);
    setShowResumeDialog(false);
  }, []);

  //----if user wants to start new application
  const handleStartNewSession = useCallback(() => {
    console.log('[ConsumerDataContext] User chose to start new application');
    clearSession();
    // Increment form key to force re-render of all form components
    setFormKey(prev => prev + 1);
    toast.success('Starting a new application');
  }, [clearSession]);

  //----if user choose to resume session
  const handleResumeSession = useCallback(async () => {
    const storedSessionId = sessionId;
    if (!storedSessionId) return;

    try {
      console.log('[ConsumerDataContext] User chose to resume session, fetching from backend:', storedSessionId);
      const sessionResponse = await getConsumerOnboardingSession(storedSessionId);
      const sessionData = sessionResponse?.data;

      if (!sessionData) {
        toast.error('Could not retrieve session data. Starting fresh.');
        handleStartNewSession();
        return;
      }

      console.log('[ConsumerDataContext] Session data retrieved:', sessionData);

      // Restore the consumer data from the session
      const sessionConsumerData: ConsumerApplicationData = {
        signUp: {
          ...(sessionData.signupData || {}),
          ...(sessionData.userId ? { id: sessionData.userId.toString() } : {}),
        },
        terms: sessionData.terms || {},
        bank: sessionData.bank || {},
        agreement: sessionData.agreement || {},
      };

      console.log('[ConsumerDataContext] Restoring consumer data:', sessionConsumerData);
      setConsumerData(sessionConsumerData);

      // Helper function to check if a step is complete
      const isStepComplete = (stepData: any): boolean => {
        return stepData && Object.keys(stepData).length > 0;
      };

      let nextStep = 1;

      if (sessionData.idVerification) {
        setIsFromVerified(true);
      }

      //if backend currentStep 0 than start new session and re-initialize Verified SDK
      if (sessionData.currentStep === 0) {
        console.log('[ConsumerDataContext] Session currentStep is 0, restarting with Verified SDK');
        handleStartNewSession();
        window.location.reload();
        return;
      }
      else if (sessionData.currentStep === 1) {
        if(sessionData.idVerification){
          nextStep = 2;
        }
        else{
          nextStep = 2;
          //completeSession();
          //add process stop screen navigation
        }
      } else if (sessionData.setCurrentStep === 2) {

        if (sessionData.verificationResults?.status === 'FAILED') {
          setShowResumeDialog(false);
            //completeSession();
          navigate('/consumer-download-app');
          return;
        }
        else if (sessionData.verificationResults?.status === 'PREQUALIFY') {
          setShowResumeDialog(false);
            //completeSession();
          navigate('/consumer-download-app');
          return;
        }
        else if (sessionData.verificationResults?.status === 'APPROVED') {
          if (!sessionData.verificationResults?.preapprovalAllow) {
            setShowResumeDialog(false);
            //completeSession();
            navigate('/consumer-download-app');
            return;
          }
        }
        nextStep = 3;

      } else if (sessionData.currentStep === 3){
        nextStep = 4;
      }
      else if (sessionData.currentStep === 4){
        nextStep = 5;
      }
      console.log('[ConsumerDataContext] Resuming at step:', nextStep, '(backend currentStep:', sessionData.currentStep, ')');
      setCurrentStepState(nextStep);


      setRemoteSessionCreated(true);
      setShowResumeDialog(false);

      const stepNames = [
        '',
        'Sign Up',
        'Credit Card',
        'Pre-screen Notice',
        'Bank Information',
        'Agreement & Terms'
      ];
      toast.success(`Resuming from ${stepNames[nextStep] || 'where you left off'}`);
    } catch (error) {
      console.error('[ConsumerDataContext] Failed to resume session:', error);
      toast.error('Failed to resume session. Starting fresh.');
      handleStartNewSession();
    }
  }, [sessionId, handleStartNewSession]);

  // ✅ new: reset everything after a successful submission (or when you want to start fresh)
  const completeSession = useCallback(() => {
    try {
      clearSession();
      console.debug('[consumer] session completed and reset');
    } catch (e) {
      console.warn('completeSession encountered an error:', e);
    }
  }, [clearSession]);

  // Debug: Log sessionId when it changes
  useEffect(() => {
    console.log('[ConsumerDataContext] Current sessionId:', sessionId);
  }, [sessionId]);

  return (
    <ConsumerDataContext.Provider
      value={{
        consumerData,
        setConsumerData,
        currentStep,
        setCurrentStep,
        sessionId,
        setConsumerSessionId,
        saveStepToServer,
        completeSession,
        showResumeDialog,
        handleResumeSession,
        handleStartNewSession,
        formKey,
        isFromVerified,
        setIsFromVerified,
      }}
    >
      {children}
    </ConsumerDataContext.Provider>
  );
};

export const useConsumerData = () => {
  const ctx = useContext(ConsumerDataContext);
  if (!ctx) {
    console.warn('useConsumerData called without ConsumerDataProvider. Returning noop stub.');
    const noop = () => {};
    const asyncNoop = async () => {};
    const stub: ConsumerDataContextType = {
      consumerData: {},
      setConsumerData: noop as any,
      currentStep: 1,
      setCurrentStep: noop,
      sessionId: '',
      setConsumerSessionId: noop,
      saveStepToServer: asyncNoop,
      completeSession: noop,
      showResumeDialog: false,
      handleResumeSession: noop,
      handleStartNewSession: noop,
      formKey: 0,
      isFromVerified: false,
      setIsFromVerified: noop,
    };
    return stub;
  }
  return ctx;
};