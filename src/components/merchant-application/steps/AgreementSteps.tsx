// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Card } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Switch } from "@/components/ui/switch";
// import { toast } from "@/components/ui/use-toast";
// import type { MerchantSignupData } from "../types";
// import SignaturePad from "react-signature-canvas";
// import { useRef, useEffect } from "react";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import { saveAs } from "file-saver";
// import { useMerchantData } from "@/context/MerchantDataContext";
// import { saveMerchantData } from '@/lib/merchantPersistence';
// import { saveOnboardingStep, submitOnboardingSession, uploadSessionFiles } from '@/lib/api';
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { toast as sonnerToast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import ConsentElectronicRecordsPreview from "@/pages/docs/ConsentElectronicRecordsPreview";
// import OnlinePrivacyPolicyConsumerPreview from "@/pages/docs/OnlinePrivacyPolicyConsumerPreview";

// // Map the form state to the API payload expected by the backend
// function buildPayload(data: MerchantSignupData, agreement: AgreementFormData) {

//   const owners = [] as any[];

//   if (data.personalDetails) {
//     owners.push({
//       firstName: data.personalDetails.firstName,
//       lastName: data.personalDetails.lastName,
//       ssn: data.personalDetails.socialSecurityNumber,
//       dob: data.personalDetails.socialSecurityNumber, // This should be dateOfBirth but it's not in the schema
//       email: data.personalDetails.email,

//       title: data.personalDetails.title,
//       telephone: data.personalDetails.phone,

//       isPrimaryOwner: true,
//     });
//   }


//   const beneficiaries = data.ownership?.owners || [];

//   beneficiaries.forEach((o) => {
//     owners.push({
//       firstName: o.firstName,
//       lastName: o.lastName,
//       ssn: o.ssn,
//       dob: o.dateOfBirth,
//       email: o.email,
//       ownershipPercentage: Number(o.ownershipPercentage),
//       title: o.title,
//       telephone: o.telephoneNumber,
//       homeAddress1: o.homeAddress,
//       homeAddress2: o.address2,
//       city: o.city,
//       state: o.state,
//       zipCode: o.zipCode,
//       role:
//         Number(o.ownershipPercentage) >= 75
//           ? "business_owner"
//           : "beneficial_owner",
//       isPrimaryOwner: false,
//     });
//   });

//   const totalOwnershipPercentage = owners.reduce(
//     (sum, o) => sum + Number(o.ownershipPercentage || 0),
//     0
//   );

//   return {
//     personalDetails: {
//       title: data.personalDetails?.title,
//       firstName: data.personalDetails?.firstName,
//       lastName: data.personalDetails?.lastName,
//       ssn: data.personalDetails?.socialSecurityNumber,
//       email: data.personalDetails?.email,
//       phone: data.personalDetails?.phone,
//       username: data.personalDetails?.email, // Using email as username since username field doesn't exist
//       password: data.personalDetails?.password,
//       otpOption: data.personalDetails?.otpOption,
//       referralCode: data.personalDetails?.referralCode,
//       driverLicenseFrontUrl: "", // These fields don't exist in the current schema
//       driverLicenseBackUrl: "",
//     },
//     businessInformation: {
//       email: data.personalDetails?.email, // Business email not in businessDetails schema, using personal email
//       legalBusinessName: data.businessInformation?.legalNameOfBusiness,
//       dba: data.businessInformation?.dbaIfApplicable,
//       einOrSsn: data.businessInformation?.einSsnSelection,
//       einOrSsnNumber: data.businessInformation?.einSsnNumber,
//       dateBusinessStarted: data.businessInformation?.dateBusinessStarted,
//       businessWebsite: data.businessInformation?.businessWebsite,
//       legalEntity: data.businessInformation?.legalEntity,
//       stateOrganized: data.businessInformation?.stateWhereRegistered,
//       wasPreviouslyRegistered: data.businessInformation?.hasExistedAsOtherEntity === "yes",
//       owns25PercentOrMore: true, // Default value since this field doesn't exist in current schema
//       addressLine1: "", // These address fields don't exist in BusinessDetailsStep schema
//       addressLine2: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       businessType: [], // BusinessType field doesn't exist in current schema
//       licenseNumber: "", // License fields don't exist in current schema
//       licenseFileUrl: "",
//     },
//     ownership: {
//       totalOwnershipPercentage,
//       //owners,
//       beneficiaries: owners,
//     },
//     bankInformation: {
//       accountHolderName: data.bankInformation?.nameOnAccount,
//       financialInstitution: data.bankInformation?.financialInstitution,
//       routingNumber: data.bankInformation?.routingNumber,
//       accountNumber: data.bankInformation?.accountNumber,
//       accountType: data.bankInformation?.accountType,
//     },
//     agreement: {
//       consentUseElectronicRecords: true,
//       // agreeTermsAndConditions: agreement.termsAccepted,
//       receivedPrivacyNotice: true,
//       agreeCreditCardAccountAgreement: true,
//       consentToCallOrText: true,
//       // agreedToAllRules: agreement.termsAccepted,
//       fullName: agreement.fullName,
//       signature: agreement.signature,
//     },
//   };
// }

// const agreementSchema = z.object({
// // termsOfService: z.boolean().refine((val) => val === true, {
// //     message: "You must accept the Terms of Service",
// //   }),

//   ConsentElectronicRecordsPreview: z.boolean().refine((val) => val === true, {
//     message: "You must accept Schedule D",
//   }),
 
// MerchantAgreementPreview: z.boolean().refine((val) => val === true, {
//     message: "You must accept the JVC Merchant Agreement",
//   }),

//   merchantOperatingGuide: z.boolean().refine((val) => val === true, {
//     message: "You must accept the Merchant Operating Guide",
//   }),
//    OnlinePrivacyPolicyConsumerPreview: z.boolean().refine((val) => val === true, {
//     message: "You must accept the JVC Online Privacy Policy",
//   }),
//   fullName: z.string().min(1, "Full name is required"),
//   signature: z.string().min(1, "E-Signature is required"),
//   // termsAccepted: z.boolean().refine((val) => val === true, {
//   //   message: "You must agree to all terms and declarations",
//   // }),
// });

// export type AgreementFormData = z.infer<typeof agreementSchema>;

// interface AgreementStepsProps {
//   merchantData: MerchantSignupData;
//   onNext: () => void;
//   onPrev: () => void;
//   initialValues?: Partial<AgreementFormData>;
// }

// const AgreementSteps = ({
//   onNext,
//   onPrev,
//   merchantData,
//   initialValues,
// }: AgreementStepsProps) => {
//   const form = useForm<AgreementFormData>({
//     resolver: zodResolver(agreementSchema),
//     mode: "onChange",
//     defaultValues: {
     
//       // termsOfService: false,
//       // scheduleA: false,
//       // scheduleB: false,
//       // scheduleC: false,
//       // scheduleD: false,
//       // Commented out fields - no longer needed
//       ConsentElectronicRecordsPreview: false,
//       OnlinePrivacyPolicyConsumerPreview: false,
//       merchantOperatingGuide: false,
//       MerchantAgreementPreview:false,
//       fullName: "",
//       signature: "",
//       // termsAccepted: false,
//       // ...(initialValues || {}),
//     },
//   });

//   const sigPadRef = useRef<SignaturePad>(null);
//   const { merchantData: contextMerchantData, setMerchantData, completeSession, sessionId, savePersistentData } =
//     useMerchantData();
//   const navigate = useNavigate();
//   const [showScheduleCModal, setShowScheduleCModal] = useState(false);

//   // Reset form when initialValues change (e.g., navigating back)
//   useEffect(() => {
//     if (initialValues) {
//       form.reset({ ...form.getValues(), ...initialValues });
//     }
//   }, [initialValues, form]);

//   // Auto-save agreement form values into context & persistence (debounced)
//   useEffect(() => {
//     const subscription = form.watch((values) => {
//       // Debounce using a short timeout
//       let timeout: number | undefined;
//       window.clearTimeout(timeout);
//       timeout = window.setTimeout(() => {
//         try {
//           const current = form.getValues();
//           const updated = { ...contextMerchantData, agreement: current } as MerchantSignupData;
//           // update context and persist (Agreement is step index 4, 0-based)
//           setMerchantData(updated);
//           try {
//             savePersistentData(updated, 4);
//           } catch (e) {
//             // ignore persistence errors
//           }
//         } catch (e) {
//           // ignore
//         }
//       }, 600);
//     });

//     return () => {
//       try {
//         subscription.unsubscribe && subscription.unsubscribe();
//       } catch (e) {}
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [form, setMerchantData, savePersistentData, contextMerchantData]);

