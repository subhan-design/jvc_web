// // import { useForm } from "react-hook-form";
// // import { useEffect } from "react";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import * as z from "zod";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { US_STATES } from "@/data/us-states";
// // import { useMerchantData } from "@/context/MerchantDataContext";
// // import { toast } from "sonner";



// // const formSchema = z
// //   .object({
// //     // Business Information
// //     legalNameOfBusiness: z
// //       .string()
// //       .min(1, "Legal name of business is required")
// //       .min(2, "Business name must be at least 2 characters")
// //       .regex(/^[a-zA-Z0-9\s\-\&\.\,\'\"]+$/, "Business name can only contain letters, numbers, spaces, and common business punctuation (- & . , ' \")"),
// //     dbaIfApplicable: z.string()
// //       .optional()
// //       .refine((val) => !val || val.length >= 2, "DBA must be at least 2 characters if provided")
// //       .refine((val) => !val || /^[a-zA-Z0-9\s\-\&\.\,\'\"]+$/.test(val), "DBA can only contain letters, numbers, spaces, and common business punctuation"),
// //     einSsnSelection: z.string().min(1, "Please select EIN or SSN"),
// //     einSsnNumber: z.string().min(1, "EIN/SSN is required"),
// //     dateBusinessStarted: z.string().min(1, "Date business started is required"),
// //     businessWebsite: z.string()
// //       .optional()
// //       .refine((val) => !val || val === "" || /^https?:\/\/.+\..+/.test(val), "Website must be a valid URL (include http:// or https://)"),
// //     legalEntity: z.string().min(1, "Legal entity is required"),
// //     stateWhereRegistered: z
// //       .string()
// //       .min(1, "State where registered is required"),
// //     hasExistedAsOtherEntity: z.string().min(1, "Please select an option"),
// //     entity: z.string()
// //       .optional()
// //       .refine((val) => !val || /^[a-zA-Z0-9\s\-\&\.\,\'\"]+$/.test(val), "Entity name can only contain letters, numbers, spaces, and common business punctuation"),
// //   })
// //   .superRefine((data, ctx) => {
// //     // Validate EIN/SSN format based on selection
// //     if (data.einSsnSelection === "ein") {
// //       const einPattern = /^\d{2}-\d{7}$/;
// //       if (!einPattern.test(data.einSsnNumber)) {
// //         ctx.addIssue({
// //           code: z.ZodIssueCode.custom,
// //           path: ["einSsnNumber"],
// //           message: "EIN must be in format XX-XXXXXXX",
// //         });
// //       }
// //     } else if (data.einSsnSelection === "ssn") {
// //       const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
// //       if (!ssnPattern.test(data.einSsnNumber)) {
// //         ctx.addIssue({
// //           code: z.ZodIssueCode.custom,
// //           path: ["einSsnNumber"],
// //           message: "SSN must be in format XXX-XX-XXXX",
// //         });
// //       }
// //     }

// //     // Require entity field if "Yes" is selected for hasExistedAsOtherEntity
// //     if (data.hasExistedAsOtherEntity === "yes" && !data.entity?.trim()) {
// //       ctx.addIssue({
// //         code: z.ZodIssueCode.custom,
// //         path: ["entity"],
// //         message: "Entity name is required when business existed as another entity",
// //       });
// //     }
// //   });

// // export type BusinessDetailsFormData = z.infer<typeof formSchema>;

// // interface BusinessDetailsStepProps {
// //   onNext: (data: BusinessDetailsFormData) => void;
// //   onPrev: () => void;
// //   initialValues?: Partial<BusinessDetailsFormData>;
// // }

// // const BusinessDetailsStep = ({
// //   onNext,
// //   onPrev,
// //   initialValues,
// // }: BusinessDetailsStepProps) => {
// //   const form = useForm<BusinessDetailsFormData>({
// //     resolver: zodResolver(formSchema),
// //     mode: "onChange",
// //     defaultValues: {
// //       legalNameOfBusiness: "",
// //       dbaIfApplicable: "",
// //       einSsnSelection: "",
// //       einSsnNumber: "",
// //       dateBusinessStarted: "",
// //       businessWebsite: "",
// //       legalEntity: "",
// //       stateWhereRegistered: "",
// //       hasExistedAsOtherEntity: "",
// //       entity: "",
// //       ...(initialValues || {}),
// //     },
// //   });

// //   console.log("Step 1 values: ", initialValues);

// //   useEffect(() => {
// //     if (initialValues) {
// //       form.reset({ ...form.getValues(), ...initialValues });
// //     }
// //   }, [initialValues, form]);

// //   const { setMerchantData, sessionId, savePersistentData } = useMerchantData();

// //   // Format EIN input (XX-XXXXXXX)
// //   const formatEIN = (value: string) => {
// //     const digits = value.replace(/\D/g, "");
// //     if (digits.length <= 2) return digits;
// //     return `${digits.slice(0, 2)}-${digits.slice(2, 9)}`;
// //   };

// //   // Format SSN input (XXX-XX-XXXX)
// //   const formatSSN = (value: string) => {
// //     const digits = value.replace(/\D/g, "");
// //     if (digits.length <= 3) return digits;
// //     if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
// //     return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
// //   };

// //   const onSubmit = (data: BusinessDetailsFormData) => {
// //     console.log("BusinessDetailsStep onSubmit called with data:", data);
// //     saveBusinessInfoToAPI(data);
// //   };

// //   const saveBusinessInfoToAPI = async (data: BusinessDetailsFormData) => {
// //     try {
// //       // Simulate API call
// //       await new Promise(resolve => setTimeout(resolve, 1000));

// //       toast.success("Business information saved successfully!");

// //       // Save to local state and proceed
// //       setMerchantData((prev) => ({ ...prev, businessInformation: data }));
// //       savePersistentData({ businessInformation: data }, 2);
// //       onNext(data);

// //     } catch (error) {
// //       console.error('Error saving business information:', error);
// //       toast.error(error instanceof Error ? error.message : 'Failed to save business information');
// //     }
// //   };



