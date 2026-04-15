// ─────────────────────────────────────────────────────────────────────────────
// SignUpStep.tsx
// ─────────────────────────────────────────────────────────────────────────────
// NOTE: This is the traditional manual signup flow.
//
// For Verified 1-Click Signup (embedded SDK flow), use:
//   - /rewards/signup/verified -> VerifiedSignupPage.tsx
//
// This component remains intact for:
//   - Fallback manual signup users who can't use Verified
//   - Testing/alternative signup flow
//   - Users who prefer manual data entry
//
// The Verified flow provides instant signup by securely sharing credentials
// from trusted sources, reducing friction and improving conversion rates.
// ─────────────────────────────────────────────────────────────────────────────

import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast";
import { preScreenVerification, sendPhoneOtp, verifyPhoneOtp, validateEmail, validateSSN, validatePhone, validateReferralCode, saveConsumerOnboardingStep, prescreenVerifiedConsumer, type PrescreenVerifiedResponse } from "@/lib/api";
import { toast as sonnerToast } from "sonner";
import { useNavigate } from "react-router-dom";
import { US_STATES_WITH_CODES } from "@/data/us-states";
import { useConsumerData } from "@/context/ConsumerDataContext";
import MarketAreaRestrictedModal, { isMarketAreaRestricted, type MarketAreaError } from "@/components/consumer-application/MarketAreaRestrictedModal";

/* -------------------------------------------------------------------------- */
/*  Schema & types                                                            */
/* -------------------------------------------------------------------------- */

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  // Accept either 4 digits (manual flow) or 9 digits (Verified flow)
  ssn: z.string().refine(
    (val) => val.length === 4 || val.length === 9,
    "SSN must be either 4 or 9 digits"
  ),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 21;
      }
      return age >= 21;
    }, "You must be 21 or over to sign up"),
  // address: z.string().min(1, "Address is required"),
  // city: z.string().min(1, "City is required"),
  // state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => {
      const phoneNumber = value.replace(/\D/g, "");
      return phoneNumber.length === 10;
    }, "Phone number must be exactly 10 digits"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
  referralCode: z.string().optional(),
});
type SignUpFormData = z.infer<typeof formSchema> & { id?: string };

interface SignUpStepProps {
  onNext: (d: SignUpFormData) => void;
  onPrev: () => void;
  initialValues?: Partial<SignUpFormData>;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const cleanPhoneInput = (phone: string | undefined): string => {
  if (!phone) return "";
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
};

const SignUpStep = ({ onNext, initialValues }: SignUpStepProps) => {
  const { sessionId, isFromVerified } = useConsumerData();
  //checks if any field was pre-filled from initialValues (Verified flow or session resume)
  const isFieldPrefilled = (fieldName: keyof SignUpFormData) => !!initialValues?.[fieldName];
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyingPreScreen, setIsVerifyingPreScreen] = useState(false);
  const [preScreenStatus, setPreScreenStatus] = useState<string | null>(null);
  const [smsConsent, setSmsConsent] = useState(false);
  const [isUSLocation, setIsUSLocation] = useState<boolean | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [marketAreaError, setMarketAreaError] = useState<MarketAreaError | null>(null);
  const navigate = useNavigate();

