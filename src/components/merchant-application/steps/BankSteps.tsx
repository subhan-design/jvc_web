import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
// import { SAMPLE_ENABLED, sampleBankDetails } from "@/lib/sampleData";
import { useMerchantData } from "@/context/MerchantDataContext";
import { createVConnectSession, getVConnectAccount, getVConnectSession, verifyVAccount } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getRuntimeConfig } from "@/lib/runtimeConfig";

// Formatting utility functions
const formatRoutingNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.slice(0, 9); // Limit to 9 digits
};

const formatAccountNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.slice(0, 17); // Limit to 17 digits
};

const bankSchema = z.object({
  nameOnAccount: z.string()
    .min(1, "Name on Account is required")
    .min(2, "Name on Account must be at least 2 characters"),
    // Allow letters, numbers, spaces, hyphens, apostrophes, ampersands, and periods
     financialInstitution: z.string().optional(),
  routingNumber: z.string()
    .min(1, "Routing Number is required")
    .length(9, "Routing number must be exactly 9 digits")
    .regex(/^\d{9}$/, "Routing number must contain only numbers"),
  accountType: z.string().min(1, "Account Type is required"),
  accountNumber: z.string()
    .min(1, "Account number is required")
    .min(4, "Account number must be at least 4 digits")
    .max(17, "Account number must be no more than 17 digits")
    .regex(/^\d+$/, "Account number must contain only numbers"),
});

export type BankFormData = z.infer<typeof bankSchema>;

interface BankStepsProps {
  onNext: (data: any) => void;
  onPrev: () => void;
  initialValues?: Partial<any>; // Replace any with your form data type if available
}

