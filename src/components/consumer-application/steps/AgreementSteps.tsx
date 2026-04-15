import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { postCompleteRegistration, uploadConsumerAgreementDocuments, saveConsumerOnboardingStep, icHardBureauPull } from "@/lib/api";
import { API_BASE } from "@/config/app";
import type { ConsumerApplicationData } from "../types";
import { toast as sonnerToast } from "sonner";
import SignaturePad from "react-signature-canvas";
import { useRef, useState } from "react";
import { generateConsumerAgreementPdfs } from "@/lib/pdfGenerator";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle } from "lucide-react";

function buildPayload(
  data: ConsumerApplicationData,
  agreement: AgreementFormData
) {
  return {
    ssnLast4: data.signUp?.ssn || data.bank?.socialSecurity,
    physicalAddress: data.bank?.physicalAddress,
    city: data.bank?.city,
    state: data.bank?.state,
    zipCode: data.bank?.zipCode,
    bankInfo: {
      routingNumber: data.bank?.routingNumber,
      accountNumber: data.bank?.accountNumber,
      accountType: data.bank?.accountType,
    },
    // idVerification: {
    //   driverLicenseFront: data.bank?.driverLicenseFront,
    //   driverLicenseBack: data.bank?.driverLicenseBack,
    // },
    declarations: {
      consentToElectronicRecords: true,
      agreeToTermsAndConditions: true,
      receivedPrivacyNotice: true,
      agreeToCardAgreement: true,
      consentToCallOrText: true,
      agreeToFairCreditReporting: true,
    },
    firstName: data.signUp?.firstName,
    lastName: data.signUp?.lastName,
    signature: agreement.signature,
  };
}

const agreementSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  signature: z.string().min(1, "E-Signature is required"),
  termsAccepted: z.boolean().optional().default(true),
  electronicRecords: z.boolean().refine((val) => val === true, {
    message: "You must agree to the electronic records consent",
  }),
  applicationsDisclosures: z.boolean().refine((val) => val === true, {
    message: "You must agree to the account opening disclosures",
  }),
  creditCardAgreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the consumer credit card agreement",
  }),
  financialPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must receive the financial privacy notice",
  }),
  onlineAccountAgreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the JVC Online Privacy Policy",
  }),
  autoDialedCalls: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive autodialed calls",
  }),
});

export type AgreementFormData = z.infer<typeof agreementSchema>;

interface AgreementStepsProps {
  consumerData: ConsumerApplicationData;
  onNext: (data: AgreementFormData) => void;
  onPrev: () => void;
  initialValues?: Partial<AgreementFormData>;
  sessionId?: string;
}

