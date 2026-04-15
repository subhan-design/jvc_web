import React, { useEffect, useState, useRef, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Separator } from "@/components/ui/separator";
import { US_STATES } from "@/data/us-states";
import { toast } from "sonner";
import { useMerchantData } from "@/context/MerchantDataContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { validateSSN as apiValidateSSN} from "@/lib/api";

/* ---------------- helpers ---------------- */
const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
};
const formatSSN = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length <= 3) return d;
  if (d.length <= 5) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5, 9)}`;
};

const maskSSN = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length <= 3) return '*'.repeat(d.length);
  if (d.length <= 5) return `***-${'*'.repeat(d.length - 3)}`;
  return `***-**-${d.slice(5, 9)}`;
};

const formatDateOfBirth = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4, 8)}`;
};

// Masked SSN Input Component
const MaskedSSNInput = React.forwardRef<HTMLInputElement, {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}>(({ value, onChange, disabled, className }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Combine refs
  React.useImperativeHandle(ref, () => inputRef.current!);

  const displayValue = isFocused ? value : maskSSN(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatSSN(e.target.value);
    onChange(newValue);
  };

  return (
    <Input
      ref={inputRef}
      value={displayValue}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder="XXX-XX-XXXX"
      maxLength={11}
      disabled={disabled}
      className={className}
      autoComplete="off"
    />
  );
});

MaskedSSNInput.displayName = 'MaskedSSNInput';

// Only these fields are locked when data comes from personal
const LOCKED_FIELDS = new Set([
  "firstName",
  "lastName",
  //"ssn",
  "dateOfBirth",
  "title",
  "telephoneNumber",
  "email",
]);

const isLockedField = (lockedRow: boolean, field: string) =>
  lockedRow && LOCKED_FIELDS.has(field);

const lockClsIf = (cond: boolean) => (cond ? "bg-gray-100 cursor-not-allowed" : "");
/* ---------------- schema ---------------- */
const ownerSchema = z.object({
  owners: z.array(
    z.object({
      firstName: z.string().min(1, "Please enter first name"),
      lastName: z.string().min(1, "Please enter last name"),
      // SSN is optional but if provided, must be valid format
      ssn: z.string().optional()
        .refine((val) => {
          // If empty/undefined, that's OK
          if (!val || val.trim() === "") return true;
          // If provided, must match format
          return /^\d{3}-\d{2}-\d{4}$/.test(val);
        }, "SSN must be in format XXX-XX-XXXX")
        .refine((val) => {
          if (!val || val.trim() === "") return true;
          return val.replace(/-/g, "").length === 9;
        }, "SSN must be exactly 9 digits"),
      dateOfBirth: z
        .string()
        .min(1, "Please enter date of birth")
        .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date of Birth must be in format MM/DD/YYYY")
        .refine((val) => {
          const [month, day, year] = val.split('/').map(Number);
          const birthDate = new Date(year, month - 1, day);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();

          const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

          return actualAge >= 18;
        }, "Owner must be at least 18 years old"),
      title: z.string().optional(),
      telephoneNumber: z.string().min(1, "Please enter telephone number"),
      email: z.string().min(1, "Please enter email").email("Please enter a valid email"),
      homeAddress: z.string().min(1, "Please enter address"),
      address2: z.string().optional(),
      city: z.string().min(1, "Please enter city"),
      state: z.string().min(1, "Please select state"),
      zipCode: z.string().min(1, "Please enter zip code"),
      hasOwnershipInterest: z.string().optional(),
      ownershipPercentage: z.string()
        .min(1, "Ownership percentage is required")
        .refine((val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num >= 0 && num <= 100;
        }, "Ownership percentage must be between 0 and 100"),
      lockedFromPersonal: z.boolean().optional(), // UI-only flag
      ownerIntent: z.string().min(1, "Please select an option"),
    })
  ),
})
.superRefine((data, ctx) => {
  // Validate SSN is required for owners with 25%+ ownership
  data.owners.forEach((owner, index) => {
    const ownershipPct = parseFloat(owner.ownershipPercentage || "0");
    const hasSignificantOwnership = ownershipPct >= 25;
    
    if (hasSignificantOwnership && (!owner.ssn || owner.ssn.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SSN is required for owners with 25% or more ownership",
        path: ["owners", index, "ssn"],
      });
    }
  });
})
.superRefine((data, ctx) => {
  const ssnMap = new Map<string, number>();
  const phoneMap = new Map<string, number>();
  const emailMap = new Map<string, number>();

  data.owners.forEach((owner, index) => {

    const ssn = owner.ssn?.replace(/\D/g, "");
    if (ssn) {
      if (ssnMap.has(ssn)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "SSN must be unique",
          path: ["owners", index, "ssn"],
        });
      } else {
        ssnMap.set(ssn, index);
      }
    }

    const phone = owner.telephoneNumber?.replace(/\D/g, "");
    if (phone) {
      if (phoneMap.has(phone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Telephone number must be unique",
          path: ["owners", index, "telephoneNumber"],
        });
      } else {
        phoneMap.set(phone, index);
      }
    }

    const email = owner.email?.toLowerCase();
    if (email) {
      if (emailMap.has(email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email address must be unique",
          path: ["owners", index, "email"],
        });
      } else {
        emailMap.set(email, index);
      }
    }
  });
});