//   // Ensure last agreement changes are saved on unmount / page unload so signature/fullName are not lost.
//   useEffect(() => {
//     const persistNow = () => {
//       try {
//         const current = form.getValues();
//         const updated = { ...contextMerchantData, agreement: current } as MerchantSignupData;
//         try {
//           saveMerchantData(updated, 4);
//         } catch (e) {
//           try {
//             localStorage.setItem('merchant_onboarding_data', JSON.stringify({ data: updated }));
//           } catch (err) {}
//         }
//       } catch (e) {
//         // ignore
//         // eslint-disable-next-line no-console
//         console.error('Failed to persist agreement on unmount/beforeunload:', e);
//       }
//     };

//     if (typeof window !== 'undefined') {
//       const handler = (ev: BeforeUnloadEvent) => {
//         persistNow();
//       };
//       window.addEventListener('beforeunload', handler);

//       return () => {
//         persistNow();
//         window.removeEventListener('beforeunload', handler);
//       };
//     }

//     return () => {};
//   }, [form, savePersistentData, setMerchantData, contextMerchantData]);

//   // High-DPI scaling and restore signature on mount only
//   useEffect(() => {
//     if (sigPadRef.current) {
//       const canvas = sigPadRef.current.getCanvas();
//       const ratio = Math.max(window.devicePixelRatio || 1, 1);
//       canvas.width = 400 * ratio;
//       canvas.height = 150 * ratio;
//       // Use willReadFrequently to reduce Canvas2D readback warnings in some browsers
//       canvas.getContext("2d", { willReadFrequently: true })?.scale(ratio, ratio);
//       canvas.style.width = "400px";
//       canvas.style.height = "150px";
//       sigPadRef.current.clear();
//       const sig = form.getValues("signature");
//       if (sig && sig !== "data:,") {
//         try {
//           sigPadRef.current.fromDataURL(sig, { width: 400, height: 150 });
//         } catch (e) { }
//       }
//     }
//     // eslint-disable-next-line
//   }, []);