// //   return (
// //     <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 w-full mx-auto">
// //       <Form {...form}>
// //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
// //           {/* Business Information Section */}
// //           <div>
// //             <h3 className="text-xl font-semibold text-ateneoBlue mb-4">
// //               Business Information
// //             </h3>
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
// //               <FormField
// //                 control={form.control}
// //                 name="legalNameOfBusiness"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Legal Name of Business</FormLabel>
// //                     <FormControl>
// //                       <Input {...field} placeholder="Enter legal business name" />
// //                     </FormControl>
// //                     <p className="text-xs text-gray-500 mt-1">
// //                       *Letters, numbers, spaces, and common business punctuation only (- & . , ' ")
// //                     </p>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="dbaIfApplicable"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>DBA (If Applicable)</FormLabel>
// //                     <FormControl>
// //                       <Input {...field} placeholder="Enter DBA name if applicable" />
// //                     </FormControl>
// //                     <p className="text-xs text-gray-500 mt-1">
// //                       *Letters, numbers, spaces, and common business punctuation only (- & . , ' ")
// //                     </p>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="einSsnSelection"
// //                 render={({ field }) => (
// //                   <FormItem className="col-span-2">
// //                     <FormLabel>Please Select EIN/SSN</FormLabel>
// //                     <FormControl>
// //                       <RadioGroup
// //                         onValueChange={field.onChange}
// //                         value={field.value}
// //                         className="flex flex-row space-x-6"
// //                       >
// //                         <div className="flex items-center space-x-2">
// //                           <RadioGroupItem value="ein" id="ein-selection" />
// //                           <FormLabel htmlFor="ein-selection" className="cursor-pointer">EIN</FormLabel>
// //                         </div>
// //                         <div className="flex items-center space-x-2">
// //                           <RadioGroupItem value="ssn" id="ssn-selection" />
// //                           <FormLabel htmlFor="ssn-selection" className="cursor-pointer">SSN</FormLabel>
// //                         </div>
// //                       </RadioGroup>
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="einSsnNumber"
// //                 render={({ field }) => {
// //                   const selectedType = form.watch("einSsnSelection");
// //                   const isEIN = selectedType === "ein";
// //                   const isSSN = selectedType === "ssn";