  // Email, SSN, and Phone validation states
  const [emailValidationStatus, setEmailValidationStatus] = useState<'idle' | 'checking' | 'available' | 'exists'>('idle');
  const [emailError, setEmailError] = useState<string>('');
  const [ssnValidationStatus, setSsnValidationStatus] = useState<'idle' | 'checking' | 'available' | 'exists'>('idle');
  const [ssnError, setSsnError] = useState<string>('');
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<'idle' | 'checking' | 'available' | 'exists'>('idle');
  const [phoneError, setPhoneError] = useState<string>('');
  const [referralCodeStatus, setReferralCodeStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [referralReferrerName, setReferralReferrerName] = useState<string>('');

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      ssn: "",
      dateOfBirth: "",
      //address: "",
      //city: "",
      //state: "",
      zipCode: "",
      phoneNumber: "",
      email: "",
      password: "",
      referralCode: "",
      ...(initialValues || {}),
      ...(initialValues?.phoneNumber ? { phoneNumber: cleanPhoneInput(initialValues.phoneNumber) } : {}),
    },
  });

  // Reset form when initialValues change (e.g., from Verified flow)
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      console.log('[SignUpStep] Resetting form with initial values:', initialValues);
      form.reset({
        firstName: initialValues.firstName || "",
        lastName: initialValues.lastName || "",
        ssn: initialValues.ssn || "",
        dateOfBirth: initialValues.dateOfBirth || "",
        zipCode: initialValues.zipCode || "",
        phoneNumber: cleanPhoneInput(initialValues.phoneNumber),
        email: initialValues.email || "",
        password: initialValues.password || "",
        referralCode: initialValues.referralCode || "",
      });
    }
  }, [initialValues]);

  const { toast } = useToast();

  // Location checking functions
  const getIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Failed to get IP address:", error);
      return null;
    }
  };

  const checkUSLocation = async (ipAddress: string) => {
    try {
      const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      const data = await response.json();

      return {
        isUS: data.country_code === "US",
        country: data.country_name,
        region: data.region,
        city: data.city,
      };
    } catch (error) {
      console.error("Failed to check location:", error);
      return { isUS: false, error: "Location check failed" };
    }
  };

  const captureUserData = async () => {
    try {
      // Get IP address
      const ip = await getIPAddress();

      if (ip) {
        //----TODO: uncomment when location restriction required
        //const location = await checkUSLocation(ip);
        //setIsUSLocation(location.isUS);

        // if (!location.isUS) {
        //   setLocationError(
        //     "You must be present in the U.S. to sign-up for a JVC Account"
        //   );
        // }

        setIsUSLocation(true);

      } else {
        // If IP check fails, assume not US for security
        // setIsUSLocation(false);
        // setLocationError(
        //   "You must be present in the U.S. to sign-up for a JVC Account"
        // );
      }
    } catch (error) {
      // console.error("Location check failed:", error);
      // setIsUSLocation(false);
      // setLocationError(
      //   "You must be present in the U.S. to sign-up for a JVC Account"
      // );
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Check location on component mount
  useEffect(() => {
    captureUserData();
  }, []);

  // Debounced email validation
  useEffect(() => {
    const email = form.watch('email');
    const timer = setTimeout(async () => {
      if (!email || !email.includes('@') || isFromVerified || isFieldPrefilled('email')) {
        setEmailValidationStatus('idle');
        setEmailError('');
        return;
      }

      setEmailValidationStatus('checking');
      setEmailError('');
      try {
        const res = await validateEmail(email);
        const exists = res?.data?.exists || false;
        if (exists) {
          setEmailValidationStatus('exists');
          setEmailError(res?.data?.message || 'Email already registered');
        } else {
          setEmailValidationStatus('available');
          setEmailError('');
        }
      } catch (err) {
        setEmailValidationStatus('idle');
        setEmailError('Error validating email');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [form.watch('email')]);

  // Debounced SSN validation
  useEffect(() => {
    const ssn = form.watch('ssn');
    const timer = setTimeout(async () => {
      // Skip validation for Verified flow (SSN already validated), prefilled, or if SSN is not valid length
      if (!ssn || (ssn.length !== 4 && ssn.length !== 9) || isFromVerified || isFieldPrefilled('ssn')) {
        setSsnValidationStatus('idle');
        setSsnError('');
        return;
      }

      setSsnValidationStatus('checking');
      setSsnError('');
      try {
        //TODO: Replace validatSSN with new endpoint for last-4 digits validation of ssn
        const res = await validateSSN(ssn);
        const exists = res?.data?.exists || false;
        if (exists) {
          setSsnValidationStatus('exists');
          setSsnError(res?.data?.message || 'SSN already registered');
        } else {
          setSsnValidationStatus('available');
          setSsnError('');
        }
      } catch (err) {
        setSsnValidationStatus('idle');
        setSsnError('Error validating SSN');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [form.watch('ssn'), isFromVerified]);

  // Debounced Phone validation
  useEffect(() => {
    const phone = form.watch('phoneNumber');
    const timer = setTimeout(async () => {
      // Skip validation for Verified flow (phone already verified) or prefilled
      const cleanedPhone = phone?.replace(/\D/g, '');
      if (!cleanedPhone || cleanedPhone.length !== 10 || isFromVerified || isFieldPrefilled('phoneNumber')) {
        setPhoneValidationStatus('idle');
        setPhoneError('');
        return;
      }

      setPhoneValidationStatus('checking');
      setPhoneError('');
      try {
        const res = await validatePhone(phone);
        const exists = res?.data?.exists || false;
        if (exists) {
          setPhoneValidationStatus('exists');
          setPhoneError(res?.data?.message || 'Phone number already registered');
        } else {
          setPhoneValidationStatus('available');
          setPhoneError('');
        }
      } catch (err) {
        setPhoneValidationStatus('idle');
        setPhoneError('Error validating phone number');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [form.watch('phoneNumber'), isFromVerified]);

  // Debounced referral code validation
  useEffect(() => {
    const code = form.watch('referralCode');
    const timer = setTimeout(async () => {
      if (!code || code.trim() === '') {
        setReferralCodeStatus('idle');
        setReferralReferrerName('');
        return;
      }

      setReferralCodeStatus('checking');
      setReferralReferrerName('');
      try {
        const res = await validateReferralCode(code.trim());
        if (res?.data?.valid) {
          setReferralCodeStatus('valid');
          setReferralReferrerName(res.data.referrerFirstName || '');
        } else {
          setReferralCodeStatus('invalid');
          setReferralReferrerName('');
        }
      } catch (err) {
        setReferralCodeStatus('invalid');
        setReferralReferrerName('');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [form.watch('referralCode')]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");

    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length >= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 3) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else if (phoneNumber.length > 0) {
      return `(${phoneNumber}`;
    }
    return "";
  };

  const formatDobMMDDYYYY = (dob: string | Date) => {
    const date = new Date(dob);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}${day}${year}`;
  };

  const generateSessionId = () => {
  return `consumer_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  };


  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    form.setValue("phoneNumber", formattedValue, { shouldValidate: true });
  };

  const handleVerifyClick = async () => {
    // Validate the form first
    const isValid = await form.trigger();
    if (!isValid) return;

    // For Verified flow: Skip OTP, go straight to prescreen
    if (isFromVerified) {
      const data = form.getValues();
      setIsVerifyingPreScreen(true);
      await verifyPreScreenVerified(data);
      return;
    }
    else{
      const data = form.getValues();
      setIsVerifyingPreScreen(true);
      await verifyPreScreenVerified(data);
      return;

    }

    // // For manual flow: Use OTP verification
    // const phone = form.getValues("phoneNumber");

    // if (!phone) {
    //   sonnerToast.error("Please fill in your phone number");
    //   return;
    // }

    // // Clear any previous OTP code when opening modal
    // setOtpCode("");
    // setOtpSent(false);
    // setShowOtpModal(true);

    // //----send otp call
    // setIsLoading(true);
    // try {
    //   const response = await sendPhoneOtp(phone);
    //   console.log("Phone OTP response:", response);
    //   setOtpSent(true);
    //   sonnerToast.success(`OTP sent to your phone: ${phone}`);
    // } catch (error) {
    //   sonnerToast.error("Failed to send OTP");
    //   setShowOtpModal(false);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // Pre-screen for Verified 1-Click flow (uses new endpoint)
  const verifyPreScreenVerified = async (data: SignUpFormData) => {
    try {
      console.log("[SignUp] Starting Verified prescreen for:", data.email);

      const payload = {
        phone: data.phoneNumber.replace(/\D/g, ''), // Strip formatting: (212) 555-0010 -> 2125550010
        password: data.password,
        email: data.email,
        refCode: data.referralCode || undefined,
        sessionId: sessionId || undefined,
        prequalifyAllow: true,
        preapprovalAllow: false,
      };

      console.log("[SignUp] Verified prescreen payload:", payload);
      const response = await prescreenVerifiedConsumer(payload);
      console.log("[SignUp] Verified prescreen response:", response);

      setIsVerifyingPreScreen(false);

      if (!response.success || !response.data) {
        sonnerToast.error(response.message || "Pre-screening failed");
        return;
      }

      const { status, creditLimit, downloadApp, message } = response.data;

      // Handle different prescreen statuses
      if (status === 'APPROVED' && response.data.preapprovalAllow) {
        // User is pre-approved with credit limit
        sonnerToast.success(`Congratulations! You are pre-approved with a credit limit of $${creditLimit?.toLocaleString()}`);
        setPreScreenStatus('VERIFIED');

        // Save signup step and continue
        await saveSignupStepAndContinue(data, response);
      } else if (status === 'PREQUALIFY' && response.data.prequalifyAllow) {
        // User can qualify via mobile app
        sonnerToast.info(message || "Please download the app to complete qualification");
        setPreScreenStatus('PREQUALIFY');
        navigate('/consumer-download-app');
      } else if (status === 'FAILED' || downloadApp) {
        // PID06/PID20 failed - redirect to download app
        sonnerToast.warning(message || "Please download the app to continue");
        setPreScreenStatus('FAILED');
        navigate('/consumer-download-app');
      } else {
        // Generic decline
        sonnerToast.error(message || "Pre-qualification was not successful");
        setPreScreenStatus('FAILED');
        navigate('/consumer-download-app');
      }
    } catch (error: any) {
      console.error("[SignUp] Verified prescreen error:", error);

      // Check for market area restriction (out-of-state user)
      const areaError = isMarketAreaRestricted(error);
      if (areaError) {
        setMarketAreaError(areaError);
        setIsVerifyingPreScreen(false);
        return;
      }

      sonnerToast.error(error.message || "Pre-screening failed. Please try again.");
      setIsVerifyingPreScreen(false);
    }
  };

  // Helper to save signup step and continue to next step
  const saveSignupStepAndContinue = async (data: SignUpFormData, prescreenResponse: PrescreenVerifiedResponse) => {
    try {
      const userId = prescreenResponse?.data?.userId;
      console.log("[SignUp] Saving signup step with userId:", userId);

      const signupData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        ssn: data.ssn,
        zipCode: data.zipCode,
        password: data.password,
        referralCode: data.referralCode || "",
        creditLimit: prescreenResponse?.data?.creditLimit,
      };

      await saveConsumerOnboardingStep('signup', sessionId, signupData, userId);
      console.log("[SignUp] Signup step saved successfully");

      // Continue to next step with real userId (convert to string for consistency)
      onNext({ ...data, id: userId?.toString() });
    } catch (saveError) {
      console.error("[SignUp] Failed to save signup step:", saveError);
      sonnerToast.warning("Signup data saved locally, but sync to server failed");
      // Still continue to next step with userId (convert to string for consistency)
      const userId = prescreenResponse?.data?.userId;
      onNext({ ...data, id: userId?.toString() });
    }
  };

  const handleResendOtp = async () => {
    const phone = form.getValues("phoneNumber");
    setIsLoading(true);
    try {
      const response = await sendPhoneOtp(phone);
      console.log("Phone OTP response:", response);
      setOtpSent(true);
      sonnerToast.success(`OTP resent to your phone: ${phone}`);
    } catch (error) {
      sonnerToast.error("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };
//-----
  const handleOtpSubmit = async () => {
    if (otpCode.length !== 6) {
      sonnerToast.error("Please enter a 6-digit OTP code");
      return;
    }

    const phone = form.getValues("phoneNumber");
    setIsLoading(true);

    try {
      const response = await verifyPhoneOtp(phone, otpCode);
      console.log("Phone OTP verification response:", response);

      setIsOtpVerified(true);
      sonnerToast.success("OTP verified successfully!");
      setShowOtpModal(false);

      setIsVerifyingPreScreen(true);
      form.handleSubmit(verifyPreScreen)();

    } catch (error) {
      console.error("Error verifying OTP:", error);
      sonnerToast.error("Failed to verify OTP");
      navigate("/consumer-onboarding-complete");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPreScreen = async (data: SignUpFormData) => {
    try {
      // TODO: Uncomment dynamic payload & Update prescreen api call after client confirmations regarding ssn, address, city, state fields
      //----dummy test payload
      const payload = {
        "firstName": "CARL",
        "lastName": "TALKOWSKI",
        "ssn": "666410430",
        "email": "maryam@creativecreation.io",
        "password": "Testing1234",
        "phoneNumber": "9495551234",
        "dob": "02011951",
        "zipCode": "10308",
        //"referralCode": "REF123",
        //"title": "Ms",
        "address": {
          "addressLine1": "280 SANDALWOOD",
          "addressLine2": "",
          "city": "STATEN ISLAND",
          "state": "NY",
          "postalCode": "10308",
          "country": "USA",
          "addressType": "HOME"
        }
      }

      
      //--- dynamic payload from consumer data
      // const payload = {
      //   "firstName": data.firstName,
      //   "lastName": data.lastName,
      //   "ssn": data.ssn,
      //   "email": data.email,
      //   "password": data.password,
      //   "phoneNumber": data.phoneNumber.replace(/\D/g, ''),
      //   "dob": formatDobMMDDYYYY(data.dateOfBirth),
      //   "zipCode": data.zipCode,
      //   "referralCode": data.referralCode || '',
      //   "address": {
      //     "addressLine1": data.address,
      //     "addressLine2": "",
      //     "city": data.city,
      //     "state": data.state,
      //     "postalCode": data.zipCode,
      //     "country": "USA",
      //     "addressType": "HOME"
      //   }
      // }

      console.log("PreScreen verification payload:", payload);
      const response = await preScreenVerification(payload);
      console.log("PreScreen verification response:", response);

      //const prescreenStatus = response.data.preScreenStatus;
      const prescreenStatus:string = "VERIFIED";
      console.log("PreScreen status: ", prescreenStatus);

      setPreScreenStatus(prescreenStatus);
      setIsVerifyingPreScreen(false);

      if (prescreenStatus !== "VERIFIED") {
        sonnerToast.error("PreScreen verification failed.");
        // Reset OTP verification to allow retry
        setIsOtpVerified(false);
        setOtpCode("");
        setOtpSent(false);
        // Submit form data and navigate to download app page
        await onSubmitWithStatus(data, prescreenStatus, response);
      } else {
        sonnerToast.success("PreScreen verification successful!");

        //save signup step to server
        try {
          const userId = response?.data?.userId; 
          console.log("[SignUp] Saving signup step with userId:", userId);

          const signupData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            dateOfBirth: data.dateOfBirth,
            ssn: data.ssn,
            zipCode: data.zipCode,
            password: data.password,
            referralCode: data.referralCode || "",
          };

          await saveConsumerOnboardingStep('signup', sessionId, signupData, userId);
          console.log("[SignUp] Signup step saved successfully");
        } catch (saveError) {
          console.error("[SignUp] Failed to save signup step:", saveError);
          sonnerToast.warning("Signup data saved locally, but sync to server failed");
        }

        // Submit form data and continue to next step
        await onSubmitWithStatus(data, prescreenStatus, response);
      }
    } catch (error) {
      console.error("Error making verify prescreen call:", error);
      sonnerToast.error("PreScreen verification failed. Please try again.");
      setIsVerifyingPreScreen(false);
      // Reset OTP verification to allow retry
      setIsOtpVerified(false);
      setOtpCode("");
      setOtpSent(false);
    }
  };

  /* ------------------------------- submit --------------------------------- */
  const onSubmitWithStatus = async (data: SignUpFormData, status: string, prescreenResponse?: any) => {
    try {

      console.log("Form data submitted:", data);
      console.log("Prescreen status:", status);
      console.log("Prescreen response:", prescreenResponse);

      if (status !== "VERIFIED") {
        navigate('/consumer-download-app');
        return;
      }

      // Continue to next step if prescreen was successful with real userId (convert to string for consistency)
      const userId = prescreenResponse?.data?.userId;
      onNext({ ...data, id: userId?.toString() });
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission failed",
        description: "Please check your inputs or try again.",
      });
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    // This is called by the form's regular submit (not used after prescreen)
    await onSubmitWithStatus(data, preScreenStatus || "");
  };

  /* ------------------------------- UI ------------------------------------- */
  //TODO: Uncomment location based restrictions after development complete
  // Show loading state while checking location
  // if (isLoadingLocation) {
  //   return (
  //     <div className="bg-white rounded-lg p-6 lg:p-8 w-full mx-auto">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
  //         <p className="mt-4 text-gray-600">Checking your location...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // // Show error message for non-US users
  // if (!isUSLocation) {
  //   return (
  //     <div className="bg-white rounded-lg p-6 lg:p-8 w-full mx-auto">
  //       <div className="text-center">
  //         <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
  //           <svg
  //             className="h-6 w-6 text-red-600"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
  //             />
  //           </svg>
  //         </div>
  //         <h3 className="mt-4 text-lg font-medium text-gray-900">
  //           Access Restricted
  //         </h3>
  //         <p className="mt-2 text-sm text-gray-500">{locationError}</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Show form for US users
  return (
    <div className="bg-white rounded-lg p-6 lg:p-8 w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <div>
            <h3 className="text-xl font-semibold text-ateneoBlue mb-4">
              Account Sign-Up
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name {isFromVerified && <span className="text-xs text-gray-500">(Verified)</span>}</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isFromVerified || isFieldPrefilled('firstName')} className={isFromVerified || isFieldPrefilled('firstName') ? "bg-gray-100" : ""} />
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
                    <FormLabel>Last Name {isFromVerified && <span className="text-xs text-gray-500">(Verified)</span>}</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isFromVerified || isFieldPrefilled('lastName')} className={isFromVerified || isFieldPrefilled('lastName') ? "bg-gray-100" : ""} />
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
              name="ssn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isFromVerified ? 'SSN' : 'Last 4 digit of SSN'} {isFromVerified && <span className="text-xs text-gray-500">(Verified)</span>}</FormLabel>
                  <FormControl>
                    {isFromVerified ? (
                      // Display masked SSN for verified users (•••••1234 format)
                      <Input
                        value={field.value ? `•••••${field.value.slice(-4)}` : ''}
                        disabled={true}
                        className="bg-gray-100 font-mono tracking-wider"
                        readOnly
                      />
                    ) : (
                      <Input
                        {...field}
                        maxLength={4}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        disabled={isFieldPrefilled('ssn')}
                        className={isFieldPrefilled('ssn') ? "bg-gray-100" : ""}
                      />
                    )}
                  </FormControl>
                  <div className="mt-1">
                    {!isFromVerified && ssnValidationStatus === 'checking' && (
                      <p className="text-sm text-yellow-600">Checking SSN...</p>
                    )}
                    {!isFromVerified && ssnValidationStatus === 'available' && (
                      <p className="text-sm text-green-600">SSN is available</p>
                    )}
                    {!isFromVerified && ssnValidationStatus === 'exists' && (
                      <p className="text-sm text-red-600">{ssnError}</p>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth (must be over 21 years of age) {isFromVerified && <span className="text-xs text-gray-500">(Verified)</span>}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={isFromVerified || isFieldPrefilled('dateOfBirth')} className={isFromVerified || isFieldPrefilled('dateOfBirth') ? "bg-gray-100" : ""} />
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
                    <FormLabel>Zip Code {isFromVerified && <span className="text-xs text-gray-500">(Verified)</span>}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="12345" disabled={isFromVerified || isFieldPrefilled('zipCode')} className={isFromVerified || isFieldPrefilled('zipCode') ? "bg-gray-100" : ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number {isFromVerified && <span className="text-xs text-gray-500">(Verified)</span>}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={isFromVerified || isFieldPrefilled('phoneNumber') ? undefined : handlePhoneNumberChange}
                      maxLength={14}
                      inputMode="numeric"
                      disabled={isFromVerified || isFieldPrefilled('phoneNumber')}
                      className={isFromVerified || isFieldPrefilled('phoneNumber') ? "bg-gray-100" : ""}
                    />
                  </FormControl>
                  <div className="mt-1">
                    {!isFromVerified && phoneValidationStatus === 'checking' && (
                      <p className="text-sm text-yellow-600">Checking phone number...</p>
                    )}
                    {!isFromVerified && phoneValidationStatus === 'available' && (
                      <p className="text-sm text-green-600">Phone number is available</p>
                    )}
                    {!isFromVerified && phoneValidationStatus === 'exists' && (
                      <p className="text-sm text-red-600">{phoneError}</p>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={isFieldPrefilled('email')} className={isFieldPrefilled('email') ? "bg-gray-100" : ""} />
                  </FormControl>
                  <div className="mt-1">
                    {emailValidationStatus === 'checking' && (
                      <p className="text-sm text-yellow-600">Checking email...</p>
                    )}
                    {emailValidationStatus === 'available' && (
                      <p className="text-sm text-green-600">Email is available</p>
                    )}
                    {emailValidationStatus === 'exists' && (
                      <p className="text-sm text-red-600">{emailError}</p>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Street address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {US_STATES_WITH_CODES.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <Input {...field} placeholder="12345" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} disabled={isFieldPrefilled('password')} className={isFieldPrefilled('password') ? "bg-gray-100" : ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referralCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referral Code (optional)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isFieldPrefilled('referralCode')} className={isFieldPrefilled('referralCode') ? "bg-gray-100" : ""} />
                </FormControl>
                <div className="mt-1">
                  {referralCodeStatus === 'checking' && (
                    <p className="text-sm text-yellow-600">Checking referral code...</p>
                  )}
                  {referralCodeStatus === 'valid' && (
                    <p className="text-sm text-green-600">
                      Referred by {referralReferrerName || 'a friend'}
                    </p>
                  )}
                  {referralCodeStatus === 'invalid' && (
                    <p className="text-sm text-red-600">Invalid referral code</p>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <div className="space-y-4 pt-4">
            {/* SMS consent only required for manual flow (not Verified) */}
            {!isFromVerified && (
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="sms-consent"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  onChange={(e) => setSmsConsent(e.target.checked)}
                />
                <label htmlFor="sms-consent" className="text-sm text-gray-700">
                  By selecting "Verify", you authorize us to send a verification
                  code to your cell phone. Text messaging rates may apply in
                  accordance with the terms of your mobile carrier.
                </label>
              </div>
            )}

            <div className="flex">
              <Button
                type="button"
                onClick={handleVerifyClick}
                disabled={
                  // For Verified flow: only check if verifying or email validation
                  // For manual flow: also require SMS consent and phone/SSN validation
                  verifyingPreScreen ||
                  emailValidationStatus === 'checking' ||
                  emailValidationStatus === 'exists' ||
                  referralCodeStatus === 'checking' ||
                  referralCodeStatus === 'invalid' ||
                  (!isFromVerified && (
                    !smsConsent ||
                    ssnValidationStatus === 'checking' ||
                    ssnValidationStatus === 'exists' ||
                    phoneValidationStatus === 'checking' ||
                    phoneValidationStatus === 'exists'
                  ))
                }
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {(verifyingPreScreen ||
                  emailValidationStatus === 'checking' ||
                  referralCodeStatus === 'checking' ||
                  (!isFromVerified && (ssnValidationStatus === 'checking' || phoneValidationStatus === 'checking')))
                  ? (
                    <>
                      <span className="mr-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                      </span>
                      {verifyingPreScreen ? "Verifying" : "Validating..."}
                    </>
                  )
                  : (isFromVerified ? "Continue" : "Verify")}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      {/* OTP Verification Modal */}
      <Dialog
        open={showOtpModal}
        onOpenChange={(open) => {
          if (!open) {
            setShowOtpModal(false);
            setOtpCode("");
          }
        }}
        modal={true}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Phone OTP Verification</DialogTitle>
            <DialogDescription>
              We've sent a 6-digit verification code to{" "}
              {form.getValues("phoneNumber")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* OTP Status */}
            {!otpSent ? (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Sending OTP to your phone...
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-green-600 flex items-center justify-center">
                  <span className="mr-1">✓</span>
                  OTP sent to your phone
                </p>
              </div>
            )}

            {/* OTP Input */}
            <div className="space-y-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Verification Code
              </label>
              <div className="flex items-center space-x-4">
                <Input
                  id="otp"
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg tracking-widest w-48"
                  inputMode="numeric"
                  placeholder="Enter 6-digit OTP"
                  disabled={!otpSent}
                />
                <Button
                  type="button"
                  onClick={handleOtpSubmit}
                  disabled={isLoading || otpCode.length !== 6 || isOtpVerified || !otpSent }
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
              {isOtpVerified && (
                <span className="text-green-600 text-sm">✓ OTP Verified</span>
              )}

              {/* Resend OTP option */}
              {otpSent && !isOtpVerified && (
                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Resend OTP
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Market Area Restriction Modal */}
      <MarketAreaRestrictedModal
        open={!!marketAreaError}
        onClose={() => setMarketAreaError(null)}
        error={marketAreaError}
      />
    </div>
  );
};

export default SignUpStep;
export type { SignUpStepProps, SignUpFormData };
