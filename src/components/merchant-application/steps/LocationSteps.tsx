import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Upload, Trash2 } from "lucide-react";
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
import { US_STATES } from "@/data/us-states";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useMerchantData } from "@/context/MerchantDataContext";

const LICENSED_BUSINESS_TYPES = [
  "Cannabis related business",
  "Psilocybin related business",
];

const formSchema = z
  .object({
    // Primary Business Address
    primaryPhysicalAddress1: z.string().min(1, "Primary address Line 1 is required"),
    primaryPhysicalAddress2: z.string().optional(),
    city: z.string()
      .min(1, "City is required")
      .regex(/^[a-zA-Z\s\-\.\']+$/, "City name can only contain letters, spaces, hyphens, periods, and apostrophes"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string()
      .min(1, "Zip code is required")
      .regex(/^\d{5}(-\d{4})?$/, "Zip code must be in format XXXXX or XXXXX-XXXX"),
    
    // Type of Business
    typeOfBusiness: z.string().min(1, "Type of business is required"),
    
    // State Licenses - Dynamic array (optional for non-licensed businesses)
    stateLicenses: z.array(
      z.object({
        state: z.string().optional(),
        licenseNumber: z.string().optional(),
        licenseFile: z.any().optional(),
      })
    ).max(50, "Maximum 50 license entries allowed").optional(),
  })
  .superRefine((data, ctx) => {
    // For licensed businesses (cannabis/psilocybin), require at least one license
    if (LICENSED_BUSINESS_TYPES.includes(data.typeOfBusiness)) {
      if (!data.stateLicenses || data.stateLicenses.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stateLicenses"],
          message: "At least one state license is required for licensed businesses.",
        });
      }
      
      // For licensed businesses, validate each license entry
      if (data.stateLicenses && data.stateLicenses.length > 0) {
        data.stateLicenses.forEach((license, index) => {
          if (!license.state) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["stateLicenses", index, "state"],
              message: "State is required for licensed businesses",
            });
          }
          if (!license.licenseNumber) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["stateLicenses", index, "licenseNumber"], 
              message: "License number is required for licensed businesses",
            });
          }
          if (!license.licenseFile) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["stateLicenses", index, "licenseFile"],
              message: "License file is required for licensed businesses",
            });
          }
        });
      }
    }
    
    // Prevent duplicate states in license entries
    if (data.stateLicenses && data.stateLicenses.length > 0) {
      const states = data.stateLicenses
        .filter(license => license.state) // Only check entries with states
        .map((item) => item.state);
      if (new Set(states).size !== states.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stateLicenses"],
          message: "Duplicate states are not allowed in license entries.",
        });
      }
    }
  });

export type LocationStepsFormData = z.infer<typeof formSchema>;

interface LocationStepsProps {
  onNext: (data: LocationStepsFormData) => void;
  onPrev: () => void;
  initialValues?: Partial<LocationStepsFormData>;
}