const AgreementSteps = ({
  consumerData,
  onNext,
  onPrev,
  initialValues,
  sessionId,
}: AgreementStepsProps) => {
  const form = useForm<AgreementFormData>({
    resolver: zodResolver(agreementSchema),
    defaultValues: {
      firstName:
        initialValues?.firstName ?? consumerData.signUp?.firstName ?? "",
      lastName: initialValues?.lastName ?? consumerData.signUp?.lastName ?? "",
      signature: initialValues?.signature ?? "",
      termsAccepted: true,
      electronicRecords: initialValues?.electronicRecords ?? false,
      applicationsDisclosures: initialValues?.applicationsDisclosures ?? false,
      creditCardAgreement: initialValues?.creditCardAgreement ?? false,
      financialPrivacy: initialValues?.financialPrivacy ?? false,
      onlineAccountAgreement: initialValues?.onlineAccountAgreement ?? false,
      autoDialedCalls: initialValues?.autoDialedCalls ?? false,
    },
  });

  const sigPadRef = useRef<SignaturePad>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [pdfProgress, setPdfProgress] = useState({ current: 0, total: 0, documentType: '' });

  const runtimeConfig = (window as any).__RUNTIME_CONFIG__ || { environment: 'production' };
  const isDev = runtimeConfig.environment === 'development';

  const onFormError = () => {
    const values = form.getValues();
    const uncheckedDisclosures = [
      !values.electronicRecords && 'Electronic Records Consent',
      !values.applicationsDisclosures && 'Account Opening Disclosures',
      !values.creditCardAgreement && 'Consumer Credit Card Agreement',
      !values.financialPrivacy && 'Financial Privacy Notice',
      !values.onlineAccountAgreement && 'JVC Online Privacy Policy',
      !values.autoDialedCalls && 'Autodialed Calls Consent',
    ].filter(Boolean) as string[];

    const missingSignature = !values.signature;

    if (uncheckedDisclosures.length > 0 && missingSignature) {
      toast({
        variant: "destructive",
        title: "Incomplete Agreement",
        description: `Please accept all disclosures and provide your e-signature. Missing: ${uncheckedDisclosures.join(', ')}.`,
      });
    } else if (uncheckedDisclosures.length > 0) {
      toast({
        variant: "destructive",
        title: "Incomplete Agreement",
        description: `Please accept the following: ${uncheckedDisclosures.join(', ')}.`,
      });
    } else if (missingSignature) {
      toast({
        variant: "destructive",
        title: "E-Signature Required",
        description: "Please provide your e-signature before submitting.",
      });
    }
  };

  const onSubmit = async (data: AgreementFormData) => {
      if (isDev) console.log("[Agreement] Consumer agreement form data:", data);
      if (isDev) console.log("[Agreement] SessionId received:", sessionId);
      setIsSubmitting(true);
      setUploadModalOpen(true);
      setUploadComplete(false);
      setUploadStatus('Generating documents...');

    try {
      // 1. Run IC Hard Bureau Pull here
      if (!sessionId) {
        throw new Error("Missing sessionId - cannot run credit bureau pull");
      }
      if (isDev) console.log('[AgreementSteps] ====== IC Hard Bureau Pull START ======');
      const bureauResponse = await icHardBureauPull(sessionId);
      if (isDev) console.log('[AgreementSteps] IC Hard Bureau Pull - success:', bureauResponse?.success);
      if (isDev) console.log('[AgreementSteps] IC Hard Bureau Pull - message:', bureauResponse?.message);
      if (isDev) console.log('[AgreementSteps] IC Hard Bureau Pull - data:', bureauResponse?.data);

      if (!bureauResponse?.success) {
        if (isDev) console.warn('[AgreementSteps] IC Hard Bureau Pull returned success=false:', bureauResponse?.message);
        // Call hard adverse action API and log result
        try {
          const { sendHardAdverse } = await import('@/lib/api');
          const userId = consumerData?.signUp?.id ? Number(consumerData.signUp.id) : undefined;
          if (userId) {
            const adversePayload = {
              userId,
              reason: 'Hard bureau pull failed',
              details: bureauResponse?.message || 'Credit verification failed.'
            };
            const adverseResult = await sendHardAdverse(adversePayload);
            if (isDev) console.log('[AdverseAction] Hard adverse action sent:', adverseResult);
          } else {
            if (isDev) console.warn('[AdverseAction] No userId available for hard adverse action');
          }
        } catch (adverseError) {
          if (isDev) console.error('[AdverseAction] Failed to send hard adverse action:', adverseError);
        }
        sonnerToast.error(bureauResponse?.message || 'Credit verification failed.');
        setIsSubmitting(false);
        setUploadModalOpen(false);
        return;
      }

      // TEMPORARY: Treat all decisions (APPROVE, DECLINE, REFER) as APPROVE for testing
      // TODO: Revert this — uncomment the else block below to restore DECLINE/REFER navigation
      const decisionCategory = bureauResponse?.data?.decisionCategory;
      const creditLimit = bureauResponse?.data?.creditLimit;



      if (decisionCategory === 'APPROVE') {
        if (isDev) console.log('[AgreementSteps] ✓ APPROVED - credit limit:', creditLimit);
      } else {
        if (isDev) console.log(`[AgreementSteps] ✗ Decision was "${decisionCategory}" but TEMPORARILY treating as APPROVE for testing`);
        if (isDev) console.log('[AgreementSteps] ✗ Reason codes:', bureauResponse?.data?.reasonCodes);
        if (isDev) console.log('[AgreementSteps] ✗ High risk:', bureauResponse?.data?.highRisk);
        if (isDev) console.log('[AgreementSteps] ✗ Score factors:', bureauResponse?.data?.scoreFactors);
      }

      if (isDev) console.log('[AgreementSteps] ✓ Vantage Score V4:', bureauResponse?.data?.vantageScoreV4);
      if (isDev) console.log('[AgreementSteps] ✓ Transaction ID:', bureauResponse?.data?.transactionId);
      sonnerToast.success('Credit verification passed!');
      // Store credit limit in data for downstream steps
      (data as any).creditLimit = creditLimit;
      if (isDev) console.log('[AgreementSteps] ====== IC Hard Bureau Pull END (proceeding to agreement document upload) ======');

      // 2. Continue with agreement document generation/upload as before
      //Generate PDFs from agreement documents
      console.log('[Agreement] Generating consumer PDF documents...');

      const consumerDataForPdf = {
        personalDetails: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        signUp: consumerData.signUp,
        bank: consumerData.bank,
      };

      const { files, metadata } = await generateConsumerAgreementPdfs(
        consumerDataForPdf,
        data.signature,
        (current, total, docType) => {
          setPdfProgress({ current, total, documentType: docType });
          setUploadStatus(`Uploading documents`);
        }
      );

      console.log(`[Agreement] Generated ${files.length} PDF documents`);
      setUploadStatus('Documents generated successfully!');

      //Upload PDFs to backend
      if (!sessionId) {
        throw new Error("Missing sessionId - cannot upload documents");
      }

      console.log('[Agreement] Uploading documents to server...');
      setUploadStatus('Uploading documents...');

      // Prepare documents array for upload (one file + metadata per entry)
      const documentsToUpload = files.map((file, index) => ({
        file,
        metadata: metadata[index]
      }));

      await uploadConsumerAgreementDocuments(sessionId, documentsToUpload);

      console.log('[Agreement] Documents uploaded successfully');
      setUploadStatus('Documents uploaded successfully!');

      //Save agreements step data to backend
      try {
        const agreementsData = {
          termsAccepted: data.termsAccepted,
          firstName: data.firstName,
          lastName: data.lastName,
          signature: data.signature,
          timestamp: new Date().toISOString(),
          acceptedAgreements: [
            "Consent for Use of Electronic Records and Signatures",
            "Account Opening Disclosures",
            "Consumer Credit Card Agreement",
            "Financial Privacy Notice",
            "JVC Online Privacy Policy",
            "Consent to Receive Autodialed and Prerecorded Calls"
          ],
          fairCreditReportingActAuthorization: true
        };

        console.log("[Agreement] Saving agreements step data:", agreementsData);
        await saveConsumerOnboardingStep('agreements', sessionId, agreementsData);
        console.log("[Agreement] Agreements step data saved successfully");
      } catch (saveError) {
        console.error("[Agreement] Failed to save agreements step:", saveError);
        // Don't block user progression if save fails
      }

      setUploadComplete(true);
      setUploadStatus('Documents uploaded successfully!');

      // 3. Call i2c Add Card endpoint - only after documents are submitted
      // TEMPORARY: Bypass decision check — treat all decisions as APPROVE for testing
      // TODO: Revert this — restore `if (decisionCategory === 'APPROVE')` gate when ready
      if (isDev) console.log('[AgreementSteps] ====== i2c Add Card START ======');
      if (isDev) console.log('[AgreementSteps] Decision category:', decisionCategory);
      if (isDev) console.log('[AgreementSteps] TEMPORARY BYPASS: Treating all decisions as APPROVE for testing');
      try {
        setUploadStatus('Creating your card...');
        if (isDev) console.log('[AgreementSteps] Calling addConsumerCard for sessionId:', sessionId);
        const { addConsumerCard } = await import('@/lib/api');
        const cardResp = await addConsumerCard(sessionId);
        if (isDev) console.log('[AgreementSteps] addConsumerCard response:', cardResp);
        if (isDev) console.log('[AgreementSteps] Card created successfully');
        sonnerToast.success('Card created successfully!');
      } catch (cardError) {
        if (isDev) console.error('[AgreementSteps] Failed to create card:', cardError);
        if (isDev) console.error('[AgreementSteps] Card error details:', (cardError as any)?.responseText || (cardError as any)?.message);
        sonnerToast.error(cardError instanceof Error ? cardError.message : 'Failed to create card');
      }
      if (isDev) console.log('[AgreementSteps] ====== i2c Add Card END ======');

      await new Promise(resolve => setTimeout(resolve, 1500));

      setUploadModalOpen(false);

      toast({
        title: "Success",
        description: "Agreement documents saved successfully",
      });

      // Proceed to next step → navigates to consumer-download-app
      onNext(data);

    } catch (error: any) {
      console.error("[Agreement] Form submission error", error);

      const msg = error?.responseText || error?.message || "Unable to complete consumer registration";

      setUploadModalOpen(false);
      toast({
        variant: "destructive",
        title: "Failed",
        description: msg
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="w-full mx-auto px-4 md:px-12">
        <Separator className="mb-8" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className="space-y-8">
            {/* Declarations and Terms Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Declaration and Consent
              </h2>

              <div>
                Please select and review each disclosure and attached document before application submission.  <ul className="list-disc ml-12">
                  {/* <li className="text-sm">
                    Please select and review each disclosure and attached
                    document before application submission.
                  </li> */}
                  {/* <li className="text-sm">
                    To successfully submit the application each document must be
                    reviewed before clicking the Toggle Button. Incomplete
                    disclosures may cause errors and may not allow successful
                    submission of applications.
                  </li> */}
                </ul>
              </div>

              <div className="space-y-4 mt-10">
                {/* Electronic Records Consent */}
                <FormField
                  control={form.control}
                  name="electronicRecords"
                  render={({ field }) => (
                    <div className="flex items-start justify-between">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mr-4"
                        />
                      </FormControl>
                      <div className="flex-1">
                        <p className="text-sm text-black">
                          You reviewed and agree to this{" "}
                          <a
                            href="/docs/consent-electronic-records/preview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 underline cursor-pointer"
                          >
                            Consent for Use of Electronic Records and Signatures
                          </a>{" "}
                          after verifying you have everything required to view and
                          keep electronic records
                        </p>
                      </div>
                    </div>
                  )}
                />

                {/* Applications Disclosures */}
                <FormField
                  control={form.control}
                  name="applicationsDisclosures"
                  render={({ field }) => (
                    <div className="flex items-start justify-between">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mr-4"
                        />
                      </FormControl>
                      <div className="flex-1">
                        <p className="text-sm text-black">
                          You received and agree to our{" "}
                          <a
                            href="#"
                            onClick={async (e) => {
                              e.preventDefault();
                              try {
                                const res = await fetch(
                                  `${API_BASE.replace(/\/$/, '')}/api/v1/consumer/disclosure/applications/${sessionId}/account-opening-disclosure`
                                );
                                if (!res.ok) {
                                  // Try to parse error JSON if possible
                                  let errorMsg = 'Failed to fetch disclosure';
                                  try {
                                    const errJson = await res.json();
                                    errorMsg = errJson?.message || errorMsg;
                                  } catch {}
                                  throw new Error(errorMsg);
                                }
                                const arrayBuffer = await res.arrayBuffer();
                                const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
                                const url = URL.createObjectURL(blob);
                                // Open PDF in a new tab
                                window.open(url, '_blank');
                                // Clean up the blob URL after a short delay
                                setTimeout(() => {
                                  URL.revokeObjectURL(url);
                                }, 10000);
                              } catch (err) {
                                console.error('Failed to open disclosure:', err);
                                toast({ variant: 'destructive', title: 'Error', description: err?.message || 'Unable to open disclosure document' });
                              }
                            }}
                            className="text-pink-600 underline cursor-pointer"
                          >
                            Account Opening Disclosures
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                />

                {/* Consumer Credit Card Agreement */}
                <FormField
                  control={form.control}
                  name="creditCardAgreement"
                  render={({ field }) => (
                    <div className="flex items-start justify-between">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mr-4"
                        />
                      </FormControl>
                      <div className="flex-1">
                        <p className="text-sm text-black">
                          You received and agree to our{" "}
                          <a
                            href="/docs/credit-card-agreement/preview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 underline cursor-pointer"
                          >
                            Consumer Credit Card Agreement
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                />

                {/* Financial Privacy Notice */}
                <FormField
                  control={form.control}
                  name="financialPrivacy"
                  render={({ field }) => (
                    <div className="flex items-start justify-between">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mr-4"
                        />
                      </FormControl>
                      <div className="flex-1">
                        <p className="text-sm text-black">
                          You received our{" "}
                          <a
                            href="/docs/financial-privacy-notice/preview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-700 underline cursor-pointer"
                          >
                            Financial Privacy Notice
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                />

                {/* JVC Online Privacy Policy */}
                <FormField
                  control={form.control}
                  name="onlineAccountAgreement"
                  render={({ field }) => (
                    <div className="flex items-start justify-between">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mr-4"
                        />
                      </FormControl>
                      <div className="flex-1">
                        <p className="text-sm text-black">
                          You received and agree to our{" "}
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
                  )}
                />

                {/* Auto-dialed Calls Consent */}
                <FormField
                  control={form.control}
                  name="autoDialedCalls"
                  render={({ field }) => (
                    <div className="flex items-start justify-between">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mr-4"
                        />
                      </FormControl>
                      <div className="flex-1">
                        <p className="text-sm text-black">
                          I consent to receive autodialed and prerecorded/artificial
                          calls, including texts, relating to my relationship with
                          Joint Venture Card (JVC) (which includes merchant
                          handling, and business activities relating to any of my
                          accounts). Message and Data rates may apply. You can stop
                          these types of messages by replying STOP in response to a
                          text message, or by following any other instructions
                          contained in the time-sensitive call
                        </p>
                      </div>
                    </div>
                  )}
                />

                {/* Sixth checkbox removed as requested by client - content already stated in paragraph */}

                <p className="mt-8 text-sm">
                  You understand by clicking on the SUBMIT button immediately
                  following your e-signature, you are providing 'written
                  instructions' to JVC under the Fair Credit Reporting Act
                  authorizing JVC to obtain your personal credit information,
                  employment and income history from Experian and other credit
                  reporting agencies. You authorize JVC to obtain such
                  information solely to evaluate your application for credit and
                  to confirm your identity to avoid fraudulent transactions in
                  your name.
                </p>
              </div>
            </div>

            {/* Account Terms Section */}
            <div className="">
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
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
                              }}
                            />
                            <Button
                              type="button"
                              onClick={() => {
                                sigPadRef.current?.clear();
                                field.onChange("");
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
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                type="button"
                onClick={onPrev}
                variant="outline"
                className="order-2 sm:order-1"
                disabled={isSubmitting}
              >
                Previous
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white order-1 sm:order-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "I Agree"}
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
                  {pdfProgress.total > 0 && (
                    <p className="text-xs text-gray-400 mt-2">
                      Document {pdfProgress.current} of {pdfProgress.total}
                    </p>
                  )}
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
                    Proceeding to next step...
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
export type { AgreementStepsProps };
