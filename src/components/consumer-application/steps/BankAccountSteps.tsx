// Add at the top, after imports
const runtimeConfig = (window as any).__RUNTIME_CONFIG__ || { environment: 'production' };
const isDev = runtimeConfig.environment === 'development';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createVConnectSession, getVConnectAccount, getVConnectSession, verifyVAccount, saveConsumerOnboardingStep, getConsumerDetailsBySessionId, icHardBureauPull } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";
import { getRuntimeConfig } from "@/lib/runtimeConfig";
import { useNavigate } from "react-router-dom";

// Formatting utility functions
const formatRoutingNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.slice(0, 9); // Limit to 9 digits
};

const formatAccountNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.slice(0, 17); // Limit to 17 digits
};

/* ---------------- schema & types ---------------- */
const formSchema = z.object({
  // Account access / KBA
  ssnFirst5: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length < 5, { message: "Enter all 5 digits of SSN" }),
  ssnLast4: z
    .string()
    .length(4, "Last 4 digits of SSN are required"),
  //combined ssn 
  socialSecurity: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length === 9, { message: "SSN must be 9 digits" }),
  physicalAddress: z.string().min(1, "Physical address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z
    .string()
    .min(1, "Zip code is required")
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length === 5, { message: "ZIP must be 5 digits" }),

  // Bank info
  nameOnAccount: z.string().min(1, "Name on account is required"),
  routingNumber: z
    .string()
    .min(1, "Routing number is required")
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length === 9, { message: "Routing number must be 9 digits" }),
  accountNumber: z
    .string()
    .min(1, "Account number is required")
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length >= 4 && v.length <= 17, { message: "Account number must be 4–17 digits" }),
  accountType: z.enum(["checking", "saving"], { errorMap: () => ({ message: "Please select an option" }) })
});

export type BankFormData = z.infer<typeof formSchema>;

interface BankAccountStepsProps {
  onNext: (data: BankFormData) => void;
  onPrev: () => void;
  initialValues?: Partial<BankFormData>;
  sessionId?: string;
  consumerData?: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    email?: string;
    phoneNumber?: string;
    zipCode?: string;
    ssn?: string; // Last 4 digits from signup
    id?: string; // sessionId or userId
  };
}

/* ---------------- component ---------------- */
const BankAccountSteps = ({ onNext, onPrev, initialValues, sessionId, consumerData }: BankAccountStepsProps) => {
  const [editing, setEditing] = useState(false);
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
  const [consumerDetails, setConsumerDetails] = useState<any | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  // Helper to check if Validfi verification is bypassed based on environment
  const shouldBypassValidfi = () => {
    const config = getRuntimeConfig();
    if (config) {
      const env = config.environment || 'production';
      const envConfig = config[env] || {};
      return envConfig.bypassValidfi === true;
    }
    return false;
  };

  // Load consumer details on mount
  useEffect(() => {
    const fetchConsumerDetails = async () => {
      if (!sessionId) return;
      
      setIsLoadingDetails(true);
      try {
        const response = await getConsumerDetailsBySessionId(sessionId);
        if (response.success && response.data) {
          setConsumerDetails(response.data);
          
          // Extract last 4 digits of SSN
          const ssnLast4 = response.data.ssn.replace(/\D/g, '').slice(-4);
          
          // Pre-fill form with consumer details
          form.setValue('physicalAddress', response.data.addressLine1 || '');
          form.setValue('city', response.data.city || '');
          form.setValue('state', response.data.state || '');
          form.setValue('zipCode', response.data.zipCode || '');
          form.setValue('ssnLast4', ssnLast4);
          form.setValue('socialSecurity', response.data.ssn.replace(/\D/g, '') || '');
        }
      } catch (error) {
        if (isDev) console.error('[BankAccountSteps] Failed to fetch consumer details:', error);
        toast.error('Failed to load consumer details');
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchConsumerDetails();
  }, [sessionId]);

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

  const form = useForm<BankFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      ssnFirst5: "",
      ssnLast4: consumerData?.ssn || "",
      socialSecurity: "",
      physicalAddress: "",
      city: "",
      state: "",
      zipCode: initialValues?.zipCode ?? "",
      nameOnAccount: initialValues?.nameOnAccount ?? "John Doe Business Account",
      routingNumber: initialValues?.routingNumber ?? "123456789",
      accountNumber: initialValues?.accountNumber ?? "1234567890",
      accountType: initialValues?.accountType ?? "checking",

      // driverLicenseFront: "",
      // driverLicenseBack: "",
      ...(initialValues || {}),
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({ ...form.getValues(), ...initialValues });
        // If initial values are provided (data prefilled from API),
        // set the verification states to allow form submission
      if (initialValues.routingNumber && initialValues.accountNumber && initialValues.nameOnAccount) {
        setIsVerificationComplete(true);
        setBankDataPopulated(true);
      }
    }
  }, [initialValues, form]);

  //combine ssn
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'ssnFirst5' || name === 'ssnLast4') {
        const first5 = (value.ssnFirst5 || '').replace(/\D/g, '');
        const last4 = (value.ssnLast4 || '').replace(/\D/g, '');
        if (first5.length === 5 && last4.length === 4) {
          form.setValue('socialSecurity', first5 + last4, { shouldValidate: true });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const disabledStyle = "bg-blue-50 text-gray-700 placeholder:text-gray-700 border-0 shadow-none";

  const handleVerification = async () => {
      // Bypass in development mode - populate dummy data
      if (shouldBypassValidfi()) {
        if (isDev) console.log('[Development Mode] Bypassing Validifi bank verification - using dummy data');

        form.setValue('nameOnAccount', 'John Doe');
        form.setValue('routingNumber', '123456789');
        form.setValue('accountType', 'checking');
        form.setValue('accountNumber', '9876543210');

        setIsVerificationComplete(true);
        setBankDataPopulated(true);
        setIsVerificationStarted(true);

        toast.success('Bank verification bypassed (development mode)');
        return;
      }

      setIsVerificationStarted(true);
      setShowVerificationDialog(true);
      setIsVerifying(true);
  
      try {
        // Build customer payload for VConnect using merchant context when available
        const vals = form.getValues();
  
        // Map explicit fields required by backend
        const customer = {
          customerId: consumerData?.id?.toString() || "guest_user",
          firstName: consumerData?.firstName || "",
          lastName: consumerData?.lastName || "",
          emailAddress: consumerData?.email || "",
          phoneNumber: consumerData?.phoneNumber?.replace(/\D/g, "") || "",
          address: {
            addressLine1: vals.physicalAddress || "",
            city: vals.city || "",
            state: vals.state || "",
            zip: vals.zipCode || consumerData?.zipCode || "",
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
        if (isDev) console.log("Validifi vconnect payload---", payload);
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
        const currentValues = form.getValues();
        const populated = {
          ...currentValues, // Preserve all existing form values
          nameOnAccount: gotAccount.accountName || currentValues.nameOnAccount || '',
          financialInstitution: gotAccount.bankName || gotAccount.institutionName,
          routingNumber: gotAccount.routingNumber || currentValues.routingNumber || '',
          accountType: (gotAccount.accountType || currentValues.accountType || '').toLowerCase(),
          accountNumber: gotAccount.accountNumber || currentValues.accountNumber || '',
        };

        form.reset(populated);
        setVconnectAccount(gotAccount);
  
        let applicationStatus: string | null = null;
        let reason: string | null = null;
  
        // TODO: Discuss manual enrollment case with client and manual review code cases
        // if (capturedConnectType === 'Manual Enrollment'){
        //   try {
        //     console.log('[BankSteps] Manual Enrollment - verifying account with Validifi');
            
        //     const uniqueId = generateUniqueId();
        //     const verificationPayload = {
        //       uniqueID: uniqueId,
        //       firstName: consumerData?.firstName,
        //       lastName: consumerData?.lastName,
        //       ssn:  vals.socialSecurity,
        //       birthDate: '06151998',
        //       street: vals.physicalAddress,
        //       city: vals.city,
        //       state: vals.state,
        //       zip: vals.zipCode,
        //       bankAccount: gotAccount.accountNumber,
        //       bankRouting: gotAccount.routingNumber,
        //     };
  
        //     console.log('[BankSteps] Validifi verification payload:', verificationPayload);
  
        //     // const verificationResponse = await verifyVAccount(verificationPayload);
        //     // console.log('[BankSteps] Validifi verification response:', verificationResponse);
            
            
        //     //---using dummy api response for now - remove later
        //     const verificationResponse = {
        //       "result": "00",
        //       "resultCode": "AVC1",
        //       "message": "Account Verified",
        //       "bankName": "PNC"
        //     }
        //     const resultCode = verificationResponse.resultCode;
  
        //     const declinedCodes = ['AVC1', 'AVC2', 'AVC3', 'AVC4', 'AVC5', 'AVC7'];
        //     const manualReviewCodes = ['NV', 'AVC0'];
        //     const approvedReviewCodes = ['AVC6', 'AVC8', 'AVC9'];

        //     if (declinedCodes.includes(resultCode)) {
        //       console.log('Application DECLINED:', resultCode);
        //       applicationStatus = 'Declined';
        //       reason = `Bank account verification result code: ${resultCode}`;
        //       navigate("/consumer-onboarding-complete");
     

        //     // } else if (manualReviewCodes.includes(resultCode)) {
        //     //   //---no idea of validifi decisioning for manual review
        //     //   console.log('Account verification requires manual review:', resultCode);
        //     //   applicationStatus = 'Manual Review';
        //     //   reason = `Bank account verification result code: ${resultCode}`;
    

        //     // 
        //     } else if (approvedReviewCodes.includes(resultCode)) {
        //       console.log('Account verification APPROVED:', resultCode);
        //       toast.success(`Account verified successfully: ${verificationResponse.message}${verificationResponse.bankName}`);
        //       setBankDataPopulated(true);

        //   }
        //   else {
        //     console.log('Account verification DECLINED:', resultCode);
        //     applicationStatus = 'Declined';
        //     reason = `Bank account verification result code: ${resultCode}`;
        //     navigate("/consumer-onboarding-complete");
        //   }
  
        //   } catch(e) {
        //     console.error('Validifi verification error:', e);
        //     toast.error('Failed to verify account. Please try again or contact support.');
        //     setIsVerifying(false);
        //     setShowVerificationDialog(false);
        //     return;
        //   }
        // }
  
        setIsVerificationComplete(true);
        setBankDataPopulated(true);
        setIsVerifying(false);
  
        // Persist accountToken
        // immediately reflects the unmasked routing/account numbers.
        try {
          const acctTokenToStore = gotAccount.accountToken || accountToken || null;
          setAccountToken(acctTokenToStore);
  
          (async () => {
            try {

              //console.debug('[BankSteps] persisted bank info and vconnect token to server', savePayload);
            } catch (e) {
              if (isDev) console.warn('[BankSteps] failed to persist bank info to server:', e);
            }
          })();
        } catch (e) {
          if (isDev) console.warn('Failed to persist vconnect account into merchantData', e);
        }
  
        // keep the dialog open so user can view the account summary; they can close it manually
        toast.success('Bank account linked successfully');

        

      } catch (error: any) {
        // If the api helper attached responseText/status, surface it in the console for debugging
        if (isDev) console.error('Verification failed:', error);
        if (isDev && error?.responseText) console.error('Server response:', error.responseText);
  
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

        // Call soft adverse action API and log result
        try {
          const { sendSoftAdverse } = await import('@/lib/api');
          if (consumerData?.id) {
            const adversePayload = {
              userId: Number(consumerData.id),
              reason: 'Bank verification failed',
              details: backendMsg || (error instanceof Error ? error.message : 'Bank verification failed')
            };
            const adverseResult = await sendSoftAdverse(adversePayload);
            if (isDev) console.log('[AdverseAction] Soft adverse action sent:', adverseResult);
          } else {
            if (isDev) console.warn('[AdverseAction] No userId available for soft adverse action');
          }
        } catch (adverseError) {
          if (isDev) console.error('[AdverseAction] Failed to send soft adverse action:', adverseError);
        }

        setIsVerifying(false);
        if (backendMsg) {
          toast.error(backendMsg);
        } else {
          toast.error(error instanceof Error ? error.message : 'Bank verification failed');
        }
      }
    };

  const onSubmit = async (data: BankFormData) => {

    if (isDev) console.log('[BankAccountSteps] Proceeding to next step');
    setIsSubmitting(true);

    //save to server
    try {
      const bankData = {
        socialSecurity: data.socialSecurity,
        physicalAddress: data.physicalAddress,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        nameOnAccount: data.nameOnAccount,
        routingNumber: data.routingNumber,
        accountNumber: data.accountNumber,
        accountType: data.accountType,
      };

      if (isDev) console.log("[BankAccount] Saving bank step data:", bankData);
      await saveConsumerOnboardingStep('bank', sessionId, bankData);
      if (isDev) console.log("[BankAccount] Bank step data saved successfully");
    } catch (saveError) {
      if (isDev) console.error("[BankAccount] Failed to save bank step:", saveError);
    } finally {
      setIsSubmitting(false);
    }

    onNext(data);
  };

  // Workaround: compute a derived "canNext" based on required fields using
  // form.watch(). In some environments form.formState.isValid can be slow to
  // update for controlled/custom inputs; this keeps the UX responsive so the
  // Next button enables when all required values are present.
  const [ssn, physicalAddress, city, stateVal, zipCode, nameOnAccount, routingNumber, accountNumber, accountType] =
    form.watch([
      'socialSecurity',
      'physicalAddress',
      'city',
      'state',
      'zipCode',
      'nameOnAccount',
      'routingNumber',
      'accountNumber',
      'accountType',
    ]);

  const canNext = Boolean(
    ssn && physicalAddress && city && stateVal && zipCode && nameOnAccount && routingNumber && accountNumber && accountType
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Account Access Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Please complete the following information to accept your offer!
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="ssnFirst5"
                render={({ field }) => (
                  <FormItem className="md:col-span-3">
                    <FormLabel>Social Security #</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          value={`***-**-${form.watch('ssnLast4') || '****'}`}
                          readOnly
                          disabled
                          className="bg-gray-50 text-gray-700 cursor-not-allowed"
                        />
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      SSN loaded from your profile
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hidden field for ssnLast4 */}
              <FormField
                control={form.control}
                name="ssnLast4"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="physicalAddress"
                render={({ field }) => (
                  <FormItem className="md:col-span-3">
                    <FormLabel>Physical Address</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled={isLoadingDetails}
                        placeholder={isLoadingDetails ? "Loading..." : "123 Main St"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      disabled={isLoadingDetails}
                      placeholder={isLoadingDetails ? "Loading..." : "Los Angeles"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={isLoadingDetails}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingDetails ? "Loading..." : "Select a state"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="OR">Oregon</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      inputMode="numeric"
                      disabled={isLoadingDetails}
                      placeholder={isLoadingDetails ? "Loading..." : "90001"}
                      onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

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

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button type="button" onClick={onPrev} variant="outline" className="order-2 sm:order-1">
              Previous
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white order-1 sm:order-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={ !isVerificationComplete || !bankDataPopulated || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Next"}
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
                         <div><strong>Bank Name:</strong> <span className="ml-2">{vconnectAccount.bankName || vconnectAccount.institutionName || '-'}</span></div>
                        <div><strong>Account Name:</strong> <span className="ml-2">{vconnectAccount.accountName || vconnectAccount.name || '-'}</span></div>
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
    </div>
  );
};

export default BankAccountSteps;
export type { BankAccountStepsProps };