//   const handleScheduleCPreview = () => {
//     const fullName = contextMerchantData?.agreement?.fullName;
//     const signature = contextMerchantData?.agreement?.signature;
//     if (!fullName || !signature) {
//       setShowScheduleCModal(true);
//     } else {
//       window.open("/docs/schedule-c/preview", "_blank");
//     }
//   };

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const onSubmit = async (data: AgreementFormData) => {
//     setIsSubmitting(true);
//     try {
//       // Ensure agreement is saved in context
//       setMerchantData((prev) => ({ ...prev, agreement: data }));

//       // Try to persist the agreement step to the backend synchronously so server has latest values
//       try {
//         if (!sessionId) throw new Error('Missing sessionId');
//         // Save the agreement step (step index 4)
//         await saveOnboardingStep(sessionId, 4, data);
//         console.debug('[agreement] saved agreement step to server before submit', { sessionId });
//       } catch (saveErr: any) {
//         // If saving fails, surface a helpful message but still try submit (submit may fail with clearer server message)
//         console.warn('Failed to save agreement step before submit:', saveErr);
//         // show non-blocking toast
//         try {
//           toast({
//             variant: 'destructive',
//             title: 'Could not save agreement',
//             description: saveErr?.responseText || saveErr?.message || 'Failed to save agreement to server before submit. Your data is saved locally.',
//           });
//         } catch (e) {}
//       }

//       // Submit the onboarding session (server will validate/process saved session data)
//       if (!sessionId) throw new Error('Missing sessionId for submission');

//       try {
//         const resp = await submitOnboardingSession(sessionId);

//         // Mark session complete (clears local persistence)
//         completeSession();

//         // Success UX
//         try {
//           sonnerToast.success('Registration completed successfully!');
//         } catch (e) {}

//         toast({ title: 'Success', description: resp?.message || 'Merchant registration completed successfully!' });

//         // Navigate to completion page
//         navigate('/merchant-onboarding-complete');
//       } catch (submitErr: any) {
//         // If backend indicates required steps are missing, attempt to save them from context and retry once
//         const respText = submitErr?.responseText;
//         let parsed: any = null;
//         try {
//           parsed = respText ? JSON.parse(respText) : null;
//         } catch (e) {
//           parsed = null;
//         }

//         const code = parsed?.code || parsed?.error?.code;
//         const message = parsed?.message || submitErr?.message || '';

//         if (code === 'BUSINESS_LOGIC_ERROR' && message.includes('Not all required steps are completed')) {
//           try {
//             // Try to save any missing steps from current context data (0: personal,1:business,2:ownership,3:bank,4:agreement)
//             const stepsToSave: Array<{ idx: number; payload: any }> = [
//               { idx: 0, payload: contextMerchantData?.personalDetails },
//               { idx: 1, payload: contextMerchantData?.businessInformation },
//               { idx: 2, payload: contextMerchantData?.ownership },
//               { idx: 3, payload: contextMerchantData?.bankInformation },
//               { idx: 4, payload: data },
//             ];

//             const savedSteps: number[] = [];
//             const failedSaves: Array<{ idx: number; error: any }> = [];

//             for (const s of stepsToSave) {
//               if (s.payload && Object.keys(s.payload).length > 0) {
//                 try {
//                   // save only if payload appears non-empty
//                   await saveOnboardingStep(sessionId, s.idx, s.payload);
//                   savedSteps.push(s.idx);
//                 } catch (innerSaveErr) {
//                   // record failure but continue saving other steps
//                   console.warn('[agreement] retry save step failed', s.idx, innerSaveErr);
//                   failedSaves.push({ idx: s.idx, error: innerSaveErr });
//                 }
//               }
//             }

//             // Retry submit once
//             try {
//               const retryResp = await submitOnboardingSession(sessionId);
//               completeSession();
//               try { sonnerToast.success('Registration completed successfully!'); } catch (e) {}
//               toast({ title: 'Success', description: retryResp?.message || 'Merchant registration completed successfully!' });
//               navigate('/merchant-onboarding-complete');
//               return;
//             } catch (retryErr: any) {
//               // Provide clearer feedback: which steps were saved and which failed
//               console.warn('[agreement] retry submit failed', { retryErr, savedSteps, failedSaves });
//               const retryMsgParts: string[] = [];
//               if (savedSteps.length) retryMsgParts.push(`Saved steps during retry: ${savedSteps.join(', ')}`);
//               if (failedSaves.length) retryMsgParts.push(`Failed to save steps: ${failedSaves.map(f => f.idx).join(', ')}`);
//               const retryErrText = retryErr?.responseText || retryErr?.message || String(retryErr);
//               retryMsgParts.push(`Submit retry error: ${retryErrText}`);
//               const combined = retryMsgParts.join(' — ');
//               try {
//                 toast({ variant: 'destructive', title: 'Submit retry failed', description: combined });
//               } catch (e) {}
//               throw retryErr;
//             }
//           } catch (retryErr: any) {
//             // fallthrough to surface original submit error
//             console.warn('[agreement] retry flow failed', retryErr);
//             throw retryErr;
//           }
//         }

//         // If not a business logic missing-steps error, rethrow to be handled by outer catch
//         throw submitErr;
//       }
//     } catch (error: any) {
//       console.error('Form submission error', error);
//       // Prefer server-provided responseText when available
//       const msg = error?.responseText || error?.message || 'Unable to complete merchant registration';
//       toast({ variant: 'destructive', title: 'Failed', description: msg });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const onError = (errors: any) => {
//     try {
//       const firstKey = Object.keys(errors || {})[0];
//       const firstErr = firstKey ? errors[firstKey] : null;
//       const message = firstErr?.message || 'Please complete the required fields before submitting.';
//       toast({ variant: 'destructive', title: 'Unable to submit', description: message });
//       if (firstKey) {
//         // focus first invalid input if present
//         const el = document.querySelector(`[name="${firstKey}"]`) as HTMLElement | null;
//         if (el && typeof el.focus === 'function') el.focus();
//       }
//     } catch (e) {
//       // ignore
//     }
//   };

//   const completeRegistration = async (data: AgreementFormData) => {
//     // Simulate registration completion
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     sonnerToast.success("Registration completed successfully! (Mock)");
//     return { success: true, message: "Registration completed" };
//   };

//   const getUserIP = async (): Promise<string> => {
//     // Return mock IP address
//     return '127.0.0.1';
//   };

//   return (
//     <div className="bg-white">
//       <div className="w-full mx-auto px-4 md:px-12">
        
//         <Separator className="mb-8" />
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
//             {/* Declarations and Terms Section */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">
//                 Declarations and Terms
//               </h2>

//               <div className="space-y-4">
       
//                 {/* Electronic Records Consent */}
//                 <FormField
//                   control={form.control}
//                   name="ConsentElectronicRecordsPreview"
//                   render={({ field }) => (
//                     <FormItem>
//                       <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
//                         <FormControl>
//                           <Switch
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                             className="mr-4"
//                           />
//                         </FormControl>
//                         <div className="flex-1">
//                           <p className="text-sm text-black">
//                             You reviewed and agree to this{" "}
//                             <a
//                               href="/docs/consent-electronic-records-2025/preview"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-pink-600 underline cursor-pointer"
//                             >
//                               Consent for Use of Electronic Records and Signatures
//                             </a>{" "}
//                             after verifying you have everything required to view and
//                             keep electronic records
//                           </p>
//                         </div>

//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                    {/* JVC Merchant Agreement  */}
//                 <FormField
//                   control={form.control}
//                   name="MerchantAgreementPreview"
//                   render={({ field }) => (
//                     <FormItem>
//                       <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
//                         <FormControl>
//                           <Switch
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                             className="mr-4"
//                           />
//                         </FormControl>

//                         <div className="flex-1">
//                           <p className="text-sm text-black">
//                             You reviewed and agree to this{" "}
//                             <a
//                               href="/docs/merchant-agreement/preview"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-pink-600 underline cursor-pointer"
//                             >
//                               JVC Merchant Agreement
//                             </a>{" "}
//                           </p>
//                         </div>
                    
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

// {/* Merchant - Privacy Policy */}
//    <FormField
//                   control={form.control}
//                   name="OnlinePrivacyPolicyConsumerPreview"
//                   render={({ field }) => (
//                     <FormItem>
//                       <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
//                         <FormControl>
//                           <Switch
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                             className="mr-4"
//                           />
//                         </FormControl>

//                         <div className="flex-1">
//                           <p className="text-sm text-black">
//                             You received and agree to this{" "}
//                             <a
//                               href="/docs/online-privacy-policy/preview"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-pink-600 underline cursor-pointer"
//                             >
//                               JVC Online Privacy Policy
//                             </a>{" "}
//                           </p>
//                         </div>
//                         {/* <div className="flex-1">
//                           <p className="text-sm text-gray-700">
//                             You reviewed and agree to this{" "}
//                             <span className="text-blue-600 underline cursor-pointer">
//                               Merchant Operating Guide
//                             </span>
//                           </p>
//                         </div> */}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 {/* Merchant Operating Guide */}
//                 <FormField
//                   control={form.control}
//                   name="merchantOperatingGuide"
//                   render={({ field }) => (
//                     <FormItem>
//                       <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
//                         <FormControl>
//                           <Switch
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                             className="mr-4"
//                           />
//                         </FormControl>

//                         <div className="flex-1">
//                           <p className="text-sm text-black">
//                             You reviewed and agree to this{" "}
//                             <a
//                               href="/docs/merchant-operating-guide/preview"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-pink-600 underline cursor-pointer"
//                             >
//                               Merchant Operating Guide
//                             </a>{" "}
//                           </p>
//                         </div>
//                         {/* <div className="flex-1">
//                           <p className="text-sm text-gray-700">
//                             You reviewed and agree to this{" "}
//                             <span className="text-blue-600 underline cursor-pointer">
//                               Merchant Operating Guide
//                             </span>
//                           </p>
//                         </div> */}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />



//               </div>
//             </div>

//             {/* Account Terms Section */}
//             <div>
            
           
//               <div className="terms-section mb-8">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                   Declarations and Terms
//                 </h3>
//                 <div className="terms-box p-4 border rounded bg-gray-50 max-h-69 overflow-y-auto text-sm text-gray-800">
//                   <p>
//                     The terms "you," "your" and "Merchant" mean the business identified in Step 1 "Business" as the Merchant. The terms "we," "us," "our", "JVC" and "Joint Venture Card" mean Joint Venture Card Holdings, Inc., its subsidiaries and affiliates.
//                   </p>
//                   <p className="mt-2">
//                     You consent to receiving commercial electronic mail messages
//                     from us from time to time. You authorize us and our
//                     respective service providers to investigate and verify the
//                     references, statements, and other information contained in
//                     your Merchant Application. For purposes of making our
//                     decision about your Merchant Application and in connection
//                     with any Merchant Agreement that may be established between
//                     you and us in the future, you authorize us and our
//                     respective service providers to: (1) obtain and use
//                     information about you from any credit reporting agency that
//                     has a bearing on your character, general reputation,
//                     personal characteristics, or mode of living; and (2) obtain
//                     and use additional information about you from your
//                     references, financial institutions, creditors, governmental
//                     agencies, licensing and accreditation entities, customers,
//                     employees, and other lawful sources. You authorize us and
//                     our respective service providers to share information with
//                     each other from this Application and all information
//                     obtained from any source in connection with processing and
//                     evaluating this Merchant Application and/or in connection
//                     with any Merchant Agreement that may be established between
//                     you and us in the future, except as expressly prohibited by
//                     law.
//                   </p>
//                   <p className="mt-4 font-bold">
//                     Merchant certifies that the federal taxpayer identification
//                     number and corresponding filing name for Merchant provided
//                     in this Merchant Application are correct. Merchant agrees to
//                     all terms of this Merchant Application.
//                   </p>
//                   <p className="mt-4">
//                     The person who signs for you below certifies and represents
//                     to us that all information and documents provided in or with
//                     this Merchant Application is true, accurate, and complete.
//                     The person who signs for you below also represents that he
//                     and/or she has read and understands this Merchant
//                     Application and is authorized to sign and submit this
//                     Merchant Application on behalf of the Merchant. The person
//                     who signs for you below authorizes and directs us and our
//                     service providers to inform the undersigned person directly
//                     or through the Merchant of reports about the undersigned
//                     person that they have requested from consumer reporting
//                     agencies. Such information will include the name and address
//                     of the agency furnishing the report.
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-6 mt-6">
//                 <FormField
//                   control={form.control}
//                   name="fullName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Full Name</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           onChange={(e) => {
//                             field.onChange(e);
//                             setMerchantData((prev) => ({
//                               ...prev,
//                               agreement: {
//                                 ...prev.agreement,
//                                 fullName: e.target.value,
//                               },
//                             }));
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="signature"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Draw E-Signature</FormLabel>
//                       <FormControl>
//                         <div>
//                           <SignaturePad
//                             ref={sigPadRef}
//                             penColor="black"
//                             canvasProps={{
//                               width: 400,
//                               height: 150,
//                               className: "border rounded bg-white",
//                             }}
//                             onEnd={() => {
//                               const dataUrl = sigPadRef.current
//                                 ?.getTrimmedCanvas()
//                                 .toDataURL("image/png");
//                               field.onChange(dataUrl);
//                               setMerchantData((prev) => ({
//                                 ...prev,
//                                 agreement: {
//                                   ...prev.agreement,
//                                   signature: dataUrl,
//                                 },
//                               }));
//                             }}
//                           />
//                           <Button
//                             type="button"
//                             onClick={() => {
//                               sigPadRef.current?.clear();
//                               field.onChange("");
//                               setMerchantData((prev) => ({
//                                 ...prev,
//                                 agreement: {
//                                   ...prev.agreement,
//                                   signature: "",
//                                 },
//                               }));
//                             }}
//                             className="mt-2"
//                           >
//                             Clear
//                           </Button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
//               <Button
//                 type="button"
//                 onClick={() => {
//                   // Save current form data before going back
//                   const currentData = form.getValues();
//                   setMerchantData((prev) => {
//                     const updated = { ...prev, agreement: currentData };
//                     return updated;
//                   });
//                   onPrev();
//                 }}
//                 variant="outline"
//                 className="order-2 sm:order-1"
//               >
//                 Previous
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-blue-500 hover:bg-blue-600 text-white order-1 sm:order-2"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AgreementSteps;
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import type { MerchantSignupData } from "../types";
import SignaturePad from "react-signature-canvas";
import { useRef, useEffect, useState } from "react";
import { toast as sonnerToast } from "sonner";
import { useMerchantData } from "@/context/MerchantDataContext";
 import { saveMerchantData } from "@/lib/merchantPersistence"; // No longer needed - using server-side storage
import { saveOnboardingStep, submitOnboardingSession, uploadAgreementDocuments } from "@/lib/api";
import { generateAllAgreementPdfs } from "@/lib/pdfGenerator";
import { runEntityVerification } from '@/lib/verification';
import { bridgerSearch } from '@/lib/api';
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle } from "lucide-react";