// //                   return (
// //                     <FormItem className="col-span-2">
// //                       <FormLabel>
// //                         {isEIN ? "EIN Number" : isSSN ? "SSN Number" : "SSN/EIN Number"}
// //                       </FormLabel>
// //                       <FormControl>
// //                         <Input
// //                           {...field}
// //                           onChange={(e) => {
// //                             let formatted = e.target.value;
// //                             if (isEIN) {
// //                               formatted = formatEIN(e.target.value);
// //                             } else if (isSSN) {
// //                               formatted = formatSSN(e.target.value);
// //                             }
// //                             field.onChange(formatted);
// //                           }}
// //                           placeholder={
// //                             isEIN ? "XX-XXXXXXX" : 
// //                             isSSN ? "XXX-XX-XXXX" : 
// //                             "Select EIN or SSN above"
// //                           }
// //                           maxLength={isEIN ? 10 : isSSN ? 11 : undefined}
// //                           disabled={!selectedType}
// //                         />
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   );
// //                 }}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="dateBusinessStarted"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Date Business Started</FormLabel>
// //                     <FormControl>
// //                       <Input 
// //                         {...field} 
// //                         type="date"
// //                         placeholder="Select date"
// //                       />
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="businessWebsite"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Business Website</FormLabel>
// //                     <FormControl>
// //                       <Input {...field} placeholder="https://example.com" />
// //                     </FormControl>
// //                     <p className="text-xs text-gray-500 mt-1">
// //                       *Include http:// or https:// (e.g., https://example.com)
// //                     </p>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="legalEntity"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Legal Entity</FormLabel>
// //                     <Select
// //                       onValueChange={field.onChange}
// //                       value={field.value}
// //                     >
// //                       <FormControl>
// //                         <SelectTrigger>
// //                           <SelectValue placeholder="Select Legal Entity" />
// //                         </SelectTrigger>
// //                       </FormControl>
// //                       <SelectContent>
// //                         <SelectItem value="corporation">
// //                           Corporation (including S-Corp and Professional Corp)
// //                         </SelectItem>
// //                         <SelectItem value="llc">
// //                           Limited Liability Corporation (LLC)
// //                         </SelectItem>
// //                         <SelectItem value="sole_proprietor">
// //                           Sole Proprietor
// //                         </SelectItem>
// //                         <SelectItem value="partnership">
// //                           Partnership
// //                         </SelectItem>
// //                         <SelectItem value="not_for_profit">
// //                           Not-for-profit
// //                         </SelectItem>
// //                       </SelectContent>
// //                     </Select>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="stateWhereRegistered"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>State</FormLabel>
// //                     <Select
// //                       onValueChange={field.onChange}
// //                       value={field.value}
// //                     >
// //                       <FormControl>
// //                         <SelectTrigger>
// //                           <SelectValue placeholder="Select State" />
// //                         </SelectTrigger>
// //                       </FormControl>
// //                       <SelectContent>
// //                         {US_STATES.map((state) => (
// //                           <SelectItem
// //                             key={state}
// //                             value={state.toLowerCase().replace(/\s+/g, "_")}
// //                           >
// //                             {state}
// //                           </SelectItem>
// //                         ))}
// //                       </SelectContent>
// //                     </Select>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               <FormField
// //                 control={form.control}
// //                 name="hasExistedAsOtherEntity"
// //                 render={({ field }) => (
// //                   <FormItem className="col-span-2">
// //                     <FormLabel>
// //                       Has the business ever existed as another corporate entity or name?
// //                     </FormLabel>
// //                     <FormControl>
// //                       <RadioGroup
// //                         onValueChange={field.onChange}
// //                         value={field.value}
// //                         className="flex flex-row space-x-6"
// //                       >
// //                         <div className="flex items-center space-x-2">
// //                           <RadioGroupItem value="yes" id="entity-yes" />
// //                           <FormLabel htmlFor="entity-yes" className="cursor-pointer">Yes</FormLabel>
// //                         </div>
// //                         <div className="flex items-center space-x-2">
// //                           <RadioGroupItem value="no" id="entity-no" />
// //                           <FormLabel htmlFor="entity-no" className="cursor-pointer">No</FormLabel>
// //                         </div>
// //                       </RadioGroup>
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               {form.watch("hasExistedAsOtherEntity") === "yes" && (
// //                 <FormField
// //                   control={form.control}
// //                   name="entity"
// //                   render={({ field }) => (
// //                     <FormItem className="col-span-2">
// //                       <FormLabel>Entity Name</FormLabel>
// //                       <FormControl>
// //                         <Input {...field} placeholder="Enter previous entity name" />
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />
// //               )}
// //             </div>
// //           </div>

// //           {/* Submit Button */}
// //           <div className="flex flex-col sm:flex-row gap-3 pt-4">
// //             <Button
// //               type="button"
// //               onClick={onPrev}
// //               variant="outline"
// //               className="order-2 sm:order-1"
// //             >
// //               Previous
// //             </Button>
// //             <Button
// //               type="submit"
// //               className="bg-blue-500 hover:bg-blue-600 text-white px-8 order-1 sm:order-2"
// //             >
// //               Next
// //             </Button>
// //           </div>
// //         </form>
// //       </Form>
// //     </div>
// //   );
// // };

// // export default BusinessDetailsStep;

// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { US_STATES } from "@/data/us-states";
// import { useMerchantData } from "@/context/MerchantDataContext";
// import { saveMerchantData } from '@/lib/merchantPersistence';
// import { validateEin, validateSSN as apiValidateSSN } from '@/lib/api';
// import { toast } from "sonner";

// /* --------------------------------- CONSTS --------------------------------- */
// const LICENSE_TYPES = [
//   { value: "cannabis", label: "Cannabis License" },
//   { value: "psilocybin", label: "Psilocybin License" },
//   { value: "other", label: "Other" },
//   { value: "none", label: "Non-Licensed" },
// ];

// /* --------------------------------- SCHEMA --------------------------------- */
// const formSchema = z
//   .object({
//     // Business Information
//     legalNameOfBusiness: z
//       .string()
//       .min(1, "Legal name of business is required")
//       .min(2, "Business name must be at least 2 characters")
//       .regex(
//         /^[a-zA-Z0-9\s\-\&\.\,\'\"]+$/,
//         "Business name can only contain letters, numbers, spaces, and common business punctuation (- & . , ' \")"
//       ),
//     dbaIfApplicable: z
//       .string()
//       .optional()
//       .refine((val) => !val || val.length >= 2, "DBA must be at least 2 characters if provided")
//       .refine(
//         (val) => !val || /^[a-zA-Z0-9\s\-\&\.\,\'\"]+$/.test(val),
//         "DBA can only contain letters, numbers, spaces, and common business punctuation"
//       ),
//     einSsnSelection: z.string().min(1, "Please select EIN or SSN"),
//     einSsnNumber: z.string().min(1, "EIN/SSN is required"),
//     dateBusinessStarted: z.string().min(1, "Date business started is required"),
//     businessWebsite: z
//       .string()
//       .optional()
//       .refine(
//         (val) => !val || val === "" || /^https?:\/\/.+\..+/.test(val),
//         "Website must be a valid URL (include http:// or https://)"
//       ),
//     legalEntity: z.string().min(1, "Legal entity is required"),
//     stateWhereRegistered: z.string().min(1, "State where registered is required"),
//     hasExistedAsOtherEntity: z.string().min(1, "Please select an option"),
//     entity: z
//       .string()
//       .optional()
//       .refine(
//         (val) => !val || /^[a-zA-Z0-9\s\-\&\.\,\'\"]+$/.test(val),
//         "Entity name can only contain letters, numbers, spaces, and common business punctuation"
//       ),

//     // Licenses (all optional until a type is selected, then checks apply)
//     licenseType: z.string().optional(),
//     licenseNumber: z.string().optional(),
//     licenseState: z.string().optional(),
//     licenseFile: z
//       .any()
//       .optional()
//       .refine(
//         (file) =>
//           !file ||
//           (file instanceof File &&
//             file.size <= 5 * 1024 * 1024 &&
//             ["application/pdf", "image/png", "image/jpeg"].includes(file.type)),
//         "License file must be PDF/JPG/PNG and ≤ 5MB"
//       ),
//   })
//   .superRefine((data, ctx) => {
//     // EIN/SSN format guard
//     if (data.einSsnSelection === "ein") {
//       const einPattern = /^\d{2}-\d{7}$/;
//       if (!einPattern.test(data.einSsnNumber)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["einSsnNumber"],
//           message: "EIN must be in format XX-XXXXXXX",
//         });
//       }
//     } else if (data.einSsnSelection === "ssn") {
//       const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
//       if (!ssnPattern.test(data.einSsnNumber)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["einSsnNumber"],
//           message: "SSN must be in format XXX-XX-XXXX",
//         });
//       }
//     }

//     // Require entity field if "Yes" previously existed
//     if (data.hasExistedAsOtherEntity === "yes" && !data.entity?.trim()) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["entity"],
//         message: "Entity name is required when business existed as another entity",
//       });
//     }

//     // If license type selected → require number & state
//     if (data.licenseType) {
//       if (!data.licenseNumber?.trim()) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["licenseNumber"],
//           message: "License number is required for the selected license type",
//         });
//       }
//       if (!data.licenseState?.trim()) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["licenseState"],
//           message: "License state is required for the selected license type",
//         });
//       }
//     }
//   });

// export type BusinessDetailsFormData = z.infer<typeof formSchema>;

// interface BusinessDetailsStepProps {
//   onNext: (data: BusinessDetailsFormData) => void;
//   onPrev: () => void;
//   initialValues?: Partial<BusinessDetailsFormData>;
// }

// const BusinessDetailsStep = ({ onNext, onPrev, initialValues }: BusinessDetailsStepProps) => {
//   const form = useForm<BusinessDetailsFormData>({
//     resolver: zodResolver(formSchema),
//     mode: "onChange",
//     defaultValues: {
//       legalNameOfBusiness: "",
//       dbaIfApplicable: "",
//       einSsnSelection: "",
//       einSsnNumber: "",
//       dateBusinessStarted: "",
//       businessWebsite: "",
//       legalEntity: "",
//       stateWhereRegistered: "",
//       hasExistedAsOtherEntity: "",
//       entity: "",
//       // license defaults
//       licenseType: "",
//       licenseNumber: "",
//       licenseState: "",
//       licenseFile: undefined,
//       ...(initialValues || {}),
//     },
//   });

//   useEffect(() => {
//     if (initialValues) {
//       form.reset({ ...form.getValues(), ...initialValues });
//     }
//   }, [initialValues, form]);

//   const { setMerchantData, savePersistentData } = useMerchantData();

//   const [einValidationStatus, setEinValidationStatus] = useState<'idle'|'checking'|'available'|'exists'>('idle');
//   const [einError, setEinError] = useState<string>('');

//   // Auto-save business details (debounced) so data persists between steps
//   useEffect(() => {
//     let saveTimer: ReturnType<typeof setTimeout> | null = null;
//     const subscription = form.watch((values) => {
//       if (saveTimer) clearTimeout(saveTimer);
//       saveTimer = setTimeout(() => {
//         setMerchantData((prev) => {
//           const updated = { ...prev, businessInformation: values };
//           savePersistentData(updated, 1);
//           return updated;
//         });
//       }, 600);
//     });

//     return () => {
//       if (saveTimer) clearTimeout(saveTimer);
//       try {
//         subscription.unsubscribe && (subscription.unsubscribe as any)();
//       } catch (e) {
//         // ignore
//       }
//     };
//   }, [form, setMerchantData, savePersistentData]);

//   // Debounced EIN/SSN availability check
//   useEffect(() => {
//     const val = form.watch('einSsnNumber');
//     const sel = form.watch('einSsnSelection');
//     const timer = setTimeout(async () => {
//       if (!val) return;
//       if (sel === 'ein') {
//         setEinValidationStatus('checking');
//         setEinError('');
//         try {
//           const res = await validateEin(val);
//           const exists = res?.data?.exists || false;
//           if (exists) {
//             setEinValidationStatus('exists');
//             setEinError(res?.data?.message || 'EIN already in use');
//           } else {
//             setEinValidationStatus('available');
//             setEinError('');
//           }
//         } catch (err) {
//           setEinValidationStatus('idle');
//           setEinError('Error validating EIN');
//         }
//       } else if (sel === 'ssn') {
//         // reuse API SSN validator
//         try {
//           setEinValidationStatus('checking');
//           const res = await apiValidateSSN(val);
//           const exists = res?.data?.exists || false;
//           if (exists) {
//             setEinValidationStatus('exists');
//             setEinError(res?.data?.message || 'SSN already in use');
//           } else {
//             setEinValidationStatus('available');
//             setEinError('');
//           }
//         } catch (err) {
//           setEinValidationStatus('idle');
//           setEinError('Error validating SSN');
//         }
//       }
//     }, 600);

//     return () => clearTimeout(timer);
//   }, [form.watch('einSsnNumber'), form.watch('einSsnSelection')]);

//   // Ensure last business detail changes are saved synchronously when this step unmounts or the page unloads.
//   useEffect(() => {
//     const persistNow = () => {
//       try {
//         const currentData = form.getValues();
//         const updated = {
//           ...(typeof window !== 'undefined' ? (window as any).__merchantDataCache || {} : {}),
//           businessInformation: currentData,
//         };
//         try {
//           saveMerchantData(updated, 1);
//         } catch (e) {
//           try {
//             localStorage.setItem('merchant_onboarding_data', JSON.stringify({ data: updated }));
//           } catch (err) {
//             // ignore
//           }
//         }
//       } catch (e) {
//         // eslint-disable-next-line no-console
//         console.error('Failed to persist business details on unmount/beforeunload:', e);
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
//   }, [form, savePersistentData, setMerchantData]);

//   // EIN/SSN formatters
//   const formatEIN = (value: string) => {
//     const digits = value.replace(/\D/g, "");
//     if (digits.length <= 2) return digits;
//     return `${digits.slice(0, 2)}-${digits.slice(2, 9)}`;
//   };
//   const formatSSN = (value: string) => {
//     const digits = value.replace(/\D/g, "");
//     if (digits.length <= 3) return digits;
//     if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
//     return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
//   };

//   const onSubmit = (data: BusinessDetailsFormData) => {
//     // Block submission if EIN/SSN validation indicates the value already exists or is still checking
//     if (einValidationStatus === 'checking') {
//       toast.error('Please wait for EIN/SSN validation to complete');
//       return;
//     }

//     if (einValidationStatus === 'exists') {
//       // Attach a form error to the einSsnNumber field for inline feedback
//       form.setError('einSsnNumber' as any, { type: 'manual', message: einError || 'EIN/SSN is already registered' });
//       toast.error(einError || 'EIN/SSN is already registered');
//       return;
//     }

//     saveBusinessInfoToAPI(data);
//   };

//   const saveBusinessInfoToAPI = async (data: BusinessDetailsFormData) => {
//     try {
//       await new Promise((r) => setTimeout(r, 1000)); // simulate
//       toast.success("Business information saved successfully!");

//   setMerchantData((prev) => ({ ...prev, businessInformation: data }));
//   // business details correspond to step index 1
//   savePersistentData({ businessInformation: data }, 1);
//       onNext(data);
//     } catch (error) {
//       console.error("Error saving business information:", error);
//       toast.error(error instanceof Error ? error.message : "Failed to save business information");
//     }
//   };

//   // Drag state for the dropzone
//   const [dragOver, setDragOver] = useState(false);

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 w-full mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Business Information */}
//           <div>
//             <h3 className="text-xl font-semibold text-ateneoBlue mb-4">Business Information</h3>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {/* Legal name */}
//               <FormField
//                 control={form.control}
//                 name="legalNameOfBusiness"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Legal Name of Business</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="Enter legal business name" />
//                     </FormControl>
//                     <p className="text-xs text-gray-500 mt-1">
//                       *Letters, numbers, spaces, and common business punctuation only (- & . , ' ")
//                     </p>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* DBA */}
//               <FormField
//                 control={form.control}
//                 name="dbaIfApplicable"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>DBA (If Applicable)</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="Enter DBA name if applicable" />
//                     </FormControl>
//                     <p className="text-xs text-gray-500 mt-1">
//                       *Letters, numbers, spaces, and common business punctuation only (- & . , ' ")
//                     </p>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* EIN/SSN selection */}
//               <FormField
//                 control={form.control}
//                 name="einSsnSelection"
//                 render={({ field }) => (
//                   <FormItem className="col-span-2">
//                     <FormLabel>Please Select EIN/SSN</FormLabel>
//                     <FormControl>
//                       <RadioGroup
//                         onValueChange={field.onChange}
//                         value={field.value}
//                         className="flex flex-row space-x-6"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="ein" id="ein-selection" />
//                           <FormLabel htmlFor="ein-selection" className="cursor-pointer">
//                             EIN
//                           </FormLabel>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="ssn" id="ssn-selection" />
//                           <FormLabel htmlFor="ssn-selection" className="cursor-pointer">
//                             SSN
//                           </FormLabel>
//                         </div>
//                       </RadioGroup>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* EIN/SSN number */}
//               <FormField
//                 control={form.control}
//                 name="einSsnNumber"
//                 render={({ field }) => {
//                   const selectedType = form.watch("einSsnSelection");
//                   const isEIN = selectedType === "ein";
//                   const isSSN = selectedType === "ssn";
//                   return (
//                     <FormItem className="col-span-2">
//                       <FormLabel>{isEIN ? "EIN Number" : isSSN ? "SSN Number" : "SSN/EIN Number"}</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           onChange={(e) => {
//                             let formatted = e.target.value;
//                             if (isEIN) formatted = formatEIN(e.target.value);
//                             else if (isSSN) formatted = formatSSN(e.target.value);
//                             field.onChange(formatted);
//                           }}
//                           placeholder={isEIN ? "XX-XXXXXXX" : isSSN ? "XXX-XX-XXXX" : "Select EIN or SSN above"}
//                           maxLength={isEIN ? 10 : isSSN ? 11 : undefined}
//                           disabled={!selectedType}
//                         />
//                       </FormControl>
//                       {/* EIN/SSN availability */}
//                       <div className="mt-1">
//                         {einValidationStatus === 'checking' && (
//                           <p className="text-sm text-yellow-600">Checking EIN/SSN...</p>
//                         )}
//                         {einValidationStatus === 'available' && (
//                           <p className="text-sm text-green-600">EIN/SSN is available</p>
//                         )}
//                         {einValidationStatus === 'exists' && (
//                           <p className="text-sm text-red-600">{einError}</p>
//                         )}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />
//               {/* Date started */}
//               <FormField
//                 control={form.control}
//                 name="dateBusinessStarted"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Date Business Started</FormLabel>
//                     <FormControl>
//                       <Input {...field} type="date" placeholder="Select date" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Website */}
//               <FormField
//                 control={form.control}
//                 name="businessWebsite"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Business Website</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="https://example.com" />
//                     </FormControl>
//                     <p className="text-xs text-gray-500 mt-1">
//                       *Include http:// or https:// (e.g., https://example.com)
//                     </p>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Legal Entity */}
//               <FormField
//                 control={form.control}
//                 name="legalEntity"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Legal Entity</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Legal Entity" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="corporation">Corporation (including S-Corp and Professional Corp)</SelectItem>
//                         <SelectItem value="llc">Limited Liability Corporation (LLC)</SelectItem>
//                         <SelectItem value="sole_proprietor">Sole Proprietor</SelectItem>
//                         <SelectItem value="partnership">Partnership</SelectItem>
//                         <SelectItem value="not_for_profit">Not-for-profit</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* State where registered */}
//               <FormField
//                 control={form.control}
//                 name="stateWhereRegistered"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>State</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select State" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {US_STATES.map((state) => (
//                           <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, "_")}>
//                             {state}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Has existed as other entity */}
//               <FormField
//                 control={form.control}
//                 name="hasExistedAsOtherEntity"
//                 render={({ field }) => (
//                   <FormItem className="col-span-2">
//                     <FormLabel>Has the business ever existed as another corporate entity or name?</FormLabel>
//                     <FormControl>
//                       <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-row space-x-6">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="yes" id="entity-yes" />
//                           <FormLabel htmlFor="entity-yes" className="cursor-pointer">
//                             Yes
//                           </FormLabel>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="no" id="entity-no" />
//                           <FormLabel htmlFor="entity-no" className="cursor-pointer">
//                             No
//                           </FormLabel>
//                         </div>
//                       </RadioGroup>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Entity name (conditional) */}
//               {form.watch("hasExistedAsOtherEntity") === "yes" && (
//                 <FormField
//                   control={form.control}
//                   name="entity"
//                   render={({ field }) => (
//                     <FormItem className="col-span-2">
//                       <FormLabel>Entity Name</FormLabel>
//                       <FormControl>
//                         <Input {...field} placeholder="Enter previous entity name" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               )}
//             </div>
//           </div>


//           {/* --------------------------- LICENSES SECTION --------------------------- */}
//           <div>
//             <h3 className="text-xl font-semibold text-ateneoBlue mb-4">Licenses</h3>

//             {/* keep the 2-col grid; we'll span the first field across both */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {/* LICENSE TYPE — full row */}
//               <FormField
//                 control={form.control}
//                 name="licenseType"
//                 render={({ field }) => (
//                   <FormItem className="lg:col-span-2">
//                     <FormLabel>License Type</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {LICENSE_TYPES.map((t) => (
//                           <SelectItem key={t.value} value={t.value}>
//                             {t.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* row with two columns */}
//               <FormField
//                 control={form.control}
//                 name="licenseNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>License Number</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="Enter license number" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="licenseState"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>State</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {US_STATES.map((state) => (
//                           <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, "_")}>
//                             {state}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* FILE UPLOAD — keep as full row */}
//               <FormField
//                 control={form.control}
//                 name="licenseFile"
//                 render={({ field }) => (
//                   <FormItem className="lg:col-span-2">
//                     <FormLabel>License</FormLabel>
//                     <FormControl>
//                       <div
//                         className={`mt-1 flex items-center justify-center rounded-md border border-dashed px-4 py-10 text-center ${dragOver ? "bg-blue-50 border-blue-300" : "border-gray-300"
//                           }`}
//                         onDragOver={(e) => {
//                           e.preventDefault();
//                           setDragOver(true);
//                         }}
//                         onDragLeave={() => setDragOver(false)}
//                         onDrop={(e) => {
//                           e.preventDefault();
//                           setDragOver(false);
//                           const file = e.dataTransfer.files?.[0];
//                           if (file) field.onChange(file);
//                         }}
//                       >
//                         <div>
//                           <div className="text-sm text-gray-700 mb-2">
//                             Drop a file here or click to upload
//                           </div>
//                           <input
//                             type="file"
//                             accept=".pdf,.png,.jpg,.jpeg"
//                             className="mx-auto block"
//                             onChange={(e) => field.onChange(e.target.files?.[0])}
//                           />
//                           {field.value instanceof File && (
//                             <div className="mt-2 text-xs text-gray-600">
//                               Selected: <span className="font-medium">{field.value.name}</span>{" "}
//                               ({Math.round(field.value.size / 1024)} KB)
//                               <Button
//                                 type="button"
//                                 variant="outline"
//                                 className="ml-2 h-6 px-2 text-xs"
//                                 onClick={() => field.onChange(undefined)}
//                               >
//                                 Remove
//                               </Button>
//                             </div>
//                           )}
//                           <p className="mt-2 text-xs text-gray-500">
//                             Accepted: PDF, JPG, PNG — up to 5MB
//                           </p>
//                         </div>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>


//           {/* Submit Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 pt-4">
//             <Button
//               type="button"
//               onClick={() => {
//                 // Save current form data before going back
//                 const currentData = form.getValues();
//                 setMerchantData((prev) => {
//                   const updated = { ...prev, businessInformation: currentData };
//                   savePersistentData(updated, 1);
//                   return updated;
//                 });
//                 onPrev();
//               }}
//               variant="outline"
//               className="order-2 sm:order-1"
//             >
//               Previous
//             </Button>
//             <Button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-8 order-1 sm:order-2"
//               disabled={einValidationStatus === 'checking' || einValidationStatus === 'exists'}
//             >
//               {einValidationStatus === 'checking' ? 'Validating...' : 'Next'}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default BusinessDetailsStep;

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { US_STATES_WITH_CODES } from "@/data/us-states";
import { useMerchantData } from "@/context/MerchantDataContext";
import { validateEin, validateSSN as apiValidateSSN, verifyCannabisLicense, uploadLicenseFile } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/* --------------------------------- CONSTS --------------------------------- */
const LICENSE_TYPES = [
  { value: "cannabis", label: "Cannabis License" },
  { value: "psilocybin", label: "Psilocybin License" },
  { value: "other", label: "Other" },
  { value: "none", label: "Non-Licensed" },
];

/* --------------------------------- SCHEMA --------------------------------- */
const formSchema = z
  .object({
    // Business Information
    legalNameOfBusiness: z
      .string()
      .min(1, "Legal name of business is required")
      .min(2, "Business name must be at least 2 characters")
      .regex(
        /^[a-zA-Z0-9\s\-\&\.\,\'\"]+$/,
        "Business name can only contain letters, numbers, spaces, and common business punctuation (- & . , ' \")"
      ),
    dbaIfApplicable: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 2, "DBA must be at least 2 characters if provided")
      .refine(
        (val) => !val || /^[a-zA-Z0-9\s\-\&\.\,\'\"]+$/.test(val),
        "DBA can only contain letters, numbers, spaces, and common business punctuation"
      ),
    einSsnSelection: z.string().min(1, "Please select EIN or SSN"),
    einSsnNumber: z.string().min(1, "EIN/SSN is required"),
    dateBusinessStarted: z
      .string()
      .min(1, "Date business started is required")
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in format MM/DD/YYYY"),
    businessWebsite: z
      .string()
      .optional()
      .refine(
        (val) => !val || val === "" || /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+.*$/.test(val),
        "Website must be a valid domain (e.g., acme.com or https://acme.com)"
      ),

    // Address Details
    address: z.string().min(1, "Address is required"),
    // address: z.string().optional(),
    city: z.string().min(1, "City is required"),
    //city: z.string().optional(),
    state: z.string().min(1, "State is required"),
    //state: z.string().optional(),
    zipcode: z.string()
       .min(1, "Zipcode is required")
       .regex(/^\d{5}(-\d{4})?$/, "Zipcode must be in format XXXXX or XXXXX-XXXX"),
    //zipcode: z.string().optional(),

    legalEntity: z.string().min(1, "Legal entity is required"),
    stateWhereRegistered: z.string().min(1, "State where registered is required"),
    hasExistedAsOtherEntity: z.string().min(1, "Please select an option"),
    entity: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[a-zA-Z0-9\s\-\&\.\,\'\"]+$/.test(val),
        "Entity name can only contain letters, numbers, spaces, and common business punctuation"
      ),

    // Licenses
    licenseType: z.string().optional(),
    licenseNumber: z.string().optional(),
    licenseState: z.string().optional(),
    licenseFile: z
      .any()
      .optional()
      .refine(
        (file) =>
          !file ||
          (file instanceof File &&
            file.size <= 5 * 1024 * 1024 &&
            ["application/pdf", "image/png", "image/jpeg"].includes(file.type)),
        "License file must be PDF/JPG/PNG and ≤ 5MB"
      ),
  })
  .superRefine((data, ctx) => {
    // EIN/SSN format guard
    if (data.einSsnSelection === "ein") {
      const einPattern = /^\d{2}-\d{7}$/;
      if (!einPattern.test(data.einSsnNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["einSsnNumber"],
          message: "EIN must be in format XX-XXXXXXX",
        });
      }
    } else if (data.einSsnSelection === "ssn") {
      const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
      if (!ssnPattern.test(data.einSsnNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["einSsnNumber"],
          message: "SSN must be in format XXX-XX-XXXX",
        });
      }
    }

    // Require entity field if "Yes" previously existed
    if (data.hasExistedAsOtherEntity === "yes" && !data.entity?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["entity"],
        message: "Entity name is required when business existed as another entity",
      });
    }

    // If license type selected AND not "none" → require number & state
    if (data.licenseType && data.licenseType !== "none") {
      if (!data.licenseNumber?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["licenseNumber"],
          message: "License number is required for the selected license type",
        });
      }
      if (!data.licenseState?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["licenseState"],
          message: "License state is required for the selected license type",
        });
      }
    }

    if (data.licenseType === "other") {
      if (!data.licenseFile) {
        ctx.addIssue({
          path: ["licenseFile"],
          message: "License image is required for the selected license type ",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export type BusinessDetailsFormData = z.infer<typeof formSchema>;

// Format date input (MM/DD/YYYY)
const formatDate = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

interface BusinessDetailsStepProps {
  onNext: (data: BusinessDetailsFormData) => void;
  onPrev: () => void;
  initialValues?: Partial<BusinessDetailsFormData>;
}

const BusinessDetailsStep = ({ onNext, onPrev, initialValues }: BusinessDetailsStepProps) => {
  const form = useForm<BusinessDetailsFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      legalNameOfBusiness: "",
      dbaIfApplicable: "",
      einSsnSelection: "",
      einSsnNumber: "",
      dateBusinessStarted: "",
      businessWebsite: "",
      // address defaults
      address: "",
      city: "",
      state: "",
      zipcode: "",
      legalEntity: "",
      stateWhereRegistered: "",
      hasExistedAsOtherEntity: "",
      entity: "",
      // license defaults
      licenseType: "",
      licenseNumber: "",
      licenseState: "",
      licenseFile: undefined,
      ...(initialValues || {}),
    },
  });
  const navigate = useNavigate();
  let applicationStatus: string | null = null;
  let reason: string | null = null;

  useEffect(() => {
    if (initialValues) {
      form.reset({ ...form.getValues(), ...initialValues });
    }
  }, [initialValues, form]);

  const { setMerchantData, saveStepToServer, completeSession, sessionId } = useMerchantData();

  const [einValidationStatus, setEinValidationStatus] = useState<
    "idle" | "checking" | "available" | "exists"
  >("idle");
  const [einError, setEinError] = useState<string>("");
  const [cannabisVerifying, setCannabisVerifying] = useState(false);

  // Auto-save removed - data is now saved only on form submission to reduce server load

  // Debounced EIN/SSN availability check
  useEffect(() => {
    const val = form.watch("einSsnNumber");
    const sel = form.watch("einSsnSelection");
    const timer = setTimeout(async () => {
      if (!val) return;
      if (sel === "ein") {
        setEinValidationStatus("checking");
        setEinError("");
        try {
          const res = await validateEin(val);
          const exists = res?.data?.exists || false;
          if (exists) {
            setEinValidationStatus("exists");
            setEinError(res?.data?.message || "EIN already in use");
          } else {
            setEinValidationStatus("available");
            setEinError("");
          }
        } catch {
          setEinValidationStatus("idle");
          setEinError("Error validating EIN");
        }
      } else if (sel === "ssn") {
        try {
          setEinValidationStatus("checking");
          const res = await apiValidateSSN(val);
          const exists = res?.data?.exists || false;
          if (exists) {
            setEinValidationStatus("exists");
            setEinError(res?.data?.message || "SSN already in use");
          } else {
            setEinValidationStatus("available");
            setEinError("");
          }
        } catch {
          setEinValidationStatus("idle");
          setEinError("Error validating SSN");
        }
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [form.watch("einSsnNumber"), form.watch("einSsnSelection")]);

  // Clear license fields if "Non-Licensed" is selected
  const selectedLicenseType = form.watch("licenseType");
  useEffect(() => {
    if (selectedLicenseType === "none") {
      form.setValue("licenseNumber", "");
      form.setValue("licenseState", "");
      form.setValue("licenseFile", undefined);
    }
  }, [selectedLicenseType, form]);

  // EIN/SSN formatters
  const formatEIN = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}-${digits.slice(2, 9)}`;
  };
  const formatSSN = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
  };

  const onSubmit = async (data: BusinessDetailsFormData) => {
    if (einValidationStatus === "checking") {
      toast.error("Please wait for EIN/SSN validation to complete");
      return;
    }
    if (einValidationStatus === "exists") {
      form.setError("einSsnNumber" as any, {
        type: "manual",
        message: einError || "EIN/SSN is already registered",
      });
      toast.error(einError || "EIN/SSN is already registered");
      return;
    }

    // First, check with server if data has changed (hash comparison)
    try {
      const checkPayload = { ...data, checkOnly: true };
      const checkResponse = await saveStepToServer(1, checkPayload);
      
      // Server response includes: requiresCannabizVerification, requiresEinValidation
      const serverRequiresCannabiz = checkResponse?.data?.requiresCannabizVerification ?? true;
      const serverRequiresEinValidation = checkResponse?.data?.requiresEinValidation ?? true;
      
      console.log('[BusinessDetailsStep] Server verification check:', {
        requiresCannabizVerification: serverRequiresCannabiz,
        requiresEinValidation: serverRequiresEinValidation
      });
      
      // If server says no verification needed (data unchanged), skip to save
      if (!serverRequiresCannabiz && !serverRequiresEinValidation) {
        console.log('[BusinessDetailsStep] No data changes detected, skipping verification');
        toast.success("No changes detected");
        saveBusinessInfoToAPI(data);
        return;
      }
      
      // If EIN validation not needed per server, we can skip EIN re-check
      // (assumes server already validated it before)
      
    } catch (error) {
      console.error('[BusinessDetailsStep] Error checking verification requirements:', error);
      // On error, proceed with verification as fallback
    }

    // Check if license type requires Cannabiz verification
    const requiresCannabizVerification =
      data.licenseType === "cannabis" || data.licenseType === "psilocybin";

    if (requiresCannabizVerification) {
      // Ensure license number and state are present
      setCannabisVerifying(true);
      if (!data.licenseNumber?.trim()) {
        form.setError("licenseNumber" as any, { type: "manual", message: "License number is required" });
        toast.error("License number is required for verification");
        return;
      }
      if (!data.licenseState?.trim() && !data.stateWhereRegistered) {
        form.setError("licenseState" as any, { type: "manual", message: "License state is required" });
        toast.error("License state is required for verification");
        return;
      }


      // Map the selected state value back to a 2-letter code.
      const STATE_ABBR: Record<string, string> = {
        Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA', Colorado: 'CO', Connecticut: 'CT', Delaware: 'DE', 'District of Columbia': 'DC', Florida: 'FL', Georgia: 'GA', Hawaii: 'HI', Idaho: 'ID', Illinois: 'IL', Indiana: 'IN', Iowa: 'IA', Kansas: 'KS', Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD', Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS', Missouri: 'MO', Montana: 'MT', Nebraska: 'NE', Nevada: 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', Ohio: 'OH', Oklahoma: 'OK', Oregon: 'OR', Pennsylvania: 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', Tennessee: 'TN', Texas: 'TX', Utah: 'UT', Vermont: 'VT', Virginia: 'VA', Washington: 'WA', 'West Virginia': 'WV', Wisconsin: 'WI', Wyoming: 'WY'
      };

      // The UI stores states as full name lowercased with underscores; normalize
      const rawState = data.licenseState || data.stateWhereRegistered || '';
      const normalized = rawState.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const stateCode = STATE_ABBR[normalized] || (normalized.slice(0,2) || '').toUpperCase();

      
      try {
        console.log("--Cannabis Liscense payload", data.licenseNumber, stateCode,'USA');
        const resp = await verifyCannabisLicense(data.licenseNumber || '', stateCode, 'USA');
        console.log("--CannabisResponse", resp);
        const licenseInfo = Array.isArray(resp.data) && resp.data.length ? resp.data[0] : null;
        if (!licenseInfo) {
          toast.error('Cannabiz verification returned no license data. Cannot proceed.');
          form.setError('licenseNumber' as any, { type: 'manual', message: 'License could not be verified' });
          return;
        }
        

        const status = (licenseInfo.status || '').toUpperCase();

        if (status === 'ACTIVE') {
          // Verified — proceed
          
          saveBusinessInfoToAPI(data);
        } else {
          //-----check if cannabis liscense verification has failed than the application as Declined

          applicationStatus = "Declined";
          reason = `Cannabis/Psilocybin license verification failed. Status: ${status}`;
          saveBusinessInfoToAPI(data);
        }

      } catch (err: any) {
        console.error('Cannabiz verification error', err);
        const msg = err?.responseText || err?.message || 'License verification failed';
        toast.error(msg);
        form.setError('licenseNumber' as any, { type: 'manual', message: 'License verification failed' });
        return;
      }
    } else {
      // No verification needed, proceed directly
      saveBusinessInfoToAPI(data);
    }
  };

  const saveBusinessInfoToAPI = async (data: BusinessDetailsFormData) => {
    try {
      // Update context state
      setMerchantData((prev) => ({ ...prev, businessInformation: data }));

      //----uploads license image if provided
      if (data.licenseFile && data.licenseFile instanceof File && data.licenseType && data.licenseType !== 'none') {
        console.log('[BusinessDetailsStep] Uploading license file before saving business data...');
        try {
          await uploadLicenseFile(
            sessionId,
            data.licenseFile,
          );
          console.log('[BusinessDetailsStep] License file uploaded successfully');
        } catch (uploadError) {
          console.error('[BusinessDetailsStep] Failed to upload license file:', uploadError);
          toast.error('Failed to upload license file. Please try again.');
          setCannabisVerifying(false);
          throw uploadError;
        }
      }

      const { licenseFile, ...dataWithoutFile } = data;

      const savePayload: any = {
        ...dataWithoutFile,
      };
      if (applicationStatus) {
        savePayload.applicationStatus = applicationStatus;
      }
      if (reason) {
        savePayload.reason = reason;
      }

      // Save to server (step 1 = businessInformation)
      
      const response = await saveStepToServer(1, savePayload);
      console.log("Server step save response", response);
      //----
      //response.data.applicationStatus = "Manual Review";

      setCannabisVerifying(false);

      if (response?.data?.applicationStatus === "Declined") {
        //toast.info("Your application requires manual review. Our team will contact you shortly.");
        completeSession();
        const denialMessage = 'Unfortunately, we are unable to approve your merchant application as there appears to be an issue with the license.  Please contact your account manager.';
        navigate(`/merchant-onboarding-complete?status=denied&message=${encodeURIComponent(denialMessage)}`);
        return;
      }

      else if (response?.data?.applicationStatus === "Manual Review") {
        //completeSession();
        navigate(`/merchant-onboarding-complete?status=review`);
        return;
      }


      toast.success("Business information saved successfully!");
      onNext(data);
    } catch (error) {
      console.error("Error saving business information:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save business information"
      );
    }
  };

  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {/* Business Information */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-ateneoBlue mb-3 sm:mb-4">Business Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {/* Legal name */}
              <FormField
                control={form.control}
                name="legalNameOfBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">Legal Name of Business</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter legal business name" className="text-sm sm:text-base" />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      *Letters, numbers, spaces, and common business punctuation only (- & . , ' ")
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* DBA */}
              <FormField
                control={form.control}
                name="dbaIfApplicable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">DBA (If Applicable)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter DBA name if applicable" className="text-sm sm:text-base" />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      *Letters, numbers, spaces, and common business punctuation only (- & . , ' ")
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* EIN/SSN selection */}
              <FormField
                control={form.control}
                name="einSsnSelection"
                render={({ field }) => (
                  <FormItem className="col-span-1 lg:col-span-2">
                    <FormLabel className="text-sm sm:text-base">Please Select EIN/SSN</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-row space-x-4 sm:space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ein" id="ein-selection" />
                          <FormLabel htmlFor="ein-selection" className="cursor-pointer text-sm sm:text-base">
                            EIN
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ssn" id="ssn-selection" />
                          <FormLabel htmlFor="ssn-selection" className="cursor-pointer text-sm sm:text-base">
                            SSN
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* EIN/SSN number */}
              <FormField
                control={form.control}
                name="einSsnNumber"
                render={({ field }) => {
                  const selectedType = form.watch("einSsnSelection");
                  const isEIN = selectedType === "ein";
                  const isSSN = selectedType === "ssn";
                  return (
                    <FormItem className="col-span-1 lg:col-span-2">
                      <FormLabel className="text-sm sm:text-base">{isEIN ? "EIN Number" : isSSN ? "SSN Number" : "SSN/EIN Number"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            let formatted = e.target.value;
                            if (isEIN) formatted = formatEIN(e.target.value);
                            else if (isSSN) formatted = formatSSN(e.target.value);
                            field.onChange(formatted);
                          }}
                          placeholder={isEIN ? "XX-XXXXXXX" : isSSN ? "XXX-XX-XXXX" : "Select EIN or SSN above"}
                          maxLength={isEIN ? 10 : isSSN ? 11 : undefined}
                          disabled={!selectedType}
                          className="text-sm sm:text-base"
                        />
                      </FormControl>
                      <div className="mt-1">
                        {einValidationStatus === "checking" && (
                          <p className="text-xs sm:text-sm text-yellow-600">Checking EIN/SSN...</p>
                        )}
                        {einValidationStatus === "available" && (
                          <p className="text-xs sm:text-sm text-green-600">EIN/SSN is available</p>
                        )}
                        {einValidationStatus === "exists" && (
                          <p className="text-xs sm:text-sm text-red-600">{einError}</p>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {/* Date started */}
              <FormField
                control={form.control}
                name="dateBusinessStarted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">Date Business Started</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const formatted = formatDate(e.target.value);
                          field.onChange(formatted);
                        }}
                        placeholder="MM/DD/YYYY"
                        maxLength={10}
                        className="text-sm sm:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Website */}
              <FormField
                control={form.control}
                name="businessWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">Business Website</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="example.com" className="text-sm sm:text-base" />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      *(e.g., example.com)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* --------------------------- ADDRESS DETAILS SECTION --------------------------- */}
          <div>
            <h3 className="text-xl font-semibold text-ateneoBlue mb-4">Address Details</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter street address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter city" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* State */}
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
              {/* Zipcode */}
              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="XXXXX or XXXXX-XXXX"
                        maxLength={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Business Entity Section */}
          <div>
            <h3 className="text-xl font-semibold text-ateneoBlue mb-4">Business Entity</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Legal Entity */}
              <FormField
                control={form.control}
                name="legalEntity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legal Entity</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Legal Entity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="corporation">Corporation (including S-Corp and Professional Corp)</SelectItem>
                        <SelectItem value="llc">Limited Liability Corporation (LLC)</SelectItem>
                        <SelectItem value="sole_proprietor">Sole Proprietor</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="not_for_profit">Not-for-profit</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* State where registered */}
              <FormField
                control={form.control}
                name="stateWhereRegistered"
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
              {/* Has existed as other entity */}
              <FormField
                control={form.control}
                name="hasExistedAsOtherEntity"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Has the business ever existed as another corporate entity or name?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-row space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="entity-yes" />
                          <FormLabel htmlFor="entity-yes" className="cursor-pointer">
                            Yes
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="entity-no" />
                          <FormLabel htmlFor="entity-no" className="cursor-pointer">
                            No
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Entity name (conditional) */}
              {form.watch("hasExistedAsOtherEntity") === "yes" && (
                <FormField
                  control={form.control}
                  name="entity"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Entity Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter previous entity name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          {/* --------------------------- LICENSES SECTION --------------------------- */}
          <div>
            <h3 className="text-xl font-semibold text-ateneoBlue mb-4">Licenses</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* LICENSE TYPE — full row */}
              <FormField
                control={form.control}
                name="licenseType"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel>License Type</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val);
                        if (val === "none") {
                          form.setValue("licenseNumber", "");
                          form.setValue("licenseState", "");
                          form.setValue("licenseFile", undefined);
                        }
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LICENSE_TYPES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Show the rest ONLY if licenseType is set and not "none" */}
              {selectedLicenseType && selectedLicenseType !== "none" && (
                <>
                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter license number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="licenseState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
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
                  {selectedLicenseType === 'other' && (
                    <FormField
                    control={form.control}
                    name="licenseFile"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-2">
                        <FormLabel>License</FormLabel>
                        <FormControl>
                          <div
                            className={`mt-1 flex items-center justify-center rounded-md border border-dashed px-4 py-10 text-center ${
                              dragOver ? "bg-blue-50 border-blue-300" : "border-gray-300"
                            }`}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragOver(true);
                            }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setDragOver(false);
                              const file = e.dataTransfer.files?.[0];
                              if (file) field.onChange(file);
                            }}
                          >
                            <div>
                              <div className="text-sm text-gray-700 mb-2">
                                Drop a file here or click to upload
                              </div>
                              <input
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                className="mx-auto block"
                                onChange={(e) => field.onChange(e.target.files?.[0])}
                              />
                              {field.value instanceof File && (
                                <div className="mt-2 text-xs text-gray-600">
                                  Selected: <span className="font-medium">{field.value.name}</span>{" "}
                                  ({Math.round(field.value.size / 1024)} KB)
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="ml-2 h-6 px-2 text-xs"
                                    onClick={() => field.onChange(undefined)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              )}
                              <p className="mt-2 text-xs text-gray-500">
                                Accepted: PDF, JPG, PNG — up to 5MB
                              </p>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  )}

                </>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 order-1 sm:order-2"
              disabled={einValidationStatus === "checking" || einValidationStatus === "exists" || cannabisVerifying}
            >
              {einValidationStatus === "checking" ? "Validating..." : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BusinessDetailsStep;