export type OwnerFormData = z.infer<typeof ownerSchema>;

/* ---------------- OwnerRow Component ---------------- */
interface OwnerRowProps {
  idx: number;
  form: ReturnType<typeof useForm<OwnerFormData>>;
  handleAddOwner: () => void;
  remove: (index: number) => void;
}

const OwnerRow = ({ idx, form, handleAddOwner, remove }: OwnerRowProps) => {
  // Row is considered "locked" if it originated from personal (primary owner row)
  const lockedRow = !!form.watch(`owners.${idx}.lockedFromPersonal`);

  console.groupCollapsed(`OwnerRow: render idx=${idx} lockedRow=${lockedRow}`);
  try {
    console.log("row data:", form.getValues(`owners.${idx}` as const));
  } catch {}
  console.groupEnd();

  return (
    <div className="relative rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <FormField
          control={form.control}
          name={`owners.${idx}.firstName`}
          render={({ field }) => {
            const isLocked = isLockedField(lockedRow, "firstName");
            return (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLocked} className={lockClsIf(isLocked)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name={`owners.${idx}.lastName`}
          render={({ field }) => {
            const isLocked = isLockedField(lockedRow, "lastName");
            return (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLocked} className={lockClsIf(isLocked)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Ownership Percentage */}
        <FormField
          control={form.control}
          name={`owners.${idx}.ownershipPercentage`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ownership Percentage (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="e.g., 25"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SSN - Only show for owners with 25%+ ownership */}
        {(() => {
          const ownershipPct = parseFloat(form.watch(`owners.${idx}.ownershipPercentage`) || "0");
          const hasSignificantOwnership = ownershipPct >= 25;
          
          if (!hasSignificantOwnership) return null;
          
          const isLocked = isLockedField(lockedRow, "ssn");
          
          return (
            <FormField
              control={form.control}
              name={`owners.${idx}.ssn`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Security No. <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <MaskedSSNInput
                      value={field.value || ''}
                      onChange={field.onChange}
                      disabled={isLocked}
                      className={lockClsIf(isLocked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })()}

        {/* Date of Birth */}
        <FormField
          control={form.control}
          name={`owners.${idx}.dateOfBirth`}
          render={({ field }) => {
            const isLocked = isLockedField(lockedRow, "dateOfBirth");
            return (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      const formatted = formatDateOfBirth(e.target.value);
                      field.onChange(formatted);
                    }}
                    placeholder="MM/DD/YYYY"
                    maxLength={10}
                    disabled={isLocked}
                    className={lockClsIf(isLocked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name={`owners.${idx}.telephoneNumber`}
          render={({ field }) => {
            const isLocked = isLockedField(lockedRow, "telephoneNumber");
            return (
              <FormItem>
                <FormLabel>Telephone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(formatPhone(e.target.value))}
                    placeholder="(555) 123-4567"
                    disabled={isLocked}
                    className={lockClsIf(isLocked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name={`owners.${idx}.email`}
          render={({ field }) => {
            const isLocked = isLockedField(lockedRow, "email");
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} disabled={isLocked} className={lockClsIf(isLocked)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Address (✅ always editable) */}
        <FormField
          control={form.control}
          name={`owners.${idx}.homeAddress`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`owners.${idx}.address2`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address 2</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`owners.${idx}.city`}
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
          name={`owners.${idx}.state`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`owners.${idx}.zipCode`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={`owners.${idx}.ownerIntent`}
        render={({ field }) => (
          <FormItem className="mt-6">
            <FormLabel>
              Are there any other beneficial owners who own more than 25%?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value === "yes") {
                    const currentOwners = form.getValues("owners");
                    const nextOwnerExists = currentOwners[idx + 1];
                    if (!nextOwnerExists) {
                      handleAddOwner();
                    }
                  }
                  if (value === "no") {
                    const currentOwners = form.getValues("owners");
                    const nextOwnerExists = currentOwners[idx + 1];
                    if (nextOwnerExists) {
                      remove(idx + 1);
                    }
                  }
                }}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id={`owner-${idx}-intent-yes`} />
                  <FormLabel htmlFor={`owner-${idx}-intent-yes`} className="cursor-pointer">Yes</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`owner-${idx}-intent-no`} />
                  <FormLabel htmlFor={`owner-${idx}-intent-no`} className="cursor-pointer">No</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Hide remove button for the locked primary row only */}
      {!lockedRow && (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              console.log("OwnerRow: remove idx", idx);
              remove(idx);
            }}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

interface OwnerStepsProps {
  onNext: (data: OwnerFormData) => void;
  onPrev: () => void;
  initialValues?: Partial<OwnerFormData>;
  personalDetails?: {
    ownerIntent?: string; // "yes" | "no"
    title?: string;
    firstName?: string;
    lastName?: string;
    socialSecurityNumber?: string;
    dob?: string;
    phone?: string;
    email?: string;
    primaryPhysicalAddress1?: string;
    primaryPhysicalAddress2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}

const OwnerSteps = ({ initialValues, onNext, onPrev, personalDetails }: OwnerStepsProps) => {
  const { setMerchantData, saveStepToServer } = useMerchantData();
  //TODO: uncomment SSN validation if ssn must be unique
  // const [ssnValidationStatus, setSsnValidationStatus] = useState<"idle" | "checking" | "available" | "exists">("idle");
  // const [ssnError, setSsnError] = useState<string>("");

  const ownerIntent = (personalDetails?.ownerIntent || "").toLowerCase();
  const isLockedFromPersonal = ownerIntent === "yes";
  const MAX_BENEFICIARIES = 4;

  // debug: mount
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      console.group("OwnerSteps: mount");
      console.log("personalDetails:", personalDetails);
      console.log("initialValues:", initialValues);
      console.log("ownerIntent:", ownerIntent);
      console.log("isLockedFromPersonal:", isLockedFromPersonal);
      console.groupEnd();
      mounted.current = true;
    }
  }, [initialValues, personalDetails, ownerIntent, isLockedFromPersonal]);

  console.groupCollapsed(`OwnerSteps: render (locked=${isLockedFromPersonal})`);
  console.log("initialValues?.owners?.length:", initialValues?.owners?.length ?? 0);
  console.groupEnd();

  const baseOwner = {
    firstName: "",
    lastName: "",
    ownershipPercentage: "",
    ssn: "",
    dateOfBirth: "",
    title: "",
    telephoneNumber: "",
    email: "",
    homeAddress: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    hasOwnershipInterest: "",
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

  const prefilledOwner =
    isLockedFromPersonal
      ? {
          ...baseOwner,
          firstName: personalDetails?.firstName || "",
          lastName: personalDetails?.lastName || "",
          ssn: personalDetails?.socialSecurityNumber || "",
          dateOfBirth: personalDetails?.dob || "",
          title: personalDetails?.title || "",
          telephoneNumber: personalDetails?.phone || "",
          email: personalDetails?.email || "",
          homeAddress: personalDetails?.primaryPhysicalAddress1 || "",
          address2: personalDetails?.primaryPhysicalAddress2 || "",
          city: personalDetails?.city || "",
          state: personalDetails?.state || "",
          zipCode: personalDetails?.zipCode || "",
          ownershipPercentage: "25", // Default to 25% since they said "yes" to 25%+ ownership
          lockedFromPersonal: true,
        }
      : baseOwner;

  const form = useForm<OwnerFormData>({
    resolver: zodResolver(ownerSchema),
    mode: "onChange",
    defaultValues: {
      owners:
        initialValues?.owners?.length
          ? initialValues.owners
          : isLockedFromPersonal
          ? [prefilledOwner]
          : [],
    },
  });

  // const watchedSSN = form.watch("owners.0.ssn");
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "owners" });

  // useEffect(() => {
  //   if (!watchedSSN) return;

  //   const timer = setTimeout(() => {
  //     validateSSN(watchedSSN);
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [watchedSSN, validateSSN]);

  // debug: owners each render
  console.groupCollapsed("OwnerSteps: owners snapshot (render)");
  try {
    console.log("owners:", form.getValues("owners"));
  } catch (e) {
    console.warn("Could not read owners on render:", e);
  }
  console.groupEnd();

  // Reset when initialValues / intent changes
  useEffect(() => {
    console.group("OwnerSteps: reset effect");
    console.log("isLockedFromPersonal:", isLockedFromPersonal);
    console.log("initialValues.owners.length:", initialValues?.owners?.length ?? 0);

    if (initialValues?.owners?.length) {
      console.log("-> reset to initialValues");
      form.reset({ owners: initialValues.owners });
    } else if (isLockedFromPersonal) {
      const current = form.getValues("owners") ?? [];
      if (!current.length || !current[0]?.lockedFromPersonal) {
        console.log("-> reset to [prefilledOwner]");
        form.reset({ owners: [prefilledOwner] });
      }
    } else {
      const current = form.getValues("owners") ?? [];
      if (current.length !== 0) {
        console.log("-> reset to []");
        form.reset({ owners: [] });
      }
    }
    console.groupEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, isLockedFromPersonal]);

  // Auto-save removed - data is now saved only on form submission to reduce server load

  // Unmount persistence removed - server-side persistence only

  const additionalOwnersCount = () => {
    const total = form.getValues("owners")?.length ?? 0;
    return total - (isLockedFromPersonal ? 1 : 0);
  };

  const handleAddOwner = () => {
    const count = additionalOwnersCount();
    console.group("OwnerSteps: handleAddOwner");
    console.log("current additional owners:", count, "max:", MAX_BENEFICIARIES);
    if (count >= MAX_BENEFICIARIES) {
      console.log("-> blocked (reached max)");
      toast.error(`You can add up to ${MAX_BENEFICIARIES} beneficiaries.`);
      console.groupEnd();
      return;
    }
    const newOwner = { ...baseOwner };
    console.log("-> append owner:", newOwner);
    console.groupEnd();
    append(newOwner);
  };

  const submitAndPersist = async (data: OwnerFormData) => {
    console.group("OwnerSteps: submit");
    console.log("isLockedFromPersonal:", isLockedFromPersonal);
    console.log("submit payload:", data);
    console.groupEnd();
    try {
      // First, check with server if data has changed (hash comparison)
      const checkPayload = { ...data, checkOnly: true };
      const checkResponse = await saveStepToServer(2, checkPayload);
      
      console.log('[OwnerSteps] Server verification check:', checkResponse?.data);
      
      // If server says no changes, inform user
      if (checkResponse?.data?.dataChanged === false) {
        console.log('[OwnerSteps] No data changes detected');
        toast.success("No changes detected");
      }
      
      // Update context state
      setMerchantData((prev) => ({ ...prev, ownership: data }));

      // Save to server (step 2 = ownership)
      await saveStepToServer(2, data);

      toast.success("Owner information saved!");
      onNext(data);
    } catch (e) {
      console.error("OwnerSteps: submit error", e);
      toast.error("Failed to save owner information");
    }
  };

  /* ---------- UI row ---------- */
  // const OwnerRow = ({ idx }: { idx: number }) => {
  //   const locked = !!form.watch(`owners.${idx}.lockedFromPersonal`);
  //   const lockCls = locked ? "bg-gray-100 cursor-not-allowed" : "";

  //   console.groupCollapsed(`OwnerRow: render idx=${idx} locked=${locked}`);
  //   try {
  //     console.log("row data:", form.getValues(`owners.${idx}` as const));
  //   } catch {}
  //   console.groupEnd();

  //   return (
  //     <div className="relative rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.firstName`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>First Name</FormLabel>
  //               <FormControl>
  //                 <Input {...field} disabled={locked} className={lockCls} />
  //               </FormControl>
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.lastName`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Last Name</FormLabel>
  //               <FormControl>
  //                 <Input {...field} disabled={locked} className={lockCls} />
  //               </FormControl>
  //             </FormItem>
  //           )}
  //         />

  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.ssn`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Social Security No.</FormLabel>
  //               <FormControl>
  //                 <Input
  //                   {...field}
  //                   onChange={(e) => field.onChange(formatSSN(e.target.value))}
  //                   placeholder="XXX-XX-XXXX"
  //                   maxLength={11}
  //                   disabled={locked}
  //                   className={lockCls}
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.dateOfBirth`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Date of Birth</FormLabel>
  //               <FormControl>
  //                 <Input type="date" {...field} disabled={locked} className={lockCls} />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />

  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.title`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Title</FormLabel>
  //               <FormControl>
  //                 <Input {...field} disabled={locked} className={lockCls} />
  //               </FormControl>
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.telephoneNumber`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Telephone Number</FormLabel>
  //               <FormControl>
  //                 <Input
  //                   {...field}
  //                   onChange={(e) => field.onChange(formatPhone(e.target.value))}
  //                   placeholder="(555) 123-4567"
  //                   disabled={locked}
  //                   className={lockCls}
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />

  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.email`}
  //           render={({ field }) => (
  //             <FormItem className="md:col-span-2">
  //               <FormLabel>Email</FormLabel>
  //               <FormControl>
  //                 <Input type="email" {...field} disabled={locked} className={lockCls} />
  //               </FormControl>
  //             </FormItem>
  //           )}
  //         />

  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.homeAddress`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Address</FormLabel>
  //               <FormControl>
  //                 <Input {...field} disabled={locked} className={lockCls} />
  //               </FormControl>
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.address2`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Address 2</FormLabel>
  //               <FormControl>
  //                 <Input {...field} disabled={locked} className={lockCls} />
  //               </FormControl>
  //             </FormItem>
  //           )}
  //         />

  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.city`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>City</FormLabel>
  //               <FormControl>
  //                 <Input {...field} disabled={locked} className={lockCls} />
  //               </FormControl>
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.state`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>State</FormLabel>
  //               <FormControl>
  //                 <Select onValueChange={field.onChange} value={field.value} disabled={locked}>
  //                   <SelectTrigger className={lockCls}>
  //                     <SelectValue placeholder="State" />
  //                   </SelectTrigger>
  //                   <SelectContent>
  //                     {US_STATES.map((s) => (
  //                       <SelectItem key={s} value={s}>
  //                         {s}
  //                       </SelectItem>
  //                     ))}
  //                   </SelectContent>
  //                 </Select>
  //               </FormControl>
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name={`owners.${idx}.zipCode`}
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Zip Code</FormLabel>
  //               <FormControl>
  //                 <Input {...field} disabled={locked} className={lockCls} />
  //               </FormControl>
  //             </FormItem>
  //           )}
  //         />
  //       </div>

  //       {!locked && (
  //         <div className="mt-4 flex justify-end">
  //           <Button
  //             type="button"
  //             variant="outline"
  //             onClick={() => {
  //               console.log("OwnerRow: remove idx", idx);
  //               remove(idx);
  //             }}
  //             className="text-red-600 border-red-200 hover:bg-red-50"
  //           >
  //             Remove
  //           </Button>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div className="bg-white">
      <div className="w-full mx-auto px-4 md:px-8 lg:px-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitAndPersist)} className="space-y-8">
            {isLockedFromPersonal ? (
              <>
                {/* PRIMARY OWNER — separate section */}
                <h3 className="text-[15px] font-semibold text-gray-900">Business Owner Information</h3>
                {fields[0] && <OwnerRow idx={0} form={form} handleAddOwner={handleAddOwner} remove={remove} />}

                {/* Add beneficiaries card */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 text-center py-12">
                  <h4 className="text-[15px] font-semibold text-gray-900 mb-1">
                    Beneficial Business Owner
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Does any other owner have a 25% or more ownership percentage?
                  </p>
                  <Button type="button" variant="outline" disabled={fields.length >= 1} onClick={handleAddOwner}>
                    + Add Owner
                  </Button>
                </div>

                {/* Additional owners ONLY (start at index 1) */}
                {fields.slice(1).map((f, i) => (
                  <div key={f.id}>
                    <Separator className="my-6" />
                    <h4 className="text-[14px] font-semibold text-gray-900 mb-2">
                      Beneficial Business Owner #{i + 2}
                    </h4>
                    <OwnerRow idx={i + 1} form={form} handleAddOwner={handleAddOwner} remove={remove} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* No primary lock → show card until user adds */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 text-center py-12">
                  <h4 className="text-[15px] font-semibold text-gray-900 mb-1">
                    Beneficial Business Owner
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Does any other owner have a 25% or more ownership percentage?
                  </p>
                  <Button type="button" variant="outline" disabled={fields.length >= 1} onClick={handleAddOwner}>
                    + Add Owner
                  </Button>
                </div>

                {fields.length > 0 &&
                  fields.map((f, idx) => (
                    <div key={f.id}>
                      {idx === 0 && <Separator className="my-6" />}
                      <h4 className="text-[14px] font-semibold text-gray-900 mb-2">
                        Beneficial Business Owner #{idx + 1}
                      </h4>
                      <OwnerRow idx={idx} form={form} handleAddOwner={handleAddOwner} remove={remove} />
                    </div>
                  ))}
              </>
            )}

            {/* Prev / Next */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                onClick={onPrev}
                variant="outline"
                className="order-2 sm:order-1"
              >
                Previous
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white order-1 sm:order-2">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OwnerSteps;