// -----------------
// Helper: API payload mapper
// -----------------
function buildPayload(data: MerchantSignupData, agreement: AgreementFormData) {
  const owners: any[] = [];

  if (data.personalDetails) {
    owners.push({
      firstName: data.personalDetails.firstName,
      lastName: data.personalDetails.lastName,
      ssn: data.personalDetails.socialSecurityNumber,
      // Prefer a real DOB if you have it in the model; otherwise omit.
      ...(data.personalDetails as any)?.dateOfBirth
        ? { dob: (data.personalDetails as any).dateOfBirth }
        : {},
      email: data.personalDetails.email,
      title: data.personalDetails.title,
      telephone: data.personalDetails.phone,
      isPrimaryOwner: true,
    });
  }

  const beneficiaries = data.ownership?.owners || [];
  beneficiaries.forEach((o) => {
    const pct = Number(o.ownershipPercentage);
    owners.push({
      firstName: o.firstName,
      lastName: o.lastName,
      ssn: o.ssn,
      dob: o.dateOfBirth,
      email: o.email,
      ownershipPercentage: pct,
      title: o.title,
      telephone: o.telephoneNumber,
      homeAddress1: o.homeAddress,
      homeAddress2: o.address2,
      city: o.city,
      state: o.state,
      zipCode: o.zipCode,
      // Use 25% threshold for "business_owner" (beneficial ownership)
      role: pct >= 25 ? "business_owner" : "beneficial_owner",
      isPrimaryOwner: false,
    });
  });

  const totalOwnershipPercentage = owners.reduce(
    (sum, o) => sum + Number(o.ownershipPercentage || 0),
    0
  );

  return {
    personalDetails: {
      title: data.personalDetails?.title,
      firstName: data.personalDetails?.firstName,
      lastName: data.personalDetails?.lastName,
      ssn: data.personalDetails?.socialSecurityNumber,
      email: data.personalDetails?.email,
      phone: data.personalDetails?.phone,
      username: data.personalDetails?.email, // if no dedicated username
      password: data.personalDetails?.password,
      otpOption: data.personalDetails?.otpOption,
      referralCode: data.personalDetails?.referralCode,
      // If you truly need DL files, set these where you actually upload them
      driverLicenseFrontUrl: "",
      driverLicenseBackUrl: "",
    },
    businessInformation: {
      email: data.personalDetails?.email,
      legalBusinessName: data.businessInformation?.legalNameOfBusiness,
      dba: data.businessInformation?.dbaIfApplicable,
      einOrSsn: data.businessInformation?.einSsnSelection,
      einOrSsnNumber: data.businessInformation?.einSsnNumber,
      dateBusinessStarted: data.businessInformation?.dateBusinessStarted,
      businessWebsite: data.businessInformation?.businessWebsite,
      legalEntity: data.businessInformation?.legalEntity,
      stateOrganized: data.businessInformation?.stateWhereRegistered,
      wasPreviouslyRegistered:
        data.businessInformation?.hasExistedAsOtherEntity === "yes",
      owns25PercentOrMore: true,
      // If you have a separate address step, wire it here
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      businessType: [],
      licenseNumber: "",
      licenseFileUrl: "",
    },
    ownership: {
      totalOwnershipPercentage,
      beneficiaries: owners, // single source of truth
    },
    bankInformation: {
      accountHolderName: data.bankInformation?.nameOnAccount,
      financialInstitution: data.bankInformation?.financialInstitution,
      routingNumber: data.bankInformation?.routingNumber,
      accountNumber: data.bankInformation?.accountNumber,
      accountType: data.bankInformation?.accountType,
    },
    agreement: {
      consentUseElectronicRecords: true,
      receivedPrivacyNotice: true,
      agreeCreditCardAccountAgreement: true,
      consentToCallOrText: true,
      fullName: agreement.fullName,
      signature: agreement.signature,
    },
  };
}