const LocationSteps = ({
  onNext,
  onPrev,
  initialValues,
}: LocationStepsProps) => {
  const form = useForm<LocationStepsFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      primaryPhysicalAddress1: "",
      primaryPhysicalAddress2: "",
      city: "",
      state: "",
      zipCode: "",
      typeOfBusiness: "",
      stateLicenses: [],
      ...(initialValues || {}),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "stateLicenses",
  });

  const { setMerchantData, sessionId } = useMerchantData();
  const [uploadingLicenses, setUploadingLicenses] = useState<Set<string>>(new Set());

  // Watch for business type changes to manage license requirements
  const typeOfBusiness = form.watch("typeOfBusiness");
  const isLicensedBusiness = LICENSED_BUSINESS_TYPES.includes(typeOfBusiness);

  // Effect to handle business type changes
  useEffect(() => {
    if (typeOfBusiness === "Non-licensed business") {
      // For non-licensed businesses, clear all license data
      form.setValue("stateLicenses", []);
    } else if (isLicensedBusiness && fields.length === 0) {
      // For licensed businesses, ensure at least one license row exists
      append({ state: "", licenseNumber: "", licenseFile: null });
    }
  }, [typeOfBusiness, isLicensedBusiness, fields.length, form, append]);

  // Always keep at least one row for licensed businesses
  const handleRemove = (idx: number) => {
    if (fields.length > 1 || !isLicensedBusiness) {
      remove(idx);
    }
  };

  const uploadLicenseFile = async (file: File, licenseNumber: string) => {
    setUploadingLicenses(prev => new Set(prev).add(licenseNumber));
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('License file upload simulated:', { file: file.name, licenseNumber });
      toast.success(`License file uploaded successfully for ${licenseNumber}`);
      return { success: true, fileUrl: `mock://uploaded/${file.name}` };
      
    } catch (error) {
      console.error('Error uploading license file:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload license file');
      throw error;
    } finally {
      setUploadingLicenses(prev => {
        const newSet = new Set(prev);
        newSet.delete(licenseNumber);
        return newSet;
      });
    }
  };

  // Add new license row (up to 50 max)
  const handleAddLicense = () => {
    if (fields.length < 50) {
      append({ state: "", licenseNumber: "", licenseFile: null });
    }
  };

  const onSubmit = (data: LocationStepsFormData) => {
    console.log("LocationSteps onSubmit called with data:", data);
    
    // Additional validation for licensed businesses
    const isLicensedBusiness = LICENSED_BUSINESS_TYPES.includes(data.typeOfBusiness);
    
    // Clean up data based on business type
    const cleanedData = {
      ...data,
      // For non-licensed businesses, ensure stateLicenses is empty or undefined
      stateLicenses: isLicensedBusiness ? data.stateLicenses : [],
    };
    
    if (isLicensedBusiness) {
      console.log("Licensed business detected - performing verification");
      // Here you would implement the verification logic for cannabis/psilocybin businesses
      // For now, we'll just log it
    } else {
      console.log("Non-licensed business - no verification needed");
    }
    
    setMerchantData((prev) => ({ ...prev, locations: cleanedData }));
    onNext(cleanedData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Primary Business Address Section */}
          <div>
            <h3 className="text-xl font-semibold text-ateneoBlue mb-4">
              Primary Business Address
            </h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="primaryPhysicalAddress1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Physical Business Address Line 1</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter address line 1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="primaryPhysicalAddress2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Physical Business Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter address line 2 (optional)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter city" />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        *Letters, spaces, hyphens, periods, and apostrophes only
                      </p>
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {US_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
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
                        <Input {...field} placeholder="XXXXX or XXXXX-XXXX" />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        *Numbers only (5 digits or 5+4 format)
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Type of Business Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Business Type & Licensing
            </h3>
            <div className="space-y-6">
              {/* Type of Business Dropdown */}
              <FormField
                control={form.control}
                name="typeOfBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Type of Business</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type of business" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cannabis related business">
                          Cannabis Related Business
                        </SelectItem>
                        <SelectItem value="Psilocybin related business">
                          Psilocybin Related Business
                        </SelectItem>
                        <SelectItem value="Non-licensed business">
                          Non-Licensed Business
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    {field.value && LICENSED_BUSINESS_TYPES.includes(field.value) && (
                      <p className="text-sm text-amber-600 mt-1">
                        ⚠️ This business type requires license verification
                      </p>
                    )}
                    {field.value === "Non-licensed business" && (
                      <p className="text-sm text-green-600 mt-1">
                        ✓ No license verification required for this business type
                      </p>
                    )}
                  </FormItem>
                )}
              />
              
              {/* License Information Table - Only show for licensed businesses */}
              {isLicensedBusiness && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-base font-semibold">License Information</h4>
                    <span className="text-sm text-gray-500">
                      {fields.length}/50 entries
                    </span>
                  </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                            State
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                            License Number
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                            License File
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {fields.map((item, idx) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            {/* State Dropdown */}
                            <td className="px-4 py-3 border-r">
                              <FormField
                                control={form.control}
                                name={`stateLicenses.${idx}.state`}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select State" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {US_STATES.map((state) => (
                                          <SelectItem key={state} value={state}>
                                            {state}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </td>
                            
                            {/* License Number Input */}
                            <td className="px-4 py-3 border-r">
                              <FormField
                                control={form.control}
                                name={`stateLicenses.${idx}.licenseNumber`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter license number"
                                        className="w-full"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </td>
                            
                            {/* License File Upload */}
                            <td className="px-4 py-3 border-r">
                              <FormField
                                control={form.control}
                                name={`stateLicenses.${idx}.licenseFile`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          type="file"
                                          accept=".pdf,.jpg,.jpeg,.png"
                                          onChange={async (e) => {
                                            const file = e.target.files?.[0] || null;
                                            field.onChange(file);
                                            
                                            // Auto-upload file if selected and license number exists
                                            const currentLicenseNumber = form.getValues(`stateLicenses.${idx}.licenseNumber`);
                                            if (file && currentLicenseNumber) {
                                              try {
                                                await uploadLicenseFile(file, currentLicenseNumber);
                                              } catch (error) {
                                                // Error already handled in uploadLicenseFile
                                                console.error('Upload failed:', error);
                                              }
                                            } else if (file && !currentLicenseNumber) {
                                              toast.warning('Please enter license number first to upload file');
                                            }
                                          }}
                                          disabled={uploadingLicenses.has(form.getValues(`stateLicenses.${idx}.licenseNumber`) || '')}
                                          className="w-full file:mr-2 file:px-3 file:py-1 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {uploadingLicenses.has(form.getValues(`stateLicenses.${idx}.licenseNumber`) || '') ? (
                                          <div className="absolute right-3 top-2.5 h-4 w-4 animate-spin border-2 border-blue-600 border-t-transparent rounded-full" />
                                        ) : (
                                          <Upload className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                        )}
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </td>
                            
                            {/* Remove Button */}
                            <td className="px-4 py-3 text-center">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemove(idx)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                disabled={fields.length === 1 && isLicensedBusiness}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Add License Button */}
                <div className="mt-3 flex justify-between items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddLicense}
                    disabled={fields.length >= 50}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Add License Entry ({fields.length}/50)
                  </Button>
                  
                  {fields.length >= 50 && (
                    <p className="text-sm text-red-600">Maximum 50 license entries allowed</p>
                  )}
                </div>
                
                {/* Form-level license errors */}
                {form.formState.errors.stateLicenses && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">
                      {Array.isArray(form.formState.errors.stateLicenses) 
                        ? "Please fix the errors in the license entries above"
                        : form.formState.errors.stateLicenses.message
                      }
                    </p>
                  </div>
                )}
              </div>
              )}

              {/* Message for non-licensed businesses */}
              {typeOfBusiness === "Non-licensed business" && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-700">
                    ✓ No license information is required for non-licensed businesses.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex pt-4 gap-2">
            <Button type="button" variant="outline" onClick={onPrev}>
              Previous
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LocationSteps;