const BankSteps = ({ onNext, onPrev, initialValues }: BankStepsProps) => {
  // Helper to check if Validfi validation is bypassed in development mode
  const shouldBypassValidfi = () => {
    const config = getRuntimeConfig();
    if (config) {
      const env = config.environment || 'production';
      const envConfig = config[env] || {};
      return envConfig.bypassValidfi === true;
    }
    return false;
  };

  const [isVerificationStarted, setIsVerificationStarted] = useState(false);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [bankDataPopulated, setBankDataPopulated] = useState(false);
  const [vconnectUrl, setVconnectUrl] = useState<string | null>(null);
  const [vconnectSessionToken, setVconnectSessionToken] = useState<string | null>(null);
  const [accountToken, setAccountToken] = useState<string | null>(null);
  const [vconnectAccount, setVconnectAccount] = useState<any | null>(null);
  const [connectType, setConnectType] = useState<string | null>(null);
  const [isSavedToServer,setSavedToServer] = useState(false);
  const [vconnectSessionAttempts, setVconnectSessionAttempts] = useState(0);
  const [showNameMismatchDialog, setShowNameMismatchDialog] = useState(false);

  // Debug log for state changes
  useEffect(() => {
    console.log('[BankSteps] State changed - isVerificationComplete:', isVerificationComplete, 'bankDataPopulated:', bankDataPopulated);
  }, [isVerificationComplete, bankDataPopulated]);

  const [nameMismatchData, setNameMismatchData] = useState<{
    accountName: string;
    businessName: string;
    gotAccount: any;
    capturedConnectType: string | null;
    populated: any;
  } | null>(null);
  const navigate = useNavigate();

  // Load persisted vconnect session token on mount
  useEffect(() => {
    try {
      const persisted = localStorage.getItem('vconnect_session_token');
      if (persisted) {
        setVconnectSessionToken(persisted);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // When dialog opens and we have a persisted session token, try to fetch any linked account
  useEffect(() => {
    const tryFetch = async () => {
      if (!vconnectSessionToken || !showVerificationDialog) return;
      try {
        const resp = await getVConnectAccount(vconnectSessionToken);
        if (resp?.data) setVconnectAccount(resp.data);
      } catch (e) {
        // ignore transient errors
      }
    };
    tryFetch();
  }, [vconnectSessionToken, showVerificationDialog]);

  function generateUniqueId() {
    const seconds = Math.floor(Date.now() / 1000); // 10 digits
    const random = Math.floor(Math.random() * 10); // 1 digit
    return `${seconds}${random}`.slice(0, 11);
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch (e) {
      toast.error('Unable to copy');
    }
  };

  const proceedWithBankSave = async (params: {
    gotAccount: any;
    populated: any;
    applicationStatus: string | null;
    reason: string | null;
    business: any;
    bankAttempts?: number;
  }) => {
    const { gotAccount, populated, applicationStatus: initialAppStatus, reason: initialReason, business, bankAttempts } = params;
    let applicationStatus = initialAppStatus;
    let reason = initialReason;

    try {
      const acctTokenToStore = gotAccount.accountToken || accountToken || null;
      setAccountToken(acctTokenToStore);

      setMerchantData((prev: any) => {
        const prevAgreement = (prev && prev.agreement) ? prev.agreement : {};
        const prevScheduleC = (prevAgreement && prevAgreement.scheduleC) ? prevAgreement.scheduleC : {};

        const newScheduleC = {
          ...prevScheduleC,
          bankName: gotAccount.bankName || populated.nameOnAccount || prevScheduleC.bankName,
          nameOnAccount: populated.nameOnAccount || prevScheduleC.nameOnAccount,
          routingNumber: populated.routingNumber || prevScheduleC.routingNumber,
          accountNumber: populated.accountNumber || prevScheduleC.accountNumber,
          routingNumberMasked: prevScheduleC.routingNumberMasked || (populated.routingNumber ? ('****' + String(populated.routingNumber).slice(-4)) : undefined),
          accountNumberMasked: prevScheduleC.accountNumberMasked || (populated.accountNumber ? ('****' + String(populated.accountNumber).slice(-4)) : undefined),
        };

        return {
          ...(prev || {}),
          bankInformation: populated,
          vconnect: {
            ...(prev && prev.vconnect ? prev.vconnect : {}),
            accountToken: acctTokenToStore,
          },
          agreement: {
            ...(prevAgreement || {}),
            scheduleC: newScheduleC,
          },
        };
      });

      // Persist to server in background (step 3 represents bank info)
      try {
        // ========================================================================
        // OLD APPROACH - Account name check in proceedWithBankSave (deprecated for v113)
        // Name matching is now handled by VAccount v113 verification decision
        // This old check would incorrectly set Manual Review for APPROVED v113 cases
        // ========================================================================
        // const accountName = gotAccount.accountName
        //   ?.toLowerCase()
        //   .replace(/'s\b/g, '')
        //   .split(/\b(checking|savings|saving|account|acct)\b/)[0]
        //   .replace(/\s+/g, ' ')
        //   .trim();

        // const legalBusinessName = business?.legalNameOfBusiness?.trim().toLowerCase();

        // if (accountName && legalBusinessName && accountName !== legalBusinessName) {
        //   console.log('[BankSteps] Account name: ', accountName);
        //   console.log('[BankSteps] Business name: ', legalBusinessName);

        //   applicationStatus = applicationStatus === 'Declined' ? 'Declined' : 'Manual Review';

        //   const nameMismatchReason = `Account holder name (${accountName}) does not match business legal name (${business?.legalNameOfBusiness})`;

        //   reason = reason
        //     ? `${reason}, ${nameMismatchReason}`
        //     : nameMismatchReason;
        // }
        // ========================================================================

        const savePayload: any = {
          ...populated,
          vconnectAccountToken: gotAccount.accountToken || accountToken || null,
          bankAttempts: bankAttempts ?? vconnectSessionAttempts,
        };

        if (applicationStatus) {
          savePayload.applicationStatus = applicationStatus;
        }
        if (reason) {
          savePayload.reason = reason;
        }

        const response = await saveStepToServer(3, savePayload);

        const delay = (ms: number) =>
          new Promise(resolve => setTimeout(resolve, ms));

        await delay(2000);

        setSavedToServer(true);

        if (response?.data?.applicationStatus === "Declined") {
          completeSession();
          const denialMessage = 'Unfortunately, we are unable to approve your merchant application as there appears to be an issue with your Bank Account Details.';
          navigate(`/merchant-onboarding-complete?status=denied&message=${encodeURIComponent(denialMessage)}`);
          return;
        }

        else if (response?.data?.applicationStatus === "Manual Review") {
          navigate(`/merchant-onboarding-complete?status=review`);
          return;
        }
        console.debug('[BankSteps] persisted bank info and vconnect token to server', savePayload);
      } catch (e) {
        console.warn('[BankSteps] failed to persist bank info to server:', e);
      }
    } catch (e) {
      console.warn('Failed to persist vconnect account into merchantData', e);
    }

    toast.success('Bank account linked successfully');
  };

  const handleNameMismatchContinue = async () => {
    if (!nameMismatchData) return;

    setShowNameMismatchDialog(false);
   
    // Don't set Manual Review - v113 verification decision is already final
    // If verification was DECLINED, user wouldn't see this dialog (they'd see relink)
    // This dialog only appears on DECLINED cases where user can choose to continue
    await proceedWithBankSave({
      gotAccount: nameMismatchData.gotAccount,
      populated: nameMismatchData.populated,
      applicationStatus: null, // Don't override - let verification decision stand
      reason: null,
      business: merchantData?.businessInformation || {},
    });

    setNameMismatchData(null);
  };

  const handleNameMismatchRelink = () => {
    setShowNameMismatchDialog(false);
    setNameMismatchData(null);

    // Reset verification states to allow re-linking
    setIsVerificationStarted(false);
    setIsVerificationComplete(false);
    setBankDataPopulated(false);
    setVconnectAccount(null);
    setVconnectUrl(null);
    setAccountToken(null);
    setShowVerificationDialog(false);

    // Clear the form bank fields
    form.reset({
      nameOnAccount: "",
      financialInstitution: "",
      routingNumber: "",
      accountType: "",
      accountNumber: "",
    });

    toast.info('Please re-link your bank account by checking the verification checkbox again.');
  };

  const form = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    mode: "onChange",
    defaultValues: {
      nameOnAccount: "",
      financialInstitution: "",
      routingNumber: "",
      accountType: "",
      accountNumber: "",
      // ...(SAMPLE_ENABLED && !initialValues ? sampleBankDetails : {}),
      ...(initialValues || {}),
    },
  });

  const { setMerchantData, sessionId, saveStepToServer, merchantData, completeSession } = useMerchantData();

  useEffect(() => {
    console.log('[BankSteps] initialValues changed:', initialValues);
    
    if (initialValues) {
      form.reset({ ...form.getValues(), ...initialValues });
      // If initial values are provided (data prefilled from API),
      // set the verification states to allow form submission

      // Check if bank data is already filled (user came back from next step)
      const hasBankData = initialValues.routingNumber && initialValues.accountNumber && initialValues.nameOnAccount;
      
      console.log('[BankSteps] hasBankData:', hasBankData, {
        routingNumber: initialValues.routingNumber,
        accountNumber: initialValues.accountNumber,
        nameOnAccount: initialValues.nameOnAccount
      });
      
      if (hasBankData) {
        let normalizedAccountName = initialValues.nameOnAccount
          ?.toLowerCase()
          .replace(/'s\b/g, '')
          .split(/\b(checking|savings|saving|account|acct)\b/)[0]
          .replace(/\s+/g, ' ')
          .trim();
        
        if (initialValues.legalNameOfBusiness !== normalizedAccountName && initialValues.bankAttempts < 3){
          console.log('[BankSteps] Name mismatch - keeping verification disabled');
          setIsVerificationComplete(false);
          setBankDataPopulated(false);
        }
        else {
          // Bank data exists and is valid - enable the Next button
          console.log('[BankSteps] Bank data valid - enabling Next button');
          setIsVerificationComplete(true);
          setBankDataPopulated(true);
          setSavedToServer(true); // Data from server means it's already saved
        }
      } else {
        console.log('[BankSteps] No bank data - keeping verification disabled');
      }
      
      //---restore bank attempts from server session
      if (initialValues.bankAttempts !== undefined && initialValues.bankAttempts !== null) {
        setVconnectSessionAttempts(initialValues.bankAttempts);
      }
    }
  }, [initialValues, form]);

  const handleVerification = async () => {
    // Bypass in development mode - populate dummy data
    if (shouldBypassValidfi()) {
      console.log('[Development Mode] Bypassing bank verification - using dummy data');
      
      // Set dummy bank data
      form.setValue('nameOnAccount', 'John Doe');
      form.setValue('financialInstitution', 'Test Bank');
      form.setValue('routingNumber', '123456789');
      form.setValue('accountType', 'checking');
      form.setValue('accountNumber', '9876543210');
      
      // Mark verification as complete
      setIsVerificationComplete(true);
      setBankDataPopulated(true);
      setIsVerificationStarted(true);
      setSavedToServer(true);
      
      toast.success('Bank verification bypassed (development mode)');
      return;
    }

    setIsVerificationStarted(true);
    setShowVerificationDialog(true);
    setIsVerifying(true);

    const currentAttempt = vconnectSessionAttempts + 1;
    setVconnectSessionAttempts(currentAttempt);

    try {
      // Build customer payload for VConnect using merchant context when available
      const vals = form.getValues();
      const md: any = merchantData || {};
      const personal = md.personalDetails || {};
      const business = md.businessInformation || {};
      const locations = md.locations || {};

      // Map explicit fields required by backend
      const customer = {
    
        customerId: sessionId || business?.ein,
        firstName: personal?.firstName,
        lastName: personal?.lastName,
        emailAddress: personal?.email,
        phoneNumber: personal?.phoneNumber,
        address: {
          addressLine1: business?.address,
          city: business?.city,
          state: business?.state,
          zip: business?.zipcode,
        }
      };

      // Create VConnect session via backend
      // The backend expects a payload like the Postman example: { customer: {...}, terms: {...} }
      // Build a minimal terms object; you can extend this to include real values if available
      const terms = {
        fullAmount: 0,
        amount: 0,
        loanTerms: 'biweekly_oblig'
      };

      const payload = { customer, terms };
      console.log("Validifi vconnect payload---", payload);
      try {
        console.debug('[BankSteps] createVConnectSession payload:', payload);
      } catch (e) {}
      const resp = await createVConnectSession(payload);
      const url = resp?.url;
      const token = resp?.sessionToken;
      if (!url || !token) throw new Error('Invalid vConnect response');

  setVconnectUrl(url);
  setVconnectSessionToken(token);
  // Persist the session token so the dialog / page can survive a reload
  try { localStorage.setItem('vconnect_session_token', token); } catch (e) { /* ignore */ }

  // Open the url in a new tab for the user to complete linking
  try { window.open(url, '_blank'); } catch (e) { /* ignore */ }

      // Poll for account linkage — the backend is expected to provide an "accountToken"
      // This polling assumes your backend exposes the account retrieval endpoint using the accountToken
      const start = Date.now();
      const timeoutMs = 5 * 60 * 1000; // 2 minutes
      const pollInterval = 3000;

      let gotAccount = null;
      let capturedConnectType = null; 
      while (Date.now() - start < timeoutMs) {
        try {
          // If accountToken is already known, fetch account details directly
          if (accountToken) {
            try {
              const acctResp = await getVConnectAccount(accountToken);
              if (acctResp?.data) {
                gotAccount = acctResp.data;
                if (acctResp.data.accountToken) setAccountToken(acctResp.data.accountToken);
                setVconnectAccount(acctResp.data);
                break;
              }
            } catch (e) {
              // ignore - maybe not ready yet
            }
          }

          // Otherwise poll the session endpoint to see if the webhook populated accountToken
          try {
            const sessResp = await getVConnectSession(token);
            // session endpoint may wrap data in .data
            const sessionData = sessResp?.data || sessResp;
            if (sessionData && sessionData.accountToken) {
              setAccountToken(sessionData.accountToken);
              // Capture connectType from session response
              if (sessionData.connectType) {
                capturedConnectType = sessionData.connectType; 
                setConnectType(sessionData.connectType);
              }
              // once we have account token, fetch the account details next loop iteration
              const acctResp = await getVConnectAccount(sessionData.accountToken);
              if (acctResp?.data) {
                gotAccount = acctResp.data;
                setVconnectAccount(acctResp.data);
                break;
              }
            }
          } catch (e) {
            // ignore interim errors; likely not ready yet
          }

        } catch (e) {
          // ignore and continue polling
        }

        await new Promise((r) => setTimeout(r, pollInterval));
      }

      if (!gotAccount) {
        setIsVerifying(false);
        toast.error('Bank linking not completed yet. Please finish the flow in the new tab.');
        return;
      }

      // Populate form with account details (non-editable) and show summary in dialog
      const populated = {
        nameOnAccount: gotAccount.accountName || form.getValues().nameOnAccount || '',
        financialInstitution: gotAccount.bankName || gotAccount.institutionName,
        routingNumber: gotAccount.routingNumber || form.getValues().routingNumber || '',
        accountType: (gotAccount.accountType || form.getValues().accountType || '').toLowerCase(),
        accountNumber: gotAccount.accountNumber || form.getValues().accountNumber || '',
      };

      form.reset(populated);
      setVconnectAccount(gotAccount);

      let applicationStatus: string | null = null;
      let reason: string | null = null;

      //---validifi decisioning in case of manual enrollment
      if (capturedConnectType === 'Manual Enrollment'){
        // Bypass in development mode
        if (shouldBypassValidfi()) {
          console.log('[Development Mode] Bypassing Validifi bank verification');
          toast.success('Bank account verification bypassed (development mode)');
          // Continue without setting applicationStatus or reason - treated as approved
        } else {
        try {
          console.log('[BankSteps] Manual Enrollment - verifying account with Validifi');

          const uniqueId = generateUniqueId();
          //-----v92
          // const verificationPayload = {
          //   uniqueID: uniqueId,
          //   firstName: personal?.firstName,
          //   lastName: personal?.lastName,
          //   ssn: personal?.socialSecurityNumber?.replace(/-/g, ''),
          //   birthDate: personal?.dob?.replace(/\//g, '') || '06151998',
          //   street: business?.address,
          //   city: business?.city,
          //   state: business?.state,
          //   zip: business?.zipcode,
          //   bankAccount: gotAccount.accountNumber,
          //   bankRouting: gotAccount.routingNumber,
          // };

          //-----v113 Business Verification (vaccountBusiness)
          // Payload: CompanyName, EIN, BankRouting, BankAccount, Address (Street, City, State, Zip), UniqueID
          // Response: Binary decision (APPROVED/DECLINED) based on VerificationDecision + AuthenticationDecision
          const verificationPayload = {
            uniqueID: uniqueId,
            bankRouting: gotAccount.routingNumber,
            bankAccount: gotAccount.accountNumber,
            companyName: business?.legalNameOfBusiness || business?.dbaIfApplicable,
            ein: business?.einSsnNumber?.replace(/-/g, ''),
            street: business?.address,
            city: business?.city,
            state: business?.state,
            zip: business?.zipcode,
          };
      
          console.log('[BankSteps] Validifi verification payload:', verificationPayload);

          const verificationResponse = await verifyVAccount(verificationPayload);
          console.log('[BankSteps] Validifi verification response:', verificationResponse);

          // ========================================================================
          // OLD APPROACH (v92 - ResultCode based) - DEPRECATED BUT KEPT FOR REFERENCE
          // ========================================================================
          // const resultCode = verificationResponse.resultCode;
          // const declinedCodes = ['AVC1', 'AVC2', 'AVC3', 'AVC4', 'AVC5', 'AVC7'];
          // const manualReviewCodes = ['NV', 'AVC0'];
          // const approvedReviewCodes = ['AVC6', 'AVC8', 'AVC9'];
          // if (declinedCodes.includes(resultCode)) {
          //   console.log('Application DECLINED:', resultCode);
          //   applicationStatus = 'Declined';
          //   reason = `Bank account verification result code: ${resultCode}`;
          // } else if (manualReviewCodes.includes(resultCode)) {
          //   console.log('Account verification requires manual review:', resultCode);
          //   applicationStatus = 'Manual Review';
          //   reason = `Bank account verification result code: ${resultCode}`;
          // } else if (approvedReviewCodes.includes(resultCode)) {
          //   console.log('Account verification APPROVED:', resultCode);
          //   toast.success(`Account verified successfully: ${verificationResponse.message}${verificationResponse.bankName}`);
          // } else {
          //   console.log('Account verification MANUAL REVIEW:', resultCode);
          //   applicationStatus = 'Manual Review';
          //   reason = `Bank account verification result code: ${resultCode}`;
          // }
          // ========================================================================

          // NEW APPROACH (v113 - vaccountBusiness) - Binary Decision
          // APPROVED: Result="00" AND VerificationDecision starts with "Pass" AND AuthenticationDecision="Pass"
          // DECLINED: Everything else (Fail, No Data, or error)
          const { result, verificationDecision, authenticationDecision, errorMessage, decisionStatus } = verificationResponse;

          console.log('[BankSteps] VAccount v113 Decision:', {
            result,
            verificationDecision,
            authenticationDecision,
            decisionStatus
          });

          if (decisionStatus === 'APPROVED') {
            console.log('✓ Bank account verification APPROVED');
            
            // Populate account holder name with legal business name on approval
            const legalBusinessName = business?.legalNameOfBusiness?.trim() || '';
            if (legalBusinessName) {
              populated.nameOnAccount = legalBusinessName;
              form.setValue('nameOnAccount', legalBusinessName);
              console.log('[BankSteps] Account holder name populated with legal business name:', legalBusinessName);
            }
            
            toast.success(`Account verified successfully`);
            // No status change - application continues to approval
            
          } else if (decisionStatus === 'DECLINED') {
            console.log('✗ Bank account verification DECLINED');
            
            // Use attempts-based relinking approach for declined verification
            if (currentAttempt < 3) {
              console.log(`[BankSteps] Verification declined. Allowing relink attempt ${currentAttempt}/3`);
              
              setNameMismatchData({
                accountName: gotAccount.accountName || '',
                businessName: business?.legalNameOfBusiness || '',
                gotAccount,
                capturedConnectType,
                populated,
              });
              
              // Don't show success states for declined verification
              setIsVerifying(false);
              setShowVerificationDialog(false);
              
              await new Promise(resolve => setTimeout(resolve, 500));
              
              setShowNameMismatchDialog(true);
              // Don't show toast here - dialog message will explain
              return;
              
            } else {
              // Maximum attempts reached - set to Manual Review (temporary, will be Declined later)
              console.log('[BankSteps] Maximum verification attempts reached (3). Setting to Manual Review.');
              applicationStatus = 'Manual Review';
              reason = `Bank account verification failed after 3 attempts: ${errorMessage || verificationDecision}`;
              toast.error(`Bank account verification failed: Maximum attempts reached. Application under review.`);
            }
            
          } else {
            // Fallback for unexpected decision status - treat as declined
            console.warn('⚠ Unexpected decision status, treating as DECLINED:', decisionStatus);
            
            if (currentAttempt < 3) {
              setNameMismatchData({
                accountName: gotAccount.accountName || '',
                businessName: business?.legalNameOfBusiness || '',
                gotAccount,
                capturedConnectType,
                populated,
              });
              
              // Don't show success states for declined verification
              setIsVerifying(false);
              setShowVerificationDialog(false);
              
              await new Promise(resolve => setTimeout(resolve, 500));
              
              setShowNameMismatchDialog(true);
              return;
              
            } else {
              applicationStatus = 'Manual Review';
              reason = `Bank account verification returned unexpected status after 3 attempts: ${decisionStatus}`;
              toast.error('Bank account verification failed: Maximum attempts reached. Application under review.');
            }
          }

        } catch(e) {
          console.error('Validifi verification error:', e);
          toast.error('Failed to verify account. Please try again or contact support.');
          setIsVerifying(false);
          setShowVerificationDialog(false);
          return;
        }
      }
      }

      setIsVerificationComplete(true);
      setBankDataPopulated(true);
      setIsVerifying(false);

      toast.success('Bank account linked successfully');

      // ========================================================================
      // OLD APPROACH - Name mismatch check (deprecated for Manual Enrollment v113)
      // Name matching is now handled by VAccount verification decision logic above
      // This logic is still used for Instant Verification (VConnect) flow
      // ========================================================================
      // const normalizedAccountName = gotAccount.accountName
      //   ?.toLowerCase()
      //   .replace(/'s\b/g, '')
      //   .split(/\b(checking|savings|saving|account|acct)\b/)[0]
      //   .replace(/\s+/g, ' ')
      //   .trim();

      // const legalBusinessName = business?.legalNameOfBusiness?.trim().toLowerCase();
      // const namesMatch = !normalizedAccountName || !legalBusinessName || normalizedAccountName === legalBusinessName;

      // //---check mismatch and user still has attempts (show popup only for first 2 attempts)
      // if (!namesMatch && currentAttempt < 3) {
      //   console.log('[BankSteps] Name mismatch detected. Attempt:', currentAttempt);
      //   console.log('[BankSteps] Account name:', normalizedAccountName);
      //   console.log('[BankSteps] Business name:', legalBusinessName);

      //   setNameMismatchData({
      //     accountName: gotAccount.accountName || '',
      //     businessName: business?.legalNameOfBusiness || '',
      //     gotAccount,
      //     capturedConnectType,
      //     populated,
      //   });

      //   await new Promise(resolve => setTimeout(resolve, 2000));

      //   setShowVerificationDialog(false);
      //   setShowNameMismatchDialog(true);
      //   return;
      // }
      // if (!namesMatch && currentAttempt >= 3) {
      //   toast.info('Maximum re-link attempts reached. Proceeding with current bank details.');
      // }
      // ========================================================================
      
      //----proceed with saving bank info
      await proceedWithBankSave({
        gotAccount,
        populated,
        applicationStatus,
        reason,
        business,
        bankAttempts: currentAttempt,
      });
    } catch (error: any) {
      // If the api helper attached responseText/status, surface it in the console for debugging
      console.error('Verification failed:', error);
      if (error?.responseText) console.error('Server response:', error.responseText);

      // Show a friendly backend message if available
      let backendMsg = '';
      try {
        if (error?.responseJson?.errors && Array.isArray(error.responseJson.errors)) {
          backendMsg = error.responseJson.errors.map((e: any) => e.message).join('; ');
        } else if (error?.responseJson?.message) {
          backendMsg = error.responseJson.message;
        } else if (error?.responseText) {
          backendMsg = error.responseText;
        }
      } catch (e) {
        backendMsg = '';
      }

      setIsVerifying(false);
      if (backendMsg) {
        toast.error(backendMsg);
      } else {
        toast.error(error instanceof Error ? error.message : 'Bank verification failed');
      }
    }
  };

  const onSubmit = (data: BankFormData) => {
    console.log("BankSteps onSubmit called with data:", data);
    saveBankInfoAndVerify(data);
  };

  const saveBankInfoAndVerify = async (data: BankFormData) => {
    try {
      // Update context state
      setMerchantData((prev) => ({ ...prev, bankInformation: data }));

      // Save to server (step 3 = bankInformation)
      //await saveStepToServer(3, data);

      toast.success("Bank information saved successfully!");
      console.log("Calling onNext from BankSteps");
      onNext(data);

    } catch (error) {
      console.error('Error processing bank information:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process bank information');
    }
  };

  return (
    <div className="bg-white">
      <div className="w-full mx-auto px-4 md:px-12">
        {/* {SAMPLE_ENABLED && (
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset({
              ...form.getValues(),
              ...sampleBankDetails,
            })}
            className="mb-4"
          >
            Fill Sample Data
          </Button>
        )} */}
        <Separator className="mb-8" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(
            (data) => {
              console.log("Form submitted successfully with data:", data);
              onSubmit(data);
            },
            (errors) => {
              console.log("Form validation failed with errors:", errors);
            }
          )} className="space-y-6">
            {/* Bank Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Bank information
              </h2>

              {/* Show message when data is already populated from API */}
              {bankDataPopulated && !isVerificationStarted && (
                <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-green-900">
                        Bank details loaded from your profile
                      </Label>
                      <p className="text-sm text-green-700">
                        Your bank information has been automatically populated. Please review the details below and proceed to the next step.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Verification Checkbox */}
              {!bankDataPopulated && (
                <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="verify-bank"
                      checked={isVerificationStarted}
                      onCheckedChange={(checked) => {
                        if (checked && !isVerificationStarted) {
                          handleVerification();
                        }
                      }}
                      disabled={isVerificationStarted}
                    />
                    <div className="space-y-2">
                      <Label
                        htmlFor="verify-bank"
                        className="text-sm font-medium text-blue-900 cursor-pointer"
                      >
                        Verify your bank details through our automated process
                      </Label>
                      <p className="text-sm text-blue-700">
                        We'll securely verify your bank account details and automatically populate the form below once verification is complete.
                      </p>
                      {isVerificationStarted && !isVerificationComplete && (
                        <div className="flex items-center space-x-2 text-sm text-blue-600">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Verifying bank details...</span>
                        </div>
                      )}
                      {isVerificationComplete && (
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Bank details verified successfully!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {bankDataPopulated && (

              <div className="space-y-6">
                
                {/* Name on Account */}
                <FormField
                  control={form.control}
                  name="nameOnAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on Account</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          readOnly={bankDataPopulated}
                          disabled={!bankDataPopulated}
                          className={!bankDataPopulated ? "bg-gray-100" : "bg-gray-50"}
                          placeholder="John Doe Business Account"
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        Exact name as it appears on your bank account
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Financial Institution */}
                {/* <FormField
                  control={form.control}
                  name="financialInstitution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financial Institution</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Routing Number */}
                <FormField
                  control={form.control}
                  name="routingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Routing Number</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          readOnly={bankDataPopulated}
                          disabled={!bankDataPopulated}
                          className={!bankDataPopulated ? "bg-gray-100" : "bg-gray-50"}
                          onChange={(e) => {
                            if (bankDataPopulated) return;
                            const formatted = formatRoutingNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                          placeholder="123456789"
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        9-digit number found on the bottom left of your check
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Account Type */}
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={bankDataPopulated ? undefined : field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-3"
                          disabled={!bankDataPopulated}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="checking" 
                              id="checking" 
                              disabled={bankDataPopulated}
                              className={bankDataPopulated ? "opacity-100" : ""}
                            />
                            <FormLabel
                              htmlFor="checking"
                              className={`font-normal ${!bankDataPopulated ? "text-gray-400" : field.value === "checking" ? "text-gray-900" : "text-gray-500"}`}
                            >
                              Checking Account
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="saving" 
                              id="saving" 
                              disabled={bankDataPopulated}
                              className={bankDataPopulated ? "opacity-100" : ""}
                            />
                            <FormLabel 
                              htmlFor="saving" 
                              className={`font-normal ${!bankDataPopulated ? "text-gray-400" : field.value === "saving" ? "text-gray-900" : "text-gray-500"}`}
                            >
                              Saving Account
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Account Number */}
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account number</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          readOnly={bankDataPopulated}
                          disabled={!bankDataPopulated}
                          className={!bankDataPopulated ? "bg-gray-100" : "bg-gray-50"}
                          onChange={(e) => {
                            if (bankDataPopulated) return;
                            const formatted = formatAccountNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                          placeholder="123456789012"
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        4-17 digit number found on the bottom of your check (after routing number)
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              )}
              

            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                type="button"
                onClick={onPrev}
                variant="outline"
                className="order-2 sm:order-1"
              >
                Previous
              </Button>
              <Button
                type="submit"
                disabled={!isVerificationComplete || !bankDataPopulated || !isSavedToServer}
                onClick={() => {
                  console.log("Next button clicked. isVerificationComplete:", isVerificationComplete, "bankDataPopulated:", bankDataPopulated);
                  console.log("Form state:", form.getValues());
                  console.log("Form errors:", form.formState.errors);
                }}
                className={`order-1 sm:order-2 ${
                  !isVerificationComplete || !bankDataPopulated
                    ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {(!isVerificationComplete || !bankDataPopulated) ? "Complete Verification First" : "Next"}
              </Button>
            </div>
          </form>
        </Form>

        {/* Verification Dialog */}
        <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {isVerifying? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                    <span>Verifying Bank Details</span>
                  </>
                )  : isVerificationComplete? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Verification Complete</span>
                  </>
                ): (<></>)}
              </DialogTitle>
              <DialogDescription>
                <div className="space-y-3">
                  {vconnectUrl && (
                    <div className="space-y-2">
                      {/*<p className="text-sm text-gray-700">Open the vConnect link below to complete bank linking. It will open in a new tab.</p>
                      <div className="flex items-center space-x-2">
                        <a href={vconnectUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">{vconnectUrl}</a>
                        <Button size="sm" variant="ghost" onClick={() => { try { window.open(vconnectUrl, '_blank') } catch(e){} }}>Open</Button>
                      </div>*/}
                      {/* <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>Session:</span>
                        <code className="px-2 py-1 bg-gray-100 rounded">{vconnectSessionToken}</code>
                        <Button size="sm" variant="outline" onClick={() => vconnectSessionToken && copyToClipboard(vconnectSessionToken)}>Copy</Button>
                      </div> */}
                      <div>
                        {/* <Button size="sm" onClick={() => {
                          // manual status check
                          setIsVerifying(true);
                          (async () => {
                            try {
                              // If we already have an accountToken, fetch account directly
                              if (accountToken) {
                                const resp = await getVConnectAccount(accountToken);
                                if (resp?.data) setVconnectAccount(resp.data);
                                else throw new Error('Account not available yet');
                              } else if (vconnectSessionToken) {
                                // Otherwise, check the session endpoint to see if webhook populated accountToken
                                const sess = await (await import('@/lib/api')).getVConnectSession(vconnectSessionToken);
                                const sessionData = sess?.data || sess;
                                if (sessionData && sessionData.accountToken) {
                                  setAccountToken(sessionData.accountToken);
                                  // Capture connectType from session response
                                  if (sessionData.connectType) {
                                    setConnectType(sessionData.connectType);
                                  }
                                  const acctResp = await getVConnectAccount(sessionData.accountToken);
                                  if (acctResp?.data) setVconnectAccount(acctResp.data);
                                  else throw new Error('Account not available yet');
                                } else {
                                  throw new Error('Account token not available yet');
                                }
                              } else {
                                throw new Error('No session or account token available');
                              }
                            } catch (e) {
                              console.warn('status check failed', e);
                              toast.error((e as any)?.message || 'Unable to fetch status yet');
                            } finally {
                              setIsVerifying(false);
                            }
                          })();
                        }}>Check status</Button> */}
                      </div>
                    </div>
                  )}

                  {isVerifying && (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                  )}

                  {vconnectAccount && (
                    <div className="p-4 bg-gray-50 rounded border">
                      <h4 className="font-medium">Linked Account Summary</h4>
                      <div className="text-sm text-gray-700 mt-2 space-y-1">
                        {/* <div><strong>Account Token:</strong> <code className="px-2 py-1 bg-white rounded">{vconnectAccount.accountToken || accountToken}</code></div>
                        <div><strong>Connect Type:</strong> <span className="ml-2">{connectType || 'unknown'}</span></div> */}
                        <div><strong>Bank Name:</strong> <span className="ml-2">{vconnectAccount.bankName || vconnectAccount.institutionName || '-'}</span></div>
                        {/* <div><strong>Account Name:</strong> <span className="ml-2">{vconnectAccount.accountName || vconnectAccount.name || '-'}</span></div>*/}
                        <div><strong>Account Number:</strong> <span className="ml-2">{vconnectAccount.accountNumber ? '••••' + (vconnectAccount.accountNumber.slice(-4)) : '-'}</span></div> 
                        <div><strong>Routing Number:</strong> <span className="ml-2">{vconnectAccount.routingNumber || '-'}</span></div>
                      </div>
                    </div>
                  )}

                  {!vconnectUrl && !vconnectAccount && (
                    <p className="text-sm text-gray-600">Follow the link to complete the verification. The dialog will update when we detect the linked account.</p>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Verification Failed / Name Mismatch Dialog */}
        <Dialog open={showNameMismatchDialog} onOpenChange={(open) => {
          // Prevent closing by clicking outside - user must choose an option
          if (!open) return;
        }}>
          <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Bank Verification Failed</span>
              </DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-4 pt-2">
                  <p className="text-sm font-medium text-gray-900">
                    Bank verification failed for the provided business.
                  </p>
                  
                  <p className="text-sm text-gray-700">
                    We were unable to verify your bank account with the business information provided ({nameMismatchData?.businessName || 'your business'}).
                  </p>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Try relinking your bank</strong> to ensure the account details match your registered business information.
                    </p>
                  </div>

                  <p className="text-sm text-gray-600">
                    Attempt {vconnectSessionAttempts} of 3. Would you like to try a different bank account?
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleNameMismatchRelink}
                      className="flex-1"
                      disabled={vconnectSessionAttempts >= 3}
                    >
                      Re-link Bank Account
                    </Button>
                    {/* <Button
                      type="button"
                      onClick={handleNameMismatchContinue}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Continue
                    </Button> */}
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BankSteps;