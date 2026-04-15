import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMerchantData } from "@/context/MerchantDataContext";
import type { MerchantSignupData } from "../types";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { runEntityVerification } from '@/lib/verification';
import { toast } from "@/components/ui/use-toast";
import { submitOnboardingSession, saveOnboardingStep, accurintEvaluateBusiness, getOnboardingSession } from "@/lib/api";

//Additional Information Component for location and amount
interface AdditionalInformationProps {
  merchantData: MerchantSignupData;
}

const AdditionalInformation = ({
  merchantData,
}: AdditionalInformationProps) => {
  const navigate = useNavigate();
  const {
    merchantData: contextMerchantData,
    sessionId,
    numericSessionId,
    completeSession,
    setMerchantData,
  } = useMerchantData();

  const [numberOfLocations, setNumberOfLocations] = useState<string>("");
  const [averageTransactionAmount, setAverageTransactionAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('[AdditionalInformation] Mounted');
    console.log('[AdditionalInformation] SessionId:', sessionId);
    console.log('[AdditionalInformation] MerchantData:', contextMerchantData);

    //---if merchantData is empty, fetch it from the server
    const loadSessionData = async () => {
      if (sessionId && (!contextMerchantData || Object.keys(contextMerchantData).length === 0 || !contextMerchantData.businessInformation)) {
        try {
          console.log('[AdditionalInformation] Context merchant data is empty, fetching from server...');
          const sessionData = await getOnboardingSession(sessionId);

          if (sessionData?.data) {
            console.log('[AdditionalInformation] Loaded session data from server:', sessionData.data);

            //---update the context with the fetched data
            const fetchedMerchantData: MerchantSignupData = {
              personalDetails: sessionData.data.personalDetails || {},
              businessInformation: sessionData.data.businessInformation || {},
              ownership: sessionData.data.ownership || {},
              bankInformation: sessionData.data.bankInformation || {},
              agreement: sessionData.data.agreement || {},
            };

            setMerchantData(fetchedMerchantData);
            console.log('[AdditionalInformation] Updated context with merchant data:', fetchedMerchantData);
          }
        } catch (error) {
          console.error('[AdditionalInformation] Failed to load session data:', error);
        }
      }
    };

    loadSessionData();
  }, [sessionId, contextMerchantData]);

  const handleComplete = async () => {
    if (!numberOfLocations || !averageTransactionAmount) {
      alert("Please answer both questions before proceeding.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('[AdditionalInformation] Answers:', {
        numberOfLocations,
        averageTransactionAmount,
        sessionId
      });

      // Submit session
      if (!sessionId) {
        throw new Error("Missing sessionId for submission");
      }

      // Fetch the existing session data to get the full agreement data from the server
      let agreementData = contextMerchantData?.agreement || {};

      try {
        console.log('[AdditionalInformation] Fetching existing session data...');
        const sessionData = await getOnboardingSession(sessionId);

        if (sessionData?.data?.agreement) {
          agreementData = sessionData.data.agreement;
          console.log('[AdditionalInformation] Using agreement data from server:', agreementData);
        } else {
          console.log('[AdditionalInformation] No agreement data on server, using context:', agreementData);
        }
      } catch (fetchErr) {
        console.warn('[AdditionalInformation] Failed to fetch session data, using context agreement:', fetchErr);
      }

      try {
        console.log('[AdditionalInformation] Saving agreement step with additional information...');

        //-------combines agreement data with location count and transaction amount
        const data = {
          ...agreementData,
          locations: numberOfLocations,
          averageTransactionAmount: averageTransactionAmount
        };

        console.log("Combined Agreement Data---------", data);
        const response = await saveOnboardingStep(sessionId, 4, data);
        console.log("application status response--", response);

        //--- If already flagged for Manual Review from previous steps (BankSteps Validifi or (DocCapture/Cannabis in live test env))
        //--- skip Accurint/Bridger verification and navigate to review page
        if (response?.data?.applicationStatus === "Manual Review") {
          await submitOnboardingSession(sessionId);
          completeSession();
          navigate(`/merchant-onboarding-complete?status=review`);
          return;
        } 

        //console.log('[AdditionalInformation] Agreement step saved with additional information');
      } catch (saveErr: any) {
        console.error('[AdditionalInformation] Failed to save agreement step:', saveErr);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: saveErr?.responseText || saveErr?.message || 'Failed to save agreement data'
        });
  
        throw saveErr;
      }

      // Run external verifications (Bridger/Accurint) before final navigation
      let status = 'denied';
      let applicationStatus = null;
      let reason = null;
      let accurintEvidenceIndicator: string | null = null;
      let accurintRiskIndicator: string | null = null;
      let accurintResult: any = null;
      let accurintDecision = null;
      let accurintReason = null;

      try {
        //-----accurint business evaluation
        const businessInfo = (contextMerchantData || merchantData)?.businessInformation;
        const personalInfo = (contextMerchantData || merchantData)?.personalDetails;

        if (businessInfo) {
          try {
            console.log('[AdditionalInformation] Running Accurint business evaluation...');

            const cleanPhone = personalInfo?.phone?.replace(/\D/g, '') || '';
            const cleanTin = businessInfo.einSsnNumber?.replace(/-/g, '') || '';

            // Fetch session data to get businessId (if available)
            let businessId: number | undefined;
            try {
              const sessionData = await getOnboardingSession(sessionId);
              businessId = sessionData?.businessId || sessionData?.data?.businessId;
              console.log('[AdditionalInformation] Retrieved businessId from session:', businessId);
            } catch (err) {
              console.warn('[AdditionalInformation] Could not retrieve businessId:', err);
            }

            const accurintPayload = {
              companyName: businessInfo.legalNameOfBusiness,
              streetAddress1: businessInfo.address,
              city: businessInfo.city,
              state: businessInfo.state,
              zip5: businessInfo.zipcode?.substring(0, 5),
              phone: cleanPhone,
              tin: cleanTin, // ⭐ EIN/TIN included
              ...(businessId && { businessId }), // ⭐ Include businessId if available
              sessionId: sessionId, // ⭐ Session ID included
            };

            //----lexisnexix accurint api call
            console.log('[AdditionalInformation] Accurint payload:', accurintPayload);
            accurintResult = await accurintEvaluateBusiness(accurintPayload);
            console.log('[AdditionalInformation] Accurint result:', accurintResult);

            //----extracts evidenceIndicator and riskIndicator from response
            if (accurintResult?.data) {
              accurintEvidenceIndicator = accurintResult.data.evidenceIndicator || null;
              accurintRiskIndicator = accurintResult.data.riskIndicator || null;
              accurintDecision = accurintResult.data.decision;
              accurintReason = accurintResult.data.reason;

              console.log('[AdditionalInformation] Accurint Evidence Indicator:', accurintEvidenceIndicator);
              console.log('[AdditionalInformation] Accurint Risk Indicator:', accurintRiskIndicator);
            }
          } catch (accurintErr) {
            console.error('Accurint error:', accurintErr);
            throw accurintErr;
          }

          //-----accurint decisioning
          console.log('[AdditionalInformation] Accurint Decision:', accurintDecision);
          console.log('[AdditionalInformation] Evidence Indicator:', accurintEvidenceIndicator);
          console.log('[AdditionalInformation] Risk Indicator:', accurintRiskIndicator);
          
          if(accurintDecision === 'NOT_FOUND'){
            status = 'denied',
            applicationStatus = "Declined";
            reason = `Accurint Evaluation: Business Not Found`;
            console.log('[AdditionalInformation] Decision: NOT_FOUND - Business declined');
          }
          else if(accurintDecision === 'DECLINE'){
          //else if(accurintEvidenceIndicator === 'H' || accurintEvidenceIndicator === 'E' || accurintRiskIndicator === 'H' || accurintRiskIndicator === 'E'){
            status = 'denied';
            applicationStatus = "Declined";
            reason = `Accurint Evaluation: Accurint Evidence Indicator ${accurintEvidenceIndicator}, Risk Indicator ${accurintRiskIndicator} | ${accurintReason}`;
            console.log('[AdditionalInformation] Decision: DECLINE - Business declined');
          }
          else if (accurintDecision === 'REVIEW'){
          //else if(accurintEvidenceIndicator==='M' || accurintRiskIndicator ==='M'){
            status = 'review';
            applicationStatus = "Manual Review";
            reason = `Accurint Evaluation: Accurint Evidence Indicator ${accurintEvidenceIndicator}, Risk Indicator ${accurintRiskIndicator} | ${accurintReason}`;
            console.log('[AdditionalInformation] Decision: REVIEW - Manual review required');
          }
          else if(accurintDecision === 'APPROVE'){
         //else if((accurintEvidenceIndicator === 'L' || accurintEvidenceIndicator === 'P') && (accurintRiskIndicator === 'L' || accurintEvidenceIndicator==='P')){
          
            //----lexis nexis bridger calls
            console.log('[AdditionalInformation] Decision: APPROVE - Proceeding to Bridger verification');
            console.log("Bridger calls-------");
            const verification = await runEntityVerification(contextMerchantData || merchantData, accurintResult);
            console.log('[AdditionalInformation] verification summary', verification);

            // Helper: try to detect business indicators low (from bridger raw payloads)
            const businessResults = (verification.results || []).filter(r => r.entityType === 'business' && r.provider === 'bridger');
            const isBusinessIndicatorsLow = (raw: any) => {
              if (!raw) return false;
              try {
                const s = JSON.stringify(raw).toLowerCase();
              return s.includes('businessevidencestatus') && s.includes('businessriskstatus') && s.includes('low');
              } catch (e) { return false; }
            };

            const anyBusinessLow = businessResults.some(r => isBusinessIndicatorsLow(r.raw));

            //----lexis nexis bridger decisioning
          
            if (verification.overallDecision === 'DENY' || verification.highestEntityScore >= 95) {
              status = 'denied';
              applicationStatus = "Declined";
              reason = verification.reason || `Bridger Entity Score: ${verification.highestEntityScore}`;
              console.log('[AdditionalInformation] Bridger Result: DENY - Application declined');
              console.log('[AdditionalInformation] Reason:', reason);
            }
            else if (verification.overallDecision === 'MANUAL_REVIEW' || (verification.highestEntityScore >= 80 && verification.highestEntityScore < 95) || verification.highestEntityScore === 0) {
              status = 'review';
              applicationStatus = 'Manual Review';
              reason = verification.reason || `Bridger Entity Score: ${verification.highestEntityScore}`;
              console.log('[AdditionalInformation] Bridger Result: MANUAL_REVIEW');
              console.log('[AdditionalInformation] Reason:', reason);
            }
            else if (anyBusinessLow || (verification.highestEntityScore > 0 && verification.highestEntityScore < 80)) {
              status = 'approved';
              applicationStatus = "Approved";
              console.log('[AdditionalInformation] Bridger Result: APPROVE - Low risk business');
            }

          }
          else{
            status = 'denied',
            applicationStatus = "Declined";
            reason = `Accurint Evaluation: Business Not Found`;
            console.log('[AdditionalInformation] Decision: Unknown - Business declined (else block)');
          }

          //----onbaording details completed
          console.log('[AdditionalInformation] Final Status:', status);
          console.log('[AdditionalInformation] Final Application Status:', applicationStatus);
          console.log('[AdditionalInformation] Final Reason:', reason);
          console.log('[AdditionalInformation] Submitting to backend...');
          
          await submitOnboardingSession(sessionId, applicationStatus, reason, accurintResult);
          completeSession();

          let messageParam = '';
          if (status === 'denied') {
            const denialMessage = 'Unfortunately, we are unable to approve your merchant application as there appears to be an issue with the business information. Please contact your account manager.';
            messageParam = `&message=${encodeURIComponent(denialMessage)}`;
          }
          navigate(`/merchant-onboarding-complete?status=${status}${messageParam}`);
        }

      } catch (verErr) {
        console.warn('[AdditionalInformation] verification error — ', verErr);
      }

    } catch (error: any) {
      console.error('[AdditionalInformation] Error:', error);
      toast({ variant: 'destructive', title: 'Error', description: error?.message || 'An error occurred while processing your request.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-jvc-blue-950 flex-1 pt-24">
        <div className="border-t border-white/20 w-full" />
        {/* Hero Section */}
        <section className="bg-jvc-blue-950 text-white py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-gray-300 mb-6">
              <span className="text-gray-400">Home</span> &nbsp;›&nbsp;{" "}
              <span className="text-white font-medium">
                 Merchant Business Information
              </span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Merchant
              <br />
              Business
              <br />
              Information
            </h1>
          </div>
        </section>
        {/* Form Content */}
        <div className="bg-white flex-1">
          <div className="w-full mx-auto px-4 py-8 md:px-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Additional Information
                </h2>

                {/*---- Question 1: Number of Locations */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    How many locations does the business have?
                  </h3>
                  <RadioGroup value={numberOfLocations} onValueChange={setNumberOfLocations}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="1-location" id="1-location" />
                          <Label htmlFor="1-location" className="cursor-pointer flex-1">
                            1 location
                          </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="2-5-locations" id="2-5-locations" />
                          <Label htmlFor="2-5-locations" className="cursor-pointer flex-1">
                            2-5 locations
                          </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="5-10-locations" id="5-10-locations" />
                          <Label htmlFor="5-10-locations" className="cursor-pointer flex-1">
                            5-10 locations
                          </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="10-plus-locations" id="10-plus-locations" />
                          <Label htmlFor="10-plus-locations" className="cursor-pointer flex-1">
                            10 or more locations
                          </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/*----- Question 2: Average Transaction Amount */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      What is the average transaction amount?
                    </h3>
                    <RadioGroup value={averageTransactionAmount} onValueChange={setAverageTransactionAmount}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="less-than-100" id="less-than-100" />
                            <Label htmlFor="less-than-100" className="cursor-pointer flex-1">
                              Less than $100
                            </Label>
                        </div>
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="100-500" id="100-500" />
                            <Label htmlFor="100-500" className="cursor-pointer flex-1">
                              $100 - $500
                            </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="501-3500" id="501-3500" />
                          <Label htmlFor="501-3500" className="cursor-pointer flex-1">
                            $501 - $3,500
                          </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="more-than-3500" id="more-than-3500" />
                          <Label htmlFor="more-than-3500" className="cursor-pointer flex-1">
                            More than $3,500
                          </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button
                  type="button"
                  onClick={handleComplete}
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white order-1 sm:order-2"
                >
                {isSubmitting ? "Processing..." : "Complete"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInformation;