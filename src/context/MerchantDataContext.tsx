// import React, { createContext, useContext, useState, useCallback, useRef } from "react";
// import type { MerchantSignupData } from "@/components/merchant-application/types";
// import { createOnboardingSession, saveOnboardingStep } from '@/lib/api';
// import { CLIENT_ID } from '@/config/app';
// import { toast } from 'sonner';

// // Generate a random session ID for client-side tracking only
// const generateSessionId = () => {
//   return `merchant_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
// };

// type MerchantDataContextType = {
//   merchantData: MerchantSignupData;
//   setMerchantData: React.Dispatch<React.SetStateAction<MerchantSignupData>>;
//   currentStep: number;
//   setCurrentStep: (step: number) => void;
//   sessionId: string;
//   saveStepToServer: (step: number, data: any) => Promise<void>;
// };

// const MerchantDataContext = createContext<MerchantDataContextType | undefined>(
//   undefined
// );

// export const MerchantDataProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [merchantData, setMerchantData] = useState<MerchantSignupData>({});
//   const [currentStep, setCurrentStepState] = useState<number>(0);
//   const [sessionId, setSessionId] = useState<string>(() => generateSessionId());
//   const [remoteSessionCreated, setRemoteSessionCreated] = useState<boolean>(false);

//   // Ref to hold an in-flight ensureRemoteSession promise so concurrent callers wait on same creation
//   const ensureRemoteSessionRef = useRef<Promise<string> | null>(null);

//   const ensureRemoteSession = useCallback(async (): Promise<string> => {
//     // If already have a confirmed remote session, return it
//     if (remoteSessionCreated && sessionId) return sessionId;

//     // If an ensure call is already in-flight, wait for it
//     if (ensureRemoteSessionRef.current) return ensureRemoteSessionRef.current;

//     // Otherwise create one and store the promise
//     const p = (async () => {
//       try {
//         const resp = await createOnboardingSession(CLIENT_ID);
//         const sid = resp?.data?.sessionId || generateSessionId();
//         console.debug('[merchant] ensureRemoteSession created:', sid);
//         setSessionId(sid);
//         setRemoteSessionCreated(true);
//         return sid;
//       } catch (err) {
//         console.warn('ensureRemoteSession failed:', err);
//         throw err;
//       }
//     })();

//     ensureRemoteSessionRef.current = p;
//     try {
//       const sid = await p;
//       ensureRemoteSessionRef.current = null;
//       return sid;
//     } catch (err) {
//       ensureRemoteSessionRef.current = null;
//       throw err;
//     }
//   }, [remoteSessionCreated, sessionId]);

//   const setCurrentStep = useCallback((step: number) => {
//     setCurrentStepState(step);
//   }, []);

//   const saveStepToServer = useCallback(async (step: number, data: any) => {
//     // Ensure we have a remote session on the server before first save
//     let effectiveSessionId = sessionId;
//     if (!remoteSessionCreated) {
//       try {
//         effectiveSessionId = await ensureRemoteSession();
//       } catch (e) {
//         console.warn('Failed to ensure remote session before save:', e);
//         throw new Error('Cannot save: No active session');
//       }
//     }

//     const maxRetries = 3;
//     let attempt = 0;
//     let lastError: any = null;

//     while (attempt < maxRetries) {
//       try {
//         console.debug('[merchant] saving step to server', { sessionId: effectiveSessionId, step, data });
//         await saveOnboardingStep(effectiveSessionId, step, data);
//         lastError = null;
//         break;
//       } catch (err: any) {
//         lastError = err;

//         // If it's a client error (4xx), don't retry — it's likely a malformed request
//         if (err && err.status && err.status >= 400 && err.status < 500) {
//           console.error('Client error saving onboarding step; will not retry:', err);
//           break;
//         }

//         attempt += 1;
//         const backoff = 500 * Math.pow(2, attempt);
//         await new Promise((r) => setTimeout(r, backoff));
//       }
//     }

//     if (lastError) {
//       console.error('Failed to save onboarding step to backend after retries:', lastError);
//       const msg = lastError?.responseText
//         ? `Failed to sync to server: ${lastError.responseText}`
//         : 'Failed to sync changes to server.';
//       toast.error(msg);
//       throw lastError;
//     }
//   }, [sessionId, remoteSessionCreated, ensureRemoteSession]);

//   return (
//     <MerchantDataContext.Provider value={{
//       merchantData,
//       setMerchantData,
//       currentStep,
//       setCurrentStep,
//       sessionId,
//       saveStepToServer
//     }}>
//       {children}
//     </MerchantDataContext.Provider>
//   );
// };

// export const useMerchantData = () => {
//   const ctx = useContext(MerchantDataContext);
//   if (!ctx) {
//     console.warn('useMerchantData called without MerchantDataProvider. Returning noop stub.');

//     const noop = () => {};
//     const asyncNoop = async () => {};
//     const stub: any = {
//       merchantData: {},
//       setMerchantData: noop,
//       currentStep: 0,
//       setCurrentStep: noop,
//       sessionId: '',
//       saveStepToServer: asyncNoop,
//     };

//     return stub as MerchantDataContextType;
//   }

//   return ctx;
// };


import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import type { MerchantSignupData } from "@/components/merchant-application/types";
import { createOnboardingSession, saveOnboardingStep, getOnboardingSession, getOnboardingSessionStatus } from '@/lib/api';
import { CLIENT_ID } from '@/config/app';
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";

// Generate a random session ID for client-side tracking only
const generateSessionId = () => {
  return `merchant_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

type MerchantDataContextType = {
  merchantData: MerchantSignupData;
  setMerchantData: React.Dispatch<React.SetStateAction<MerchantSignupData>>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  sessionId: string;
  numericSessionId: number | null; // Numeric database ID for backend operations
  saveStepToServer: (step: number, data: any) => Promise<any>;
  completeSession: () => void;
  showResumeDialog: boolean;
  handleResumeSession: () => void;
  handleStartNewSession: () => void;
  formKey: number;
};

const MerchantDataContext = createContext<MerchantDataContextType | undefined>(undefined);

const MERCHANT_SESSION_STORAGE_KEY = 'merchant_onboarding_session';

export const MerchantDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [merchantData, setMerchantData] = useState<MerchantSignupData>({});

  const [currentStep, setCurrentStepState] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(MERCHANT_SESSION_STORAGE_KEY);
      if (stored) return stored;
    } catch (e) {
      console.warn('[MerchantDataContext] Failed to load sessionId from localStorage:', e);
    }
    return generateSessionId();
  });
  const [numericSessionId, setNumericSessionId] = useState<number | null>(null);
  const [remoteSessionCreated, setRemoteSessionCreated] = useState<boolean>(false);
  const [showResumeDialog, setShowResumeDialog] = useState<boolean>(false);
  const [pendingSessionData, setPendingSessionData] = useState<any>(null);
  const [formKey, setFormKey] = useState<number>(0);
  const navigate = useNavigate();
  // Ref to hold an in-flight ensureRemoteSession promise so concurrent callers wait on same creation
  const ensureRemoteSessionRef = useRef<Promise<string> | null>(null);

  // Save sessionId to localStorage whenever it changes
  React.useEffect(() => {
    try {
      localStorage.setItem(MERCHANT_SESSION_STORAGE_KEY, sessionId);
    } catch (e) {
      console.warn('[MerchantDataContext] Failed to save sessionId:', e);
    }
  }, [sessionId]);

  //----checks for existing session
  useEffect(() => {
    // Skip session validation when running inside an iframe (e.g. PDF generation).
    if (window.self !== window.top) {
      console.log('[MerchantDataContext] Running in iframe — skipping session validation');
      return;
    }

    const validateSession = async () => {
      const storedSessionId = localStorage.getItem(MERCHANT_SESSION_STORAGE_KEY);

      if (!storedSessionId) {
        console.log('[MerchantDataContext] No stored session found');
        return;
      }

      try {
        console.log('[MerchantDataContext] Validating stored session:', storedSessionId);
        const sessionData = await getOnboardingSession(storedSessionId);

        //---check if session exists and is not already completed
        if (sessionData?.data?.sessionId === storedSessionId &&
            sessionData?.data?.status !== 'completed') {
          console.log('[MerchantDataContext] Valid session found, showing resume dialog:', sessionData.data);

          //--store the session data and show dialog
          setPendingSessionData(sessionData.data);
          setShowResumeDialog(true);
        } else {
          console.log('[MerchantDataContext] Session invalid or completed, starting fresh');
          localStorage.removeItem(MERCHANT_SESSION_STORAGE_KEY);
          localStorage.removeItem('merchant_agreement_signature');
          setSessionId(generateSessionId());
        }
      } catch (error) {
        console.warn('[MerchantDataContext] Failed to validate session:', error);
        localStorage.removeItem(MERCHANT_SESSION_STORAGE_KEY);
        localStorage.removeItem('merchant_agreement_signature');
        setSessionId(generateSessionId());
      }
    };

    validateSession();
  }, []);

  const ensureRemoteSession = useCallback(async (): Promise<string> => {
    if (remoteSessionCreated && sessionId) return sessionId;
    if (ensureRemoteSessionRef.current) return ensureRemoteSessionRef.current;

    const p = (async () => {
      try {
        const resp = await createOnboardingSession(CLIENT_ID);
        const sid = resp?.data?.sessionId || generateSessionId();
        const numericId = resp?.data?.id || null;
        console.debug('[merchant] ensureRemoteSession created:', sid, 'numericId:', numericId);
        setSessionId(sid);
        setNumericSessionId(numericId);
        setRemoteSessionCreated(true);
        return sid;
      } catch (err) {
        console.warn('ensureRemoteSession failed:', err);
        throw err;
      }
    })();

    ensureRemoteSessionRef.current = p;
    try {
      const sid = await p;
      ensureRemoteSessionRef.current = null;
      return sid;
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
        console.log('[MerchantDataContext] No remote session yet, creating one...');
        effectiveSessionId = await ensureRemoteSession();
        console.log('[MerchantDataContext] Remote session created:', effectiveSessionId);
      } catch (e) {
        console.error('[MerchantDataContext] Failed to ensure remote session before save:', e);
        throw new Error('Cannot save: No active session');
      }
    }

    const maxRetries = 3;
    let attempt = 0;
    let lastError: any = null;
    let response: any = null;

    while (attempt < maxRetries) {
      try {
        console.debug('[merchant] saving step to server', { sessionId: effectiveSessionId, step, data });
        response = await saveOnboardingStep(effectiveSessionId, step, data);
        
        // Extract and store numeric session ID from response if available
        if (response?.data?.id && !numericSessionId) {
          console.log('[MerchantDataContext] Storing numeric session ID from response:', response.data.id);
          setNumericSessionId(response.data.id);
        }
        
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

  const handleResumeSession = useCallback(async () => {
  if (!pendingSessionData) return;

  try {
    console.log('[MerchantDataContext] User chose to resume session', pendingSessionData);

    const statusResponse = await getOnboardingSessionStatus(
      pendingSessionData.sessionId
    );

    const { application_status, current_step } = statusResponse.data;

    console.log('[MerchantDataContext] Session status:', application_status, current_step);

    if (application_status === "Declined"){
      completeSession();
      navigate(`/merchant-onboarding-complete?status=denied`);
      return;

    }
    else if (application_status === 'Manual Review') {
      navigate(`/merchant-onboarding-complete?status=review`);
      toast.info('Your application is currently under review. You will be notified once approved.');
      setShowResumeDialog(false);
      return;
    }

    const sessionMerchantData: MerchantSignupData = {
      personalDetails: pendingSessionData.personalDetails || {},
      businessInformation: pendingSessionData.businessInformation || {},
      ownership: pendingSessionData.ownership || {},
      bankInformation: pendingSessionData.bankInformation || {},
      agreement: pendingSessionData.agreement || {},
    };

    setMerchantData(sessionMerchantData);

    console.log('[MerchantDataContext] Resuming from step:', current_step);
    if (current_step >= 4) {
      console.log('[MerchantDataContext] User was on Additional Information page, navigating there');
      window.location.href = '/merchant-additional-information';
      setRemoteSessionCreated(true);
      setShowResumeDialog(false);
      setPendingSessionData(null);
      toast.success('Resuming your previous application');
      return;
    }
  
    setCurrentStepState(current_step+1);

    setRemoteSessionCreated(true);
    setShowResumeDialog(false);
    setPendingSessionData(null);

    const stepNames = [
      'Personal Details',
      'Business Information',
      'Ownership Information',
      'Bank Information',
      'Agreement & Terms'
    ];

    toast.success(`Resuming from ${stepNames[current_step] || 'where you left off'}`);

  } catch (error) {
    console.error('[MerchantDataContext] Failed to resume session:', error);
    toast.error('Unable to resume your application. Please try again later.');
  }
}, [pendingSessionData]);


  //----PREV implementation(when no need to stop on status manual review): if user choose to resume session
  // const handleResumeSession = useCallback(() => {
  //   if (pendingSessionData) {
  //     console.log('[MerchantDataContext] User chose to resume session', pendingSessionData);

  //     // Restore the merchant data from the session
  //     const sessionMerchantData: MerchantSignupData = {
  //       personalDetails: pendingSessionData.personalDetails || {},
  //       businessInformation: pendingSessionData.businessInformation || {},
  //       ownership: pendingSessionData.ownership || {},
  //       bankInformation: pendingSessionData.bankInformation || {},
  //       agreement: pendingSessionData.agreement || {},
  //     };

  //     console.log('[MerchantDataContext] Restoring merchant data:', sessionMerchantData);

  //     // Update context with session data
  //     setMerchantData(sessionMerchantData);

  //     // Helper function to check if a step is complete
  //     const isStepComplete = (stepData: any): boolean => {
  //       return stepData && Object.keys(stepData).length > 0;
  //     };

  //     // Determine the next incomplete step based on available data
  //     let nextStep = 0;

  //     // Step 0: Personal Details
  //     if (isStepComplete(sessionMerchantData.personalDetails)) {
  //       nextStep = 1; 

  //       // Step 1: Business Information
  //       if (isStepComplete(sessionMerchantData.businessInformation)) {
  //         nextStep = 2; 

  //         // Step 2: Ownership
  //         if (isStepComplete(sessionMerchantData.ownership)) {
  //           nextStep = 3; 

  //           // Step 3: Bank Information
  //           if (isStepComplete(sessionMerchantData.bankInformation)) {
  //             nextStep = 4; 

  //             // Step 4: Agreement
  //             if (isStepComplete(sessionMerchantData.agreement)) {
  //               const lastStep = 4;
  //               if (lastStep >= 4) {
  //                 console.log('[MerchantDataContext] User was on Additional Information page, navigating there');
  //                 window.location.href = '/merchant-additional-information';
  //                 setRemoteSessionCreated(true);
  //                 setShowResumeDialog(false);
  //                 setPendingSessionData(null);
  //                 toast.success('Resuming your previous application');
  //                 return;
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }

  //     console.log('[MerchantDataContext] Calculated next step:', nextStep);
  //     setCurrentStepState(nextStep);

  //     setRemoteSessionCreated(true);
  //     setShowResumeDialog(false);
  //     setPendingSessionData(null);

  //     const stepNames = [
  //       'Personal Details',
  //       'Business Information',
  //       'Ownership Information',
  //       'Bank Information',
  //       'Agreement & Terms'
  //     ];
  //     toast.success(`Resuming from ${stepNames[nextStep] || 'where you left off'}`);
  //   }
  // }, [pendingSessionData]);

  //----if user wants to start new application
  const handleStartNewSession = useCallback(() => {
    console.log('[MerchantDataContext] User chose to start new application');

    setMerchantData({});
    setCurrentStepState(0);
    setRemoteSessionCreated(false);
    setSessionId(generateSessionId());
    localStorage.removeItem('vconnect_session_token');
    localStorage.removeItem('merchant_agreement_signature');
    localStorage.removeItem(MERCHANT_SESSION_STORAGE_KEY);
    setShowResumeDialog(false);
    setPendingSessionData(null);
    // Increment form key to force re-render of all form components
    setFormKey(prev => prev + 1);
    toast.success('Starting a new application');
  }, []);

  // ✅ new: reset everything after a successful submission (or when you want to start fresh)
  const completeSession = useCallback(() => {
    try {
      // Clear all in-memory onboarding data and start a fresh local session
      setMerchantData({});
      setCurrentStepState(0);
      setRemoteSessionCreated(false);
      setSessionId(generateSessionId());
      localStorage.removeItem('vconnect_session_token');
      localStorage.removeItem(MERCHANT_SESSION_STORAGE_KEY);
      localStorage.removeItem('merchant_agreement_signature');
      console.debug('[merchant] session completed and reset');
    } catch (e) {
      console.warn('completeSession encountered an error:', e);
    }
  }, []);

  return (
    <MerchantDataContext.Provider
      value={{
        merchantData,
        setMerchantData,
        currentStep,
        setCurrentStep,
        sessionId,
        numericSessionId,
        saveStepToServer,
        completeSession,
        showResumeDialog,
        handleResumeSession,
        handleStartNewSession,
        formKey,
      }}
    >
      {children}
    </MerchantDataContext.Provider>
  );
};

export const useMerchantData = () => {
  const ctx = useContext(MerchantDataContext);
  if (!ctx) {
    console.warn('useMerchantData called without MerchantDataProvider. Returning noop stub.');
    const noop = () => {};
    const asyncNoop = async () => {};
    const stub: MerchantDataContextType = {
      merchantData: {},
      setMerchantData: noop as any,
      currentStep: 0,
      setCurrentStep: noop,
      sessionId: '',
      numericSessionId: null,
      saveStepToServer: asyncNoop,
      completeSession: noop,
      showResumeDialog: false,
      handleResumeSession: noop,
      handleStartNewSession: noop,
      formKey: 0,
    };
    return stub;
  }
  return ctx;
};