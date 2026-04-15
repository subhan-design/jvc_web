import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import SearchableSelect from "@/components/SearchableSelect";
import { Upload, Eye, EyeOff, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useMerchantData } from "@/context/MerchantDataContext";
import type { DocCaptureRequest, VerificationStatusResponse } from "@/types/document-verification";
import { sendEmailOtp, verifyEmailOtp, sendPhoneOtp, verifyPhoneOtp, generateDocCaptureUrl, getDocCaptureResults, validateEmail as apiValidateEmail, validatePhone as apiValidatePhone, validateSSN as apiValidateSSN, validatePhone, submitOnboardingSession, validateReferralCode } from "@/lib/api";
import { getRuntimeConfig } from "@/lib/runtimeConfig";

const formSchema = z.object({
  // Personal Details
  title: z.string().min(1, "Title is required"),
  firstName: z.string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
  lastName: z.string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
  // socialSecurityNumber: z.string()
  //   .min(1, "Social Security Number is required")
  //   .regex(/^\d{3}-\d{2}-\d{4}$/, "SSN must be in format XXX-XX-XXXX")
  //   .refine((val) => val.replace(/-/g, "").length === 9, "SSN must be exactly 9 digits"),
  dob: z.string()
    .min(1, "Date of Birth is required")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date of Birth must be in format MM/DD/YYYY")
    .refine((val) => {
      const [month, day, year] = val.split('/').map(Number);
      const dob = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }, "You must be at least 18 years old"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .toLowerCase(),
  phone: z.string()
    .min(1, "Mobile Phone Numberr is required")
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Mobile Phone Number must be in format (XXX) XXX-XXXX"),
  ownerIntent: z.string().min(1, "Please indicate whether or not you own 25% or more of the company."),
  // Account Access
  communicationConsent: z.boolean().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  ConfirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
  // OTP Option
  otpOption: z.string().min(1, "Please select an OTP option"),
  otp: z.string().optional(),
  //-----otp: z.string().min(1, "OTP is required"),
  // Referral Code
  referralCode: z.string().optional(),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: "Passwords don't match",
  path: ["ConfirmPassword"],
});

export type PersonalDetailsFormData = z.infer<typeof formSchema>;

interface PersonalDetailsStepProps {
  onNext: (data: any) => void;
  onPrev: () => void;
  initialValues?: Partial<any>;
}

const PersonalDetailsStep = ({
  onNext,
  initialValues,
}: PersonalDetailsStepProps) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpMethod, setOtpMethod] = useState<"phone" | "email">("phone");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //const [ssnValidationStatus, setSsnValidationStatus] = useState<"idle" | "checking" | "available" | "exists">("idle");
  //const [ssnError, setSsnError] = useState<string>("");
  const [emailValidationStatus, setEmailValidationStatus] = useState<"idle" | "checking" | "available" | "exists">("idle");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<"idle" | "checking" | "available" | "exists">("idle");
  const [phoneError, setPhoneError] = useState<string>("");
  const [referralCodeStatus, setReferralCodeStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [referralReferrerName, setReferralReferrerName] = useState<string>("");
  
  // Document verification states
  const [docVerificationModalOpen, setDocVerificationModalOpen] = useState(false);
  const [docVerificationStatus, setDocVerificationStatus] = useState<"idle" | "sending" | "sent" | "PENDING" | "PASSED" | "FAILED" | "ABANDONED" | "DECLINED" | "SUSPENDED">("idle");
  const [docVerificationAttempts, setDocVerificationAttempts] = useState(0);
  const [docCaptureLink, setDocCaptureLink] = useState<string>("");
  const [expRequestId, setExpRequestId] = useState<string>("");
  const [clientReferenceId, setClientReferenceId] = useState<string>("");
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string>("");
  const [isDocVerified, setIsDocVerified] = useState(false);
  const [isCheckingResults, setIsCheckingResults] = useState(false);
  const [maxAttemptsErrorModal, setMaxAttemptsErrorModal] = useState(false);
  const [maxAttemptsErrorMessage, setMaxAttemptsErrorMessage] = useState<string>("");

  const { setMerchantData, saveStepToServer, sessionId, completeSession } = useMerchantData();
  const navigate = useNavigate();
  let applicationStatus: string | null = null;
  let reason: string | null = null;

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      //socialSecurityNumber: "",
      dob: "",
      email: "",
      phone: "",
      ownerIntent: "",
      communicationConsent: false,
      password: "",
      ConfirmPassword: "",
      //---otpOption: "",
      otpOption: "phone", // Default to phone
      otp: "",
      referralCode: "",
      ...(initialValues || {}),
    },
  });

  // Reset form with initialValues when they change
  useEffect(() => {
    if (initialValues) {
      form.reset({
        title: "",
        firstName: "",
        lastName: "",
        //socialSecurityNumber: "",
        dob: "",
        email: "",
        phone: "",
        ownerIntent: "",
        communicationConsent: "",
        password: "",
        ConfirmPassword: "",
        //---otpOption: "",
        otpOption: "phone", // Default to phone
        otp: "",
        referralCode: "",
        ...initialValues,
      });
    }
  }, [initialValues, form]);

  // Note: Data persistence is now handled server-side only.
  // initialValues are passed from parent and populated from merchantData context.

  // Document verification state is now managed in server-side session only

  // Reset modal state when opened
  useEffect(() => {
    if (otpModalOpen) {
      setOtpSent(false);
      setOtpVerified(false);
      form.setValue("otp", "");
    }
  }, [otpModalOpen]);

  // Auto-save removed - data is now saved only on form submission to reduce server load

  // Unmount persistence removed - server-side persistence only

  // Password match validation
  const password = form.watch("password");
  const confirmPassword = form.watch("ConfirmPassword");
  
  const getPasswordMatchStatus = () => {
    if (!confirmPassword) return null;
    if (!password) return null;
    return password === confirmPassword;
  };

  // SSN validation function (mock validation only)
  // const validateSSN = useCallback(async (ssn: string) => {
  //   if (!ssn || ssn.replace(/\D/g, '').length < 9) {
  //     setSsnValidationStatus("idle");
  //     setSsnError("");
  //     return;
  //   }

  //   setSsnValidationStatus("checking");
  //   setSsnError("");

  //   try {
  // const res = await apiValidateSSN(ssn);
  //     const exists = res?.data?.exists || false;
  //     if (exists) {
  //       setSsnValidationStatus("exists");
  //       setSsnError(res?.data?.message || "This Social Security Number is already registered");
  //     } else {
  //       setSsnValidationStatus("available");
  //       setSsnError("");
  //     }
  //   } catch (error) {
  //     setSsnValidationStatus("idle");
  //     setSsnError("Error validating SSN. Please try again.");
  //     console.error("SSN validation error:", error);
  //   }
  // }, []);

  // Debounced SSN validation
  // useEffect(() => {
  //   const ssn = form.watch("socialSecurityNumber");
  //   const timer = setTimeout(() => {
  //     validateSSN(ssn);
  //   }, 500); // 500ms debounce

  //   return () => clearTimeout(timer);
  // }, [form.watch("socialSecurityNumber"), validateSSN]);

  // Email validation function (mock validation only)
  const validateEmail = useCallback(async (email: string) => {
    if (!email || !email.includes("@")) {
      setEmailValidationStatus("idle");
      setEmailError("");
      return;
    }

    // Bypass in development mode
    if (shouldBypassValidfi()) {
      console.log('[Development Mode] Bypassing email validation');
      setEmailValidationStatus("available");
      setEmailError("");
      return;
    }

    // Bypass in development mode
    if (shouldBypassValidfi()) {
      console.log('[Development Mode] Bypassing email validation');
      setEmailValidationStatus("available");
      setEmailError("");
      return;
    }

    setEmailValidationStatus("checking");
    setEmailError("");

    try {
  const res = await apiValidateEmail(email);
      const exists = res?.data?.exists || false;
      if (exists) {
        setEmailValidationStatus("exists");
        setEmailError(res?.data?.message || "This email address is already registered");
      } else {
        setEmailValidationStatus("available");
        setEmailError("");
      }
    } catch (error) {
      setEmailValidationStatus("idle");
      setEmailError("Error validating email. Please try again.");
      console.error("Email validation error:", error);
    }
  }, []);

  // Debounced Email validation
  useEffect(() => {
    const email = form.watch("email");
    const timer = setTimeout(() => {
      validateEmail(email);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [form.watch("email"), validateEmail]);

  // Debounced Phone validation
  useEffect(() => {
    const phone = form.watch("phone");
    const timer = setTimeout(() => {
      // Only validate if phone has 10 digits
      const digits = (phone || '').replace(/\D/g, '');
      if (digits.length === 10) {
        // Bypass in development mode
        if (shouldBypassValidfi()) {
          console.log('[Development Mode] Bypassing phone validation');
          setPhoneValidationStatus('available');
          setPhoneError('');
        } else {
            (async () => {
          try {
            setPhoneValidationStatus('checking');
            setPhoneError('');
                const digitsOnly = (phone || '').replace(/\D/g, '');
                const res = await apiValidatePhone(digitsOnly);
                // helpful debug log when running locally
                console.debug('[phone-validate] sent=', digitsOnly, 'resp=', res);
            const exists = res?.data?.exists || false;
            if (exists) {
              setPhoneValidationStatus('exists');
              setPhoneError(res?.data?.message || 'Mobile Phone Number is already registered');
            } else {
              setPhoneValidationStatus('available');
              setPhoneError('');
            }
          } catch (err) {
            setPhoneValidationStatus('idle');
            setPhoneError('Error validating phone. Please try again.');
            console.error('Phone validation error:', err);
          }
        })();
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [form.watch("phone")]);

  // Debounced referral code validation
  useEffect(() => {
    const code = form.watch("referralCode");
    const timer = setTimeout(async () => {
      if (!code || code.trim() === "") {
        setReferralCodeStatus("idle");
        setReferralReferrerName("");
        return;
      }

      setReferralCodeStatus("checking");
      setReferralReferrerName("");
      try {
        const res = await validateReferralCode(code.trim());
        if (res?.data?.valid) {
          setReferralCodeStatus("valid");
          setReferralReferrerName(res.data.referrerFirstName || "");
        } else {
          setReferralCodeStatus("invalid");
          setReferralReferrerName("");
        }
      } catch (err) {
        setReferralCodeStatus("invalid");
        setReferralReferrerName("");
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [form.watch("referralCode")]);

  // Format SSN input
  const formatSSN = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
  };

  // Format Phone input
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  // Format DOB input
  const formatDOB = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  };

  // Helper to check if doc capture is bypassed in development mode
  const shouldBypassDocCapture = () => {
    const config = getRuntimeConfig();
    if (config) {
      const env = config.environment || 'production';
      const envConfig = config[env] || {};
      return envConfig.bypassDocCapture === true;
    }
    return false;
  };

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

  const handleSendOTP = async () => {
    const otpOption = form.getValues("otpOption");
    const phone = form.getValues("phone");
    const email = form.getValues("email");

    // Get the contact based on selected option
    const contact = otpOption === "email" ? email : phone;

    if (!otpOption) {
      toast.error("Please select OTP method");
      return;
    }

    if (!contact) {
      toast.error(`Please fill in your ${otpOption === "email" ? "email" : "Mobile Phone Number"} in the form above`);
      return;
    }

    setIsLoading(true);

    try {
      if (otpOption === "email") {
        // Block if email already exists
        if (emailValidationStatus === "exists") {
          toast.error(emailError || "Email is not available for verification");
          setIsLoading(false);
          return;
        }

        // Use real API for email OTP
        const response = await sendEmailOtp(email);
        console.log("Email OTP response:", response);

        setOtpSent(true);
        toast.success(`OTP sent to your email: ${email}`);
      } else {
        // Validate phone availability first
        try {
          const phoneRes = await validatePhone(phone);
          const exists = phoneRes?.data?.exists || false;
          if (exists) {
            toast.error(phoneRes?.data?.message || "Mobile Phone Number is already registered");
            setIsLoading(false);
            return;
          }
        } catch (err) {
          // if validation endpoint fails, allow OTP attempt (but warn)
          console.warn('Phone validation failed, attempting to send OTP anyway', err);
        }

        // Use real API for phone OTP
        const response = await sendPhoneOtp(phone);
        console.log("Phone OTP response:", response);

        setOtpSent(true);
        toast.success(`OTP sent to your phone: ${contact}`);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const otp = form.getValues("otp");
    const otpOption = form.getValues("otpOption");
    const phone = form.getValues("phone");
    const email = form.getValues("email");

    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setIsLoading(true);

    try {
      if (otpOption === "email") {
        // Use real API for email OTP verification
        const response = await verifyEmailOtp(email, otp);
        console.log("Email OTP verification response:", response);
      } else {
        // Use real API for phone OTP verification
        const response = await verifyPhoneOtp(phone, otp);
        console.log("Phone OTP verification response:", response);
      }

      setOtpVerified(true);
      toast.success("OTP verified successfully!");

      // Close OTP modal after successful verification
      setOtpModalOpen(false);

      setDocVerificationStatus("idle");
      setDocVerificationModalOpen(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendDocCaptureLink = async () => {
    // Bypass in development mode
    if (shouldBypassDocCapture()) {
      console.log('[Development Mode] Bypassing document capture link generation');
      setIsDocVerified(true);
      setDocVerificationStatus('PASSED');
      setDocVerificationModalOpen(false);
      toast.success('Document verification bypassed (development mode)');
      return;
    }

    setDocVerificationStatus("sending");

    try {
      const firstName = form.getValues("firstName");
      const lastName = form.getValues("lastName");
      const email = form.getValues("email");
      const phone = form.getValues("phone");

      const result = await generateDocCaptureUrl({
        firstName,
        lastName,
        email,
        phone,
        notificationRequired: false
      });
      setDocCaptureLink(result.url || ''); // Handle optional URL
      setExpRequestId(result.expRequestId);
      setClientReferenceId(result.clientReferenceId);
      setDocVerificationStatus("sent");

      // Note: Verification IDs are now stored in server-side session

    } catch (error) {
      console.error("Failed to generate document capture URL:", error);
      setDocVerificationStatus("FAILED");

      //----error message for max attempts reached
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("Max attempts reached")) {
        const match = errorMessage.match(/"message":"([^"]+)"/);
        const displayMessage = match ? match[1] : "Max attempts reached. Try again in 60 minutes.";

        setMaxAttemptsErrorMessage(displayMessage);
        setMaxAttemptsErrorModal(true);
        setDocVerificationModalOpen(false);
      } else {
        toast.error("Failed to generate verification link. Please try again.");
      }
    }
  };

  const handleCheckVerificationResults = async () => {
    // Bypass in development mode
    if (shouldBypassDocCapture()) {
      console.log('[Development Mode] Bypassing verification results check');
      setIsDocVerified(true);
      setDocVerificationStatus('PASSED');
      setShowResultsModal(false);
      setDocVerificationModalOpen(false);
      return;
    }

    if (!expRequestId || !clientReferenceId) return;

    setIsCheckingResults(true);
    setShowResultsModal(true);
    setDocVerificationModalOpen(false);

    const MAX_POLL_ATTEMPTS = 60; // Poll for up to 60 attempts (5 minutes at 5 second intervals)
    const POLL_INTERVAL = 5000; // 5 seconds between polls

    let pollAttempts = 0;

    const pollForResults = async (): Promise<void> => {
      try {
        console.log(`Polling attempt ${pollAttempts + 1}/${MAX_POLL_ATTEMPTS}`);

       const result = await getDocCaptureResults(expRequestId, clientReferenceId);
       const authResult = result.authResult;
       const matchResult = result.matchResult;

      //  let authResult = "PASSED";
      //  let matchResult = "true";

        console.log("AuthResult----", authResult);
        console.log("MatchResult----", matchResult);

        // If still PENDING, continue polling
        if (authResult === 'PENDING') {
          pollAttempts++;

          if (pollAttempts < MAX_POLL_ATTEMPTS) {
            // Wait and poll again
            await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
            return pollForResults();
          } else {
            // Max attempts reached, treat as timeout
            console.error("Polling timeout: Max attempts reached");
            setDocVerificationStatus("FAILED");
            setVerificationResult("FAILED");
            toast.error("Verification timeout. Please try again.");
            return;
          }
        }

        if (authResult === 'PASSED' && matchResult === 'true') {
          setVerificationResult("PASSED");
          setIsDocVerified(true);
          setDocVerificationStatus("PASSED");
          toast.success("Document verification passed!");
          // Results will be saved to server-side session
        }
        else if (authResult === 'PASSED' && matchResult === 'false') {
          const newAttempts = docVerificationAttempts + 1;
          setDocVerificationAttempts(newAttempts);
          setIsDocVerified(false);
          setDocVerificationStatus("FAILED");
          setVerificationResult("FAILED");
          toast.error("Document verification failed: Information does not match!");
        }
        else if (authResult === 'ABANDONED' || authResult === 'FAILED' || authResult === 'SUSPENDED') {
          const newAttempts = docVerificationAttempts + 1;
          setDocVerificationAttempts(newAttempts);
          setDocVerificationStatus(authResult);
          setVerificationResult(authResult);
          // Attempts will be tracked on server-side session
        } 
        else {
          // Handle any unexpected status by treating as FAILED
          const newAttempts = docVerificationAttempts + 1;
          setDocVerificationAttempts(newAttempts);
          setDocVerificationStatus("FAILED");
          setVerificationResult("FAILED");
        }

      } catch (error) {
        console.error("Failed to check verification results:", error);
        setDocVerificationStatus("FAILED");
        setVerificationResult("FAILED");
        toast.error("Failed to check verification results. Please try again.");
      }
    };

    try {
      await pollForResults();
    } finally {
      setIsCheckingResults(false);
    }
  };
  

  
  const handleRetryDocVerification = () => {
    if (docVerificationAttempts >= 3) {
      toast.error("Maximum verification attempts reached. Please try again later.");
      return;
    }
    
    setDocVerificationStatus("idle");
    setDocCaptureLink("");
  };

  // Function to reset document verification state (for testing/admin purposes)
  const resetDocumentVerification = () => {
    setIsDocVerified(false);
    setDocVerificationAttempts(0);
    setDocVerificationStatus("idle");
    setDocCaptureLink("");
    console.log("Document verification state reset (local state only - server state persists)");
  };

  // Add to window for testing purposes (remove in production)
  if (process.env.NODE_ENV === 'development') {
    (window as any).resetDocVerification = resetDocumentVerification;
  }

  // Bypass document verification in development mode
  useEffect(() => {
    const config = getRuntimeConfig();
    if (config) {
      const env = config.environment || 'production';
      const envConfig = config[env] || {};
      
      if (envConfig.bypassDocCapture === true) {
        console.log('[Development Mode] Bypassing document verification');
        setIsDocVerified(true);
        setDocVerificationStatus('PASSED');
      }
    }
  }, []);

  // Check for verification results when page regains focus
  useEffect(() => {
    const handleFocus = () => {
      if (expRequestId && !isDocVerified && docVerificationStatus === 'sent') {
        handleCheckVerificationResults();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isDocVerified, docVerificationStatus, expRequestId]);

  useEffect(() => {
    if (docVerificationModalOpen && otpVerified && docVerificationStatus === 'idle') {
      handleSendDocCaptureLink();
    }
  }, [docVerificationModalOpen, otpVerified, docVerificationStatus]);

  // Phone change tracking removed - handled server-side

  const onSubmit = async (data: PersonalDetailsFormData) => {
    console.log("PersonalDetailsStep onSubmit called with data:", data);
    
    // Check Email validation - only block if explicitly exists
    if (emailValidationStatus === "exists") {
      toast.error("Cannot proceed: Email address is already registered");
      return;
    }

    if (emailValidationStatus === "checking") {
      toast.error("Please wait for email validation to complete");
      return;
    }

    // First, check with server if data has changed (hash comparison)
    try {
      const { otp: _, otpOption: __, ...dataToCheck } = data;
      const checkPayload = { ...dataToCheck, role: 'business_owner', checkOnly: true };
      
      const checkResponse = await saveStepToServer(0, checkPayload);
      
      // Server response includes: requiresOtpVerification, requiresDocVerification
      const serverRequiresOtp = checkResponse?.data?.requiresOtpVerification ?? true;
      const serverRequiresDoc = checkResponse?.data?.requiresDocVerification ?? true;
      
      console.log('[PersonalDetailsStep] Server verification check:', {
        requiresOtpVerification: serverRequiresOtp,
        requiresDocVerification: serverRequiresDoc
      });
      
      // If server says no verification needed (data unchanged), skip to save
      if (!serverRequiresOtp && !serverRequiresDoc) {
        console.log('[PersonalDetailsStep] No data changes detected, skipping verification');
        toast.success("No changes detected");
        savePersonalInfoToAPI(data);
        return;
      }
      
      // Data changed - proceed with verification flow
      if (serverRequiresOtp && !otpVerified) {
        const phone = form.getValues("phone");

        if (!phone) {
          toast.error("Please fill in your mobile phone number");
          return;
        }

        // Validate phone availability first
        try {
          const phoneCheckResponse = await validatePhone(phone);
          if (phoneCheckResponse?.data?.exists) {
            toast.error(phoneCheckResponse?.data?.message || "Mobile Phone Number is already registered");
            return;
          }
        } catch (err) {
          console.warn('Phone validation failed, attempting to send OTP anyway', err);
        }

        // Open OTP modal and send OTP
        setOtpModalOpen(true);
        setIsLoading(true);

        try {
          const response = await sendPhoneOtp(phone);
          console.log("Phone OTP response:", response);
          setOtpSent(true);
          toast.success(`OTP sent to your phone: ${phone}`);
        } catch (error) {
          console.error("Error sending OTP:", error);
          toast.error("Failed to send OTP");
          setOtpModalOpen(false);
        } finally {
          setIsLoading(false);
        }
        return;
      }
      
      //Check document verification - require new attempt if server requires it
      if (serverRequiresDoc && (!isDocVerified || ["FAILED", "ABANDONED", "CANCELLED", "DECLINE"].includes(docVerificationStatus))) {
        console.log("Doc capture required by server");
        console.log("DocVerificationAttempts----", docVerificationAttempts);
        if (docVerificationAttempts >= 3) {
          console.log("[PersonalDetailsStep] Max DocCapture attempts reached, proceeding to save as declined");

          applicationStatus = "Declined";
          reason = "Driver's License authenticity in DocCapture failed";
          
          savePersonalInfoToAPI(data);
          return;
        }
        
        console.log("[PersonalDetailsStep] Opening doc verification modal - waiting for verification");
        setDocVerificationStatus("idle");
        setDocVerificationModalOpen(true);
        return; 
      }

      savePersonalInfoToAPI(data);
      
    } catch (error) {
      console.error('[PersonalDetailsStep] Error checking verification requirements:', error);
      // On error, proceed with verification as fallback
      toast.error('Error checking data. Please complete verification.');
      
      if (!otpVerified) {
        setOtpModalOpen(true);
        return;
      }
    }
  };

  const savePersonalInfoToAPI = async (data: PersonalDetailsFormData) => {
    try {
      // Save to local state and server
      const { otp: _, otpOption: __, ...rest } = data;

      // Ensure primary owner's role is set to business_owner when saving
      const personalDetailsWithRole = { ...rest, role: 'business_owner' };

      // Update context state (include role)
      setMerchantData((prev) => ({ ...prev, personalDetails: personalDetailsWithRole }));

      const savePayload: any = {
        ...personalDetailsWithRole,
      };
      if (applicationStatus) {
        savePayload.applicationStatus = applicationStatus;
      }
      if (reason) {
        savePayload.reason = reason;
      }

      // Save to server (step 0 = personalDetails)
      const response = await saveStepToServer(0, savePayload);
      //----
      //response.data.applicationStatus = "Manual Review";
      if (response?.data?.applicationStatus === "Declined") {
        completeSession();
        const denialMessage = 'Unfortunately, we are unable to approve your merchant application as there appears to be an issue with verifying your identity. Please contact your account manager.';
        navigate(`/merchant-onboarding-complete?status=denied&message=${encodeURIComponent(denialMessage)}`);
        return;
      }

      else if (response?.data?.applicationStatus === "Manual Review") {
        //completeSession();
        navigate(`/merchant-onboarding-complete?status=review`);
        return;
      }

      toast.success("Personal details saved successfully!");

      console.log("About to call onNext with data:", rest);
      onNext(rest);
      console.log("onNext called successfully");

    } catch (error) {
      console.error('Error saving personal information:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save personal information');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Details Section */}
          <div>
            <h3 className="text-xl font-semibold text-ateneoBlue mb-4">
              Personal Details
            </h3>
            <div className="mb-6">
              <p className="text-sm text-black-800">
                <span className="font-semibold">Note:</span> Must be business owner or an authorized officer/manager to apply. We do not use the information collected to obtain a credit report on any individual or business.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="president">President</SelectItem>
                        <SelectItem value="vp">Vice President</SelectItem>
                        <SelectItem value="secretary">Secretary</SelectItem>
                        <SelectItem value="treasurer">Treasurer</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="sole">Sole Proprietor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name  <span className="text-gray-500 italic">(as per Driving License)</span></FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name  <span className="text-gray-500 italic">(as per Driving License)</span></FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="socialSecurityNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Security Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          {...field}
                          onChange={(e) => {
                            const formatted = formatSSN(e.target.value);
                            field.onChange(formatted);
                          }}
                          placeholder="XXX-XX-XXXX"
                          maxLength={11}
                          className={
                            ssnValidationStatus === "exists" 
                              ? "border-red-500 focus:border-red-500" 
                              : ssnValidationStatus === "available"
                              ? "border-green-500 focus:border-green-500"
                              : ""
                          }
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          {ssnValidationStatus === "checking" && (
                            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                          )}
                          {ssnValidationStatus === "available" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          {ssnValidationStatus === "exists" && (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                  
                    {ssnValidationStatus === "available" && (
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        SSN is available
                      </p>
                    )}
                    {ssnValidationStatus === "exists" && (
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <XCircle className="h-3 w-3 mr-1" />
                        {ssnError}
                      </p>
                    )}
                    {ssnError && ssnValidationStatus === "idle" && (
                      <p className="text-sm text-red-600 mt-1">{ssnError}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type="email" 
                          {...field}
                          className={
                            emailValidationStatus === "exists" 
                              ? "border-red-500 focus:border-red-500" 
                              : emailValidationStatus === "available"
                              ? "border-green-500 focus:border-green-500"
                              : ""
                          }
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          {emailValidationStatus === "checking" && (
                            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                          )}
                          {emailValidationStatus === "available" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          {emailValidationStatus === "exists" && (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    {/* Email validation message */}
                    {emailValidationStatus === "available" && (
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Email is available
                      </p>
                    )}
                    {emailValidationStatus === "exists" && (
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <XCircle className="h-3 w-3 mr-1" />
                        {emailError}
                      </p>
                    )}
                    {emailError && emailValidationStatus === "idle" && (
                      <p className="text-sm text-red-600 mt-1">{emailError}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          field.onChange(formatted);
                        }}
                        placeholder="(XXX) XXX-XXXX"
                        maxLength={14}
                      />
                    </FormControl>
                    {phoneValidationStatus === "checking" && (
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Checking Mobile Phone Number...
                      </p>
                    )}
                    {phoneValidationStatus === "available" && (
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mobile Phone Number is available
                      </p>
                    )}
                    {phoneValidationStatus === "exists" && (
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <XCircle className="h-3 w-3 mr-1" />
                        {phoneError}
                      </p>
                    )}
                    {phoneError && phoneValidationStatus === "idle" && (
                      <p className="text-sm text-red-600 mt-1">{phoneError}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const formatted = formatDOB(e.target.value);
                          field.onChange(formatted);
                        }}
                        placeholder="MM/DD/YYYY"
                        maxLength={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => {
                  const [view, setView] = useState<'year' | 'month' | 'day'>('day');
                  const [selectedYear, setSelectedYear] = useState(2000);
                  const [selectedMonth, setSelectedMonth] = useState(0);
                  
                  const currentYear = new Date().getFullYear();
                  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
                  const months = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                  ];

                  return (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                onChange={(e) => {
                                  const formatted = formatDOB(e.target.value);
                                  field.onChange(formatted);
                                }}
                                placeholder="MM/DD/YYYY"
                                maxLength={10}
                                className="pr-10"
                              />
                              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="p-3">
                            {view === 'year' && (
                              <div>
                                <div className="text-sm font-semibold mb-3 text-center">Select Year</div>
                                <div className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto">
                                  {years.map((year) => (
                                    <Button
                                      key={year}
                                      type="button"
                                      variant={selectedYear === year ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => {
                                        setSelectedYear(year);
                                        setView('month');
                                      }}
                                      className="h-10"
                                    >
                                      {year}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {view === 'month' && (
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setView('year')}
                                    className="font-semibold hover:bg-gray-100"
                                  >
                                    {selectedYear}
                                  </Button>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  {months.map((month, index) => (
                                    <Button
                                      key={month}
                                      type="button"
                                      variant={selectedMonth === index ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => {
                                        setSelectedMonth(index);
                                        setView('day');
                                      }}
                                      className="h-10"
                                    >
                                      {month.slice(0, 3)}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {view === 'day' && (
                              <div>
                                <div className="flex items-center justify-between mb-2 px-1">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setView('month')}
                                    className="font-semibold hover:bg-gray-100 text-sm"
                                  >
                                    {months[selectedMonth]} {selectedYear}
                                  </Button>
                                </div>
                                <Calendar
                                  mode="single"
                                  selected={field.value ? new Date(field.value.split('/')[2], parseInt(field.value.split('/')[0]) - 1, field.value.split('/')[1]) : undefined}
                                  onSelect={(date) => {
                                    if (date) {
                                      const formatted = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
                                      field.onChange(formatted);
                                    }
                                  }}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  month={new Date(selectedYear, selectedMonth)}
                                  onMonthChange={(month) => {
                                    setSelectedYear(month.getFullYear());
                                    setSelectedMonth(month.getMonth());
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 pt-6">
              <FormField
                control={form.control}
                name="ownerIntent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Are you an owner with 25% or more ownership in the company?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="owner-intent-yes" />
                          <FormLabel htmlFor="owner-intent-yes" className="cursor-pointer">Yes</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="owner-intent-no" />
                          <FormLabel htmlFor="owner-intent-no" className="cursor-pointer">No</FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator/>

          {/* OTP Verification Section*/}
          <div>
            {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">
              OTP Verification
            </h3>
            <FormField
              control={form.control}
              name="otpOption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select OTP Method</FormLabel>
                  <RadioGroup
                    onValueChange={(value) => {
                      const phone = form.getValues("phone");
                      const email = form.getValues("email");
                      const contact = value === "email" ? email : phone;
                      
                      if (!contact) {
                        toast.error(`Please fill in your ${value === "email" ? "email" : "phone number"} first`);
                        return;
                      }
                      
                      field.onChange(value);
                      setOtpMethod(value as "phone" | "email");
                      setOtpModalOpen(true);
                      
                      // Auto-send OTP after modal opens
                      setTimeout(() => {
                        handleSendOTP();
                      }, 100);
                    }}
                    defaultValue={field.value}
                    className="flex flex-row space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="otp-phone" />
                      <FormLabel htmlFor="otp-phone" className="cursor-pointer">Phone number</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="otp-email" />
                      <FormLabel htmlFor="otp-email" className="cursor-pointer">Email</FormLabel>
                    </div>
                  </RadioGroup> */}
                  {/* //--------- uncomment below this*/}
                  {/* <FormLabel>OTP Method</FormLabel>
                  <RadioGroup
                    value="phone"
                    onValueChange={() => {}} // Disabled, no change allowed
                    className="flex flex-row space-x-6"
                  >
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <RadioGroupItem value="phone" id="otp-phone" disabled />
                      <FormLabel htmlFor="otp-phone" className="cursor-default">Phone number (OTP will be sent when you click Next)</FormLabel>
                    </div>
                  </RadioGroup> */}
                  {/* Email option commented out */}
                  {/* <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="otp-email" />
                      <FormLabel htmlFor="otp-email" className="cursor-pointer">Email</FormLabel>
                    </div> */}
                  {/* <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          {/* <Separator /> */}

          {/* ID Verification Section */}
          {/* <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ID Verification
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="driverLicenseFront"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload driver license (front)</FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">
                          Drop a file here or click to upload
                        </p>
                    
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          className="mx-auto mt-2 w-auto cursor-pointer"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="driverLicenseBack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload driver license (back)</FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">
                          Drop a file here or click to upload
                        </p>
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          className="block mx-auto mt-2 w-fit cursor-pointer text-sm"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div> */}

          {/* <Separator /> */}

          {/* Account Access Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Access
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          {...field} 
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ConfirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          {...field} 
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    {/* Password match validation message */}
                    {confirmPassword && (
                      <div className="mt-1">
                        {getPasswordMatchStatus() === true ? (
                          <p className="text-sm text-green-600 flex items-center">
                            <span className="mr-1">✓</span>
                            Passwords match
                          </p>
                        ) : getPasswordMatchStatus() === false ? (
                          <p className="text-sm text-red-600 flex items-center">
                            <span className="mr-1">✗</span>
                            Passwords do not match
                          </p>
                        ) : null}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Referral Code Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Referral Code
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Referral Code (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <div className="mt-1">
                      {referralCodeStatus === "checking" && (
                        <p className="text-sm text-yellow-600">Checking referral code...</p>
                      )}
                      {referralCodeStatus === "valid" && (
                        <p className="text-sm text-green-600">
                          Referred by {referralReferrerName || "a friend"}
                        </p>
                      )}
                      {referralCodeStatus === "invalid" && (
                        <p className="text-sm text-red-600">Invalid referral code</p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Communications Consent */}
          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="communicationConsent"
              render={({ field }) => (
            <FormItem>
            <FormControl>
              <div className="flex items-start space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                id="communication-consent"
              />
              <FormLabel htmlFor="communication-consent" className="text-sm">
              I agree to receive account-related communications by email, phone, and text message.
              </FormLabel>
              </div>
            </FormControl>
            <FormDescription className="text-xs mt-1">
              By providing your email address and phone number, you consent to receive communications from us related to your application, account, membership, services, events, billing, and other account-related matters. Communications may be sent via email, phone call, or text message. Message and data rates may apply. You may opt out of non-essential communications at any time.
            </FormDescription>
            <FormMessage />
            </FormItem>
          )}
          />
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Security Notice:</span> For your security, JVC Card will send a one-time passcode (OTP) to the number provided to verify your identity. Receiving these security messages is required to access your account. Message and data rates may apply. By selecting Next, you consent to receive OTPs at the number you provide. See {" "}
              <a 
              href="https://jvcpayments.com/otp-terms-of-service/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
              >
              OTP Terms of Service
              </a>
              <span> here.</span>
            </p>
          </div>
          {/* Submit Button */}
          <div className="flex flex-col pt-4">
            {/* Validation Status Summary */}
            {/* <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
              <h4 className="text-sm font-semibold mb-2">Form Validation Status:</h4>
              <div className="space-y-1 text-sm">
                <p className={otpVerified ? "text-green-600" : "text-red-600"}>
                  {otpVerified ? "✅" : "❌"} OTP verification {otpVerified ? "completed" : "required"}
                </p>
                <p className={
                  ssnValidationStatus === "available" ? "text-green-600" : 
                  ssnValidationStatus === "checking" ? "text-yellow-600" : 
                  ssnValidationStatus === "exists" ? "text-red-600" : "text-gray-500"
                }>
                  {ssnValidationStatus === "available" ? "✅" : 
                   ssnValidationStatus === "checking" ? "⏳" :
                   ssnValidationStatus === "exists" ? "❌" : "⚪"} 
                  SSN validation: {ssnValidationStatus === "idle" ? "not started" : ssnValidationStatus}
                </p>
                <p className={
                  emailValidationStatus === "available" ? "text-green-600" : 
                  emailValidationStatus === "checking" ? "text-yellow-600" : 
                  emailValidationStatus === "exists" ? "text-red-600" : "text-gray-500"
                }>
                  {emailValidationStatus === "available" ? "✅" : 
                   emailValidationStatus === "checking" ? "⏳" :
                   emailValidationStatus === "exists" ? "❌" : "⚪"} 
                  Email validation: {emailValidationStatus === "idle" ? "not started" : emailValidationStatus}
                </p>
                <p className="text-blue-600 text-xs mt-2">
                  Debug: Form errors count: {Object.keys(form.formState.errors).length}
                </p>
                {Object.keys(form.formState.errors).length > 0 && (
                  <div className="text-xs text-red-600 mt-1">
                    Form errors: {Object.keys(form.formState.errors).join(", ")}
                  </div>
                )}
              </div>
            </div> */}

          {/* Verification Status Section */}
          {/* <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Verification Status</h4>
            
            <div className="flex items-center space-x-2">
              {otpVerified ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-400" />
              )}
              <span className={`text-sm ${otpVerified ? 'text-green-600' : 'text-gray-500'}`}>
                OTP Verification {otpVerified ? 'Complete' : 'Required'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {isDocVerified ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : docVerificationStatus === "blocked" ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : docVerificationStatus === "pending" ? (
                <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-400" />
              )}
              <span className={`text-sm ${
                isDocVerified ? 'text-green-600' : 
                docVerificationStatus === "blocked" ? 'text-red-500' :
                docVerificationStatus === "pending" ? 'text-blue-500' :
                'text-gray-500'
              }`}>
                Document Verification {
                  isDocVerified ? 'Complete' : 
                  docVerificationStatus === "blocked" ? 'Blocked' :
                  docVerificationStatus === "pending" ? 'In Progress' :
                  'Required'
                }
              </span>
              {docVerificationAttempts > 0 && !isDocVerified && (
                <span className="text-xs text-gray-500">
                  ({docVerificationAttempts}/3 attempts)
                </span>
              )}
            </div>

            {otpVerified && !isDocVerified && docVerificationStatus !== "pending" && docVerificationStatus !== "blocked" && (
              <Button
                type="button"
                onClick={() => setDocVerificationModalOpen(true)}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Complete Document Verification
              </Button>
            )}
          </div>
             */}
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 w-fit"
              disabled={
                //ssnValidationStatus === "exists" ||
                //ssnValidationStatus === "checking" ||
                emailValidationStatus === "exists" ||
                emailValidationStatus === "checking" ||
                phoneValidationStatus === "exists" ||
                phoneValidationStatus === "checking" ||
                referralCodeStatus === "checking" ||
                referralCodeStatus === "invalid"
              }
              onClick={() => {
                console.log("Submit button clicked!");
                //console.log("Button disabled state:", !otpVerified || !isDocVerified || ssnValidationStatus === "exists" || ssnValidationStatus === "checking" || emailValidationStatus === "exists" || emailValidationStatus === "checking");
                console.log("OTP verified:", otpVerified);
                console.log("Document verified:", isDocVerified);
                console.log("Document verification status:", docVerificationStatus);
                //console.log("SSN validation status:", ssnValidationStatus);
                console.log("Email validation status:", emailValidationStatus);
              }}
            >
              {/* {(ssnValidationStatus === "checking" || emailValidationStatus === "checking" || phoneValidationStatus === "checking") 
                ? "Validating..." 
                : "Next"
              } */}
              Next
            </Button>
          </div>
        </form>
      </Form>
      {/* OTP Modal - Moved outside the form */}
      <Dialog
        open={otpModalOpen}
        onOpenChange={(open) => {
          // Only allow closing via X button (DialogClose), not outside click
          if (!open) setOtpModalOpen(false);
        }}
        modal={true}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {otpMethod === "email"
                ? "Email OTP Verification"
                : otpMethod === "phone"
                ? "Phone OTP Verification"
                : "OTP Verification"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* OTP Status */}
            {!otpSent ? (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Sending OTP to your {otpMethod === "email" ? "email" : "Mobile Phone Number"}...
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-green-600 flex items-center justify-center">
                  <span className="mr-1">✓</span>
                  OTP sent to your {otpMethod === "email" ? "email" : "Mobile Phone Number"}
                </p>
              </div>
            )}
            
            {/* OTP Input */}
            <div className="space-y-4">
              <label htmlFor="otp-input" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Enter OTP
              </label>
              <div className="flex items-center space-x-4">
                <Input
                  id="otp-input"
                  value={form.watch("otp")}
                  onChange={(e) => form.setValue("otp", e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-48"
                  disabled={!otpSent}
                />
                <Button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={isLoading || !form.watch("otp") || otpVerified || !otpSent}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
              {otpVerified && (
                <span className="text-green-600 text-sm">✓ OTP Verified</span>
              )}
              
              {/* Resend OTP option */}
              {otpSent && !otpVerified && (
                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Resend OTP
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* No DialogFooter/Close button, only X button in top right */}
        </DialogContent>
      </Dialog>

      {/* Document Verification Modal */}
      <Dialog
        open={docVerificationModalOpen}
        onOpenChange={(open) => {
          // Prevent closing if verification is in progress or if document is not verified
          if (!open && docVerificationStatus !== "PENDING" && docVerificationStatus !== "sending") {
            setDocVerificationModalOpen(false);
          }
        }}
        modal={true}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {docVerificationStatus === "PASSED" ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Document Verification Complete</span>
                </>
              ) : docVerificationStatus === "FAILED" ? (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>Document Verification Failed</span>
                </>
              ) : docVerificationStatus === "ABANDONED" ? (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>Verification Blocked</span>
                </>
              ) : (
                <span>Document Verification Required</span>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {docVerificationStatus === "idle" && (
              <>
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-600">
                    To continue with your onboarding process, please complete document verification.
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    Click on the URL below for verification via driver's license.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                    <p className="font-medium mb-1">Important:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Physical driver's license supported</li>
                      <li>Virtual licenses not yet supported</li>
                      <li>You have 3 attempts maximum</li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={handleSendDocCaptureLink}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Generate Verification Link
                  </Button>
                </div>
              </>
            )}

            {docVerificationStatus === "sending" && (
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                <p className="text-sm text-gray-600">
                  Generating verification link...
                </p>
              </div>
            )}

            {docVerificationStatus === "sent" && (
              <div className="text-center space-y-3">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                <p className="text-sm text-green-600 font-medium">
                  Verification link generated successfully!
                </p>
                <p className="text-xs text-gray-600">
                  Click on the link below to complete your driver's license verification.
                </p>
                {docCaptureLink && (
                  <div className="bg-blue-50 p-3 rounded border">
                    <a
                      href={docCaptureLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                    >
                      Click here for verification
                    </a>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  After completing the verification, click the button below to check your status.
                </p>
                <Button
                  onClick={handleCheckVerificationResults}
                  className="bg-blue-500 hover:bg-blue-600 text-white mt-2"
                >
                  Check Verification Status
                </Button>
              </div>
            )}

            {docVerificationStatus === "PENDING" && (
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                <p className="text-sm text-blue-600 font-medium">
                  Checking verification results...
                </p>
                <p className="text-xs text-gray-600">
                  Please wait while we verify your document submission.
                </p>
              </div>
            )}

            {docVerificationStatus === "PASSED" && (
              <div className="text-center space-y-3">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                <p className="text-sm text-green-600 font-medium">
                  Document verification completed successfully!
                </p>
                <p className="text-xs text-gray-600">
                  You can now proceed with your application.
                </p>
                <Button
                  onClick={() => {
                    setDocVerificationModalOpen(false);
                    // Trigger form submission to move to next step
                    form.handleSubmit(onSubmit)();
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Continue
                </Button>
              </div>
            )}





            {docVerificationStatus === "FAILED" && (
              <div className="text-center space-y-3">
                <XCircle className="h-8 w-8 text-red-500 mx-auto" />
                <p className="text-sm text-red-600 font-medium">
                  Document verification failed
                </p>
                <p className="text-xs text-gray-600">
                  Attempts used: {docVerificationAttempts} / 3
                </p>
                {docVerificationAttempts < 3 ? (
                  <Button
                    onClick={handleRetryDocVerification}
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-50"
                  >
                    Retry Verification
                  </Button>
                ) : (
                  <p className="text-xs text-red-600 font-medium">
                    Maximum attempts reached. Please try again later.
                  </p>
                )}
              </div>
            )}

            {docVerificationStatus === "ABANDONED" && (
              <div className="text-center space-y-3">
                <XCircle className="h-8 w-8 text-red-500 mx-auto" />
                <p className="text-sm text-red-600 font-medium">
                  Verification temporarily abandoned
                </p>
                <p className="text-xs text-gray-600">
                  You have exceeded the maximum number of verification attempts (3/3).
                </p>
                <p className="text-xs text-red-600">
                  Please try again later or contact support for assistance.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Verification Results Modal */}
      <Dialog open={showResultsModal} onOpenChange={setShowResultsModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {isCheckingResults ? (
                <>
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                  <span>Checking Verification Status</span>
                </>
              ) : verificationResult === 'PASSED' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Verification Successful</span>
                </>
              ) : verificationResult === 'SUSPENDED' ? (
                <>
                  <XCircle className="h-5 w-5 text-orange-500" />
                  <span>Verification Suspended</span>
                </>
              ) : (verificationResult === 'ABANDONED' || verificationResult === 'FAILED') ? (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>Verification {verificationResult}</span>
                </>
              ) : null}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {isCheckingResults && (
              <div className="text-center space-y-3">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto" />
                <p className="text-sm text-blue-600 font-medium">
                  Checking verification results...
                </p>
                <p className="text-xs text-gray-600">
                  Please wait while we verify your document submission.
                </p>
              </div>
            )}

            {!isCheckingResults && verificationResult === 'PASSED' && (
              <div className="text-center space-y-3">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                <p className="text-sm text-green-600 font-medium">
                  Document verification completed successfully!
                </p>
                <p className="text-xs text-gray-600">
                  You can now proceed with your application.
                </p>
                <Button
                  onClick={() => {
                    setShowResultsModal(false);
                    // Trigger form submission to move to next step
                    form.handleSubmit(onSubmit)();
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Continue
                </Button>
              </div>
            )}

            {!isCheckingResults && verificationResult === 'SUSPENDED' && (
              <div className="text-center space-y-3">
                <XCircle className="h-8 w-8 text-orange-500 mx-auto" />
                <p className="text-sm text-orange-600 font-medium">
                  Verification Suspended
                </p>
                <p className="text-xs text-gray-600">
                  Attempts used: {docVerificationAttempts} / 3
                </p>
                {docVerificationAttempts < 3 ? (
                  <>
                    <p className="text-xs text-gray-600">
                      You can retry the verification process.
                    </p>
                    <Button
                      onClick={() => {
                        setShowResultsModal(false);
                        setDocVerificationModalOpen(true);
                        setDocVerificationStatus("idle");
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Retry Verification
                    </Button>
                  </>
                ) : (
                  <p className="text-xs text-red-600 font-medium">
                    Unfortunately, we are unable to approve your merchant application as there appears to be an issue with verifying your identity. Please contact your account manager.
                  </p>
                )}
              </div>
            )}

            {!isCheckingResults && (verificationResult === 'ABANDONED' || verificationResult === 'FAILED') && (
              <div className="text-center space-y-3">
                <XCircle className="h-8 w-8 text-red-500 mx-auto" />
                <p className="text-sm text-red-600 font-medium">
                  Authentication Result: {verificationResult}
                </p>
                <p className="text-xs text-gray-600">
                  Attempts used: {docVerificationAttempts} / 3
                </p>
                {docVerificationAttempts < 3 ? (
                  <>
                    <p className="text-xs text-gray-600">
                      You can retry the verification process.
                    </p>
                    <Button
                      onClick={() => {
                        setShowResultsModal(false);
                        setDocVerificationModalOpen(true);
                        setDocVerificationStatus("idle");
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Retry Verification
                    </Button>
                  </>
                ) : (
                  <p className="text-xs text-red-600 font-medium">
                    Unfortunately, we are unable to approve your merchant application as there appears to be an issue with verifying your identity.
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Max Attempts Error Modal */}
      <Dialog open={maxAttemptsErrorModal} onOpenChange={setMaxAttemptsErrorModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>Maximum Attempts Reached</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center space-y-3">
              <XCircle className="h-12 w-12 text-red-500 mx-auto" />
              <p className="text-sm text-red-600 font-medium">
                {maxAttemptsErrorMessage}
              </p>
              <p className="text-xs text-gray-600">
                Please wait for the specified time before trying again.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setMaxAttemptsErrorModal(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonalDetailsStep;