// -----------------
// Schema
// -----------------
const agreementSchema = z.object({
  ConsentElectronicRecordsPreview: z.boolean().refine((v) => v === true, {
    message: "You must accept Use of Electronic Records and Signatures",
  }),
  MerchantAgreementPreview: z.boolean().refine((v) => v === true, {
    message: "You must accept the JVC Merchant Agreement",
  }),
  merchantOperatingGuide: z.boolean().refine((v) => v === true, {
    message: "You must accept the Merchant Operating Guide",
  }),
  OnlinePrivacyPolicyConsumerPreview: z.boolean().refine((v) => v === true, {
    message: "You must accept the JVC Online Privacy Policy",
  }),
  fullName: z.string().min(1, "Full name is required"),
  signature: z.string().min(1, "E-Signature is required"),
});

export type AgreementFormData = z.infer<typeof agreementSchema>;

interface AgreementStepsProps {
  merchantData: MerchantSignupData;
  onNext: () => void;
  onPrev: () => void;
  initialValues?: Partial<AgreementFormData>;
}
const AgreementSteps = ({
  onNext,
  onPrev,
  merchantData,
  initialValues,
}: AgreementStepsProps) => {
  const navigate = useNavigate();
  const {
    merchantData: contextMerchantData,
    setMerchantData,
    completeSession,
    sessionId,
  } = useMerchantData();

  //---full name from personal details (person filling form)
  const firstName =  merchantData?.personalDetails?.firstName || "";
  const lastName = merchantData?.personalDetails?.lastName || "";
  const fullNameFromPersonalDetails = firstName && lastName ? `${firstName} ${lastName}` : "";

  const form = useForm<AgreementFormData>({
    resolver: zodResolver(agreementSchema),
    mode: "onChange",
    defaultValues: {
      ConsentElectronicRecordsPreview: false,
      OnlinePrivacyPolicyConsumerPreview: false,
      merchantOperatingGuide: false,
      MerchantAgreementPreview: false,
      fullName: fullNameFromPersonalDetails,
      signature: "",
      // ...(initialValues || {}),  // handled via effect to avoid hydration mismatch
    },
  });

  const sigPadRef = useRef<SignaturePad>(null);
  const saveDebounceRef = useRef<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfProgress, setPdfProgress] = useState({ current: 0, total: 4, documentType: '' });
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  // Reset form when initialValues change (e.g., navigating back)
  useEffect(() => {
    if (initialValues) {
      form.reset({ ...form.getValues(), ...initialValues });
    }
  }, [initialValues, form]);

  useEffect(() => {
    if (fullNameFromPersonalDetails) {
      form.setValue('fullName', fullNameFromPersonalDetails);
      setMerchantData((prev) => ({
        ...prev,
        agreement: {
          ...(prev as any).agreement,
          fullName: fullNameFromPersonalDetails,
        },
      }));
    }
  }, [fullNameFromPersonalDetails, form, setMerchantData]);

  // Debounced autosave to context + local persistence
  useEffect(() => {
    const subscription = form.watch(() => {
      if (saveDebounceRef.current) {
        window.clearTimeout(saveDebounceRef.current);
      }
      saveDebounceRef.current = window.setTimeout(() => {
        try {
          const current = form.getValues();
          const updated = {
            ...contextMerchantData,
            agreement: current,
          } as MerchantSignupData;
          setMerchantData(updated);
        } catch {          // ignore
        }
      }, 600);
    });

    return () => {
      try {
        subscription.unsubscribe && subscription.unsubscribe();
      } catch {}
      if (saveDebounceRef.current) {
        window.clearTimeout(saveDebounceRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, setMerchantData, contextMerchantData]);

  // Persist on unload
  useEffect(() => {
    if (typeof window === "undefined") return;

    const persistNow = () => {
      try {
        const current = form.getValues();
        const updated = { ...contextMerchantData, agreement: current } as MerchantSignupData;
      } catch {
        // ignore
      }
    };

    const handler = () => persistNow();
    window.addEventListener("beforeunload", handler);
    return () => {
      persistNow();
      window.removeEventListener("beforeunload", handler);
    };
  }, [form, contextMerchantData]);

  // HiDPI signature canvas & restore signature once
  useEffect(() => {
    if (sigPadRef.current) {
      const canvas = sigPadRef.current.getCanvas();
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = 400 * ratio;
      canvas.height = 150 * ratio;
      canvas.getContext("2d", { willReadFrequently: true })?.scale(ratio, ratio);
      canvas.style.width = "400px";
      canvas.style.height = "150px";

      sigPadRef.current.clear();
      const sig = form.getValues("signature");
      if (sig && sig !== "data:,") {
        try {
          sigPadRef.current.fromDataURL(sig, { width: 400, height: 150 });
        } catch {}
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: AgreementFormData) => {
    setIsSubmitting(true);
    setUploadModalOpen(true);
    setUploadComplete(false);
    setUploadStatus('Uploading documents...');

    try {
      // Ensure agreement in context
      setMerchantData((prev) => ({ ...prev, agreement: data }));

      // 1. Generate PDFs from agreement documents
      console.log('[Agreement] Generating PDF documents...');
      // sonnerToast.info('Generating agreement documents...');

      const { files, metadata } = await generateAllAgreementPdfs(
        contextMerchantData || merchantData,
        data.signature,
        (current, total, docType) => {
          setPdfProgress({ current, total, documentType: docType });
          // sonnerToast.info(`Generating documents... (${current}/${total})`);
        }
      );

      console.log(`[Agreement] Generated ${files.length} PDF documents`);
      // sonnerToast.success(`${files.length} documents generated successfully!`);

      // 2. Upload PDFs to backend (one at a time)
      if (!sessionId) throw new Error("Missing sessionId");

      try {
        console.log('[Agreement] Uploading documents to server...');
        // sonnerToast.info('Uploading documents to server...');

        // Prepare documents array for upload (one file + metadata per entry)
        const documentsToUpload = files.map((file, index) => ({
          file,
          metadata: metadata[index]
        }));

        await uploadAgreementDocuments(sessionId, documentsToUpload);

        console.log('[Agreement] Documents uploaded successfully');
        // sonnerToast.success('Documents uploaded successfully!');

        setUploadStatus('Documents uploaded successfully!');
        setUploadComplete(true);

        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (uploadErr: any) {
        console.error('[Agreement] Failed to upload documents:', uploadErr);
        // sonnerToast.error('Failed to upload documents. Continuing with submission...');
        setUploadModalOpen(false);
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: 'Failed to upload documents. Please try again.'
        });
        setIsSubmitting(false);
        return;
        // Continue with submission even if document upload fails
        // The backend will handle missing documents appropriately
      }

      if (!sessionId) throw new Error("Missing sessionId for submission");
      try {

        //----- Navigate to Additional Information page
        setUploadModalOpen(false);
        const response = await saveOnboardingStep(sessionId, 4, data);
        //const response = await saveOnboardingStep(sessionId, 4, contextMerchantData?.agreement);
        console.log("application status response--", response);
        navigate("/merchant-additional-information");

      } catch (submitErr: any) {
        // Attempt recovery if server says missing steps
        let parsed: any = null;
        try {
          parsed = submitErr?.responseText ? JSON.parse(submitErr.responseText) : null;
        } catch {}

        const code = parsed?.code || parsed?.error?.code;
        const message = parsed?.message || submitErr?.message || "";

        if (code === "BUSINESS_LOGIC_ERROR" && message.includes("Not all required steps are completed")) {
          try {
            const stepsToSave: Array<{ idx: number; payload: any }> = [
              { idx: 0, payload: (contextMerchantData as any)?.personalDetails },
              { idx: 1, payload: (contextMerchantData as any)?.businessInformation },
              { idx: 2, payload: (contextMerchantData as any)?.ownership },
              { idx: 3, payload: (contextMerchantData as any)?.bankInformation },
              { idx: 4, payload: data },
            ];

            const savedSteps: number[] = [];
            const failedSaves: Array<{ idx: number; error: any }> = [];

            for (const s of stepsToSave) {
              if (s.payload && Object.keys(s.payload).length > 0) {
                try {
                  await saveOnboardingStep(sessionId, s.idx, s.payload);
                  savedSteps.push(s.idx);
                } catch (inner) {
                  failedSaves.push({ idx: s.idx, error: inner });
                }
              }
            }

          } catch (retryFlowErr) {
            throw retryFlowErr;
          }
        }

        // Otherwise surface error
        throw submitErr;
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error("Form submission error", error);
      const msg = error?.responseText || error?.message || "Unable to complete merchant registration";
      toast({ variant: "destructive", title: "Failed", description: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: any) => {
    try {
      const firstKey = Object.keys(errors || {})[0];
      const firstErr = firstKey ? (errors as any)[firstKey] : null;
      const message = firstErr?.message || "Please complete the required fields before submitting.";
      toast({ variant: "destructive", title: "Unable to submit", description: "You must accept all declarations & terms" });
      if (firstKey) {
        const el = document.querySelector(`[name="${firstKey}"]`) as HTMLElement | null;
        if (el && typeof (el as any).focus === "function") (el as any).focus();
      }
    } catch {}
  };

  return (
    <div className="bg-white">
      <div className="w-full mx-auto px-4 md:px-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
            {/* Declarations and Terms */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Declarations and Terms</h2>

              <div className="space-y-4">
                {/* Electronic Records Consent */}
                <FormField
                  control={form.control}
                  name="ConsentElectronicRecordsPreview"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} className="mr-4" />
                        </FormControl>
                        <div className="flex-1">
                          <p className="text-sm text-black">
                            You reviewed and agree to this{" "}
                            <a
                              href="/docs/consent-electronic-records-2025/preview"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 underline cursor-pointer"
                            >
                              Consent for Use of Electronic Records and Signatures
                            </a>{" "}
                            after verifying you have everything required to view and keep electronic records
                          </p>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Merchant Agreement */}
                <FormField
                  control={form.control}
                  name="MerchantAgreementPreview"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} className="mr-4" />
                        </FormControl>
                        <div className="flex-1">
                          <p className="text-sm text-black">
                            You reviewed and agree to this{" "}
                            <a
                              href="/docs/merchant-agreement/preview"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 underline cursor-pointer"
                            >
                              JVC Merchant Agreement
                            </a>
                          </p>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Privacy Policy */}
                <FormField
                  control={form.control}
                  name="OnlinePrivacyPolicyConsumerPreview"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} className="mr-4" />
                        </FormControl>
                        <div className="flex-1">
                          <p className="text-sm text-black">
                            You received and agree to this{" "}
                            <a
                              href="/docs/online-privacy-policy-consumer/preview"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 underline cursor-pointer"
                            >
                              JVC Online Privacy Policy
                            </a>
                          </p>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Merchant Operating Guide */}
                <FormField
                  control={form.control}
                  name="merchantOperatingGuide"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} className="mr-4" />
                        </FormControl>
                        <div className="flex-1">
                          <p className="text-sm text-black">
                            You reviewed and agree to this{" "}
                            <a
                              href="/docs/merchant-operating-guide/preview"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 underline cursor-pointer"
                            >
                              Merchant Operating Guide
                            </a>
                          </p>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Terms box */}
            <div>
              <div className="terms-section mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Declarations and Terms</h3>
                <div className="terms-box p-4 border rounded bg-gray-50 max-h-69 overflow-y-auto text-sm text-gray-800">
                  <p>
                    The terms "you," "your" and "Merchant" mean the business identified in Step 1 "Business" as the
                    Merchant. The terms "we," "us," "our", "JVC" and "Joint Venture Card" mean Joint Venture Card
                    Holdings, Inc., its subsidiaries and affiliates.
                  </p>
                  <p className="mt-2">
                    You consent to receiving commercial electronic mail messages from us from time to time. You authorize
                    us and our respective service providers to investigate and verify the references, statements, and
                    other information contained in your Merchant Application. For purposes of making our decision about
                    your Merchant Application and in connection with any Merchant Agreement that may be established
                    between you and us in the future, you authorize us and our respective service providers to: (1)
                    obtain and use information about you from any credit reporting agency that has a bearing on your
                    character, general reputation, personal characteristics, or mode of living; and (2) obtain and use
                    additional information about you from your references, financial institutions, creditors,
                    governmental agencies, licensing and accreditation entities, customers, employees, and other lawful
                    sources. You authorize us and our respective service providers to share information with each other
                    from this Application and all information obtained from any source in connection with processing and
                    evaluating this Merchant Application and/or in connection with any Merchant Agreement that may be
                    established between you and us in the future, except as expressly prohibited by law.
                  </p>
                  <p className="mt-4 font-bold">
                    Merchant certifies that the federal taxpayer identification number and corresponding filing name for
                    Merchant provided in this Merchant Application are correct. Merchant agrees to all terms of this
                    Merchant Application.
                  </p>
                  <p className="mt-4">
                    The person who signs for you below certifies and represents to us that all information and documents
                    provided in or with this Merchant Application is true, accurate, and complete. The person who signs
                    for you below also represents that he and/or she has read and understands this Merchant Application
                    and is authorized to sign and submit this Merchant Application on behalf of the Merchant. The person
                    who signs for you below authorizes and directs us and our service providers to inform the undersigned
                    person directly or through the Merchant of reports about the undersigned person that they have
                    requested from consumer reporting agencies. Such information will include the name and address of the
                    agency furnishing the report.
                  </p>
                </div>
              </div>

              <div className="space-y-6 mt-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          readOnly
                          disabled
                          className="bg-gray-100 cursor-not-allowed"
                          value={fullNameFromPersonalDetails || field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="signature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Draw E-Signature</FormLabel>
                      <FormControl>
                        <div>
                          <SignaturePad
                            ref={sigPadRef}
                            penColor="black"
                            canvasProps={{
                              width: 400,
                              height: 150,
                              className: "border rounded bg-white",
                            }}
                            onEnd={() => {
                              const dataUrl = sigPadRef.current
                                ?.getTrimmedCanvas()
                                .toDataURL("image/png");
                              field.onChange(dataUrl);
                              setMerchantData((prev) => ({
                                ...prev,
                                agreement: {
                                  ...(prev as any).agreement,
                                  signature: dataUrl,
                                },
                              }));
                              try {
                                localStorage.setItem('merchant_agreement_signature', dataUrl || '');
                              } catch (err) {
                                console.warn('Failed to save signature to localStorage:', err);
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              sigPadRef.current?.clear();
                              field.onChange("");
                              setMerchantData((prev) => ({
                                ...prev,
                                agreement: {
                                  ...(prev as any).agreement,
                                  signature: "",
                                },
                              }));
                              try {
                                localStorage.removeItem('merchant_agreement_signature');
                              } catch (err) {
                                console.warn('Failed to clear signature from localStorage:', err);
                              }
                            }}
                            className="mt-2"
                          >
                            Clear
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Nav */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button
                type="button"
                onClick={() => {
                  const currentData = form.getValues();
                  setMerchantData((prev) => ({ ...prev, agreement: currentData }));
                  onPrev();
                }}
                variant="outline"
                className="order-2 sm:order-1"
              >
                Previous
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-600 text-white order-1 sm:order-2">
                {isSubmitting && pdfProgress.current > 0 ? `Processing...` : isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>

        {/* Upload Progress Modal */}
        <Dialog open={uploadModalOpen} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md [&>button]:hidden">
            <div className="flex flex-col items-center justify-center py-8 px-4">
              {!uploadComplete ? (
                <>
                  <Loader2 className="h-16 w-16 text-blue-600 animate-spin mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {uploadStatus}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    Please wait while we process your documents...
                  </p>
                </>
              ) : (
                <>
                  <div className="bg-green-100 rounded-full p-4 mb-6">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {uploadStatus}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    Redirecting you to the next step...
                  </p>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AgreementSteps;
