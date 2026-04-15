import FormStepper from "./FormStepper";
import PersonalDetailsStep from "./steps/PersonalDetailsStep";
import OwnerSteps from "./steps/OwnerSteps";
import BankSteps from "./steps/BankSteps";
import AgreementSteps from "./steps/AgreementSteps";
import BusinessDetailsStep from "./steps/BusinessDetailsStep";
import { useMerchantData } from "@/context/MerchantDataContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// localStorage removed - using server-side only

const MerchantApplicationForm = () => {
  const {
    merchantData,
    setMerchantData,
    currentStep,
    setCurrentStep,
    showResumeDialog,
    handleResumeSession,
    handleStartNewSession,
    formKey,
  } = useMerchantData();

  const steps = [
    { id: 1, title: "Personal" },
    { id: 2, title: "Business" },
    // { id: 3, title: "Locations" },
    { id: 3, title: "Owner" },
    { id: 4, title: "Bank" },
    { id: 5, title: "Agreement" },
  ];

  // Convert 0-based currentStep to 1-based for display
  const displayStep = currentStep + 1;

  const handleNextStep = () => {
    console.log("handleNextStep called, currentStep:", currentStep, "steps.length:", steps.length);
    if (displayStep < steps.length) {
      const newStep = currentStep + 1;
      console.log("Setting currentStep to:", newStep);
      setCurrentStep(newStep);
    } else {
      console.log("Cannot proceed - already at last step");
    }
  };

  const handlePrevStep = () => {
    if (displayStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Resume Session Dialog */}
      <Dialog open={showResumeDialog} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[500px]" onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-2xl">Welcome Back!</DialogTitle>
            <DialogDescription className="text-base pt-2">
              We found an existing application in progress. Would you like to continue where you left off, or start a new application?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleStartNewSession}
              className="w-full sm:w-auto"
            >
              Start New Application
            </Button>
            <Button
              onClick={handleResumeSession}
              className="w-full sm:w-auto"
            >
              Resume Previous Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
          <div className="flex-1 mx-auto px-4 py-8 lg:px-12">
            {/* Debug info - remove in production */}
            {/* <div className="mb-4 p-2 bg-gray-100 rounded text-sm text-gray-600">
              Debug: currentStep={currentStep}, displayStep={displayStep}
            </div>
             */}
            {/* Stepper */}
            <FormStepper
              steps={steps}
              currentStep={displayStep}
              onStepClick={(step) => setCurrentStep(step - 1)}
            />

          {/* Form Content */}
          <div className="mt-8" key={formKey}>
            {displayStep === 1 && (() => {
              console.log("[Form] Rendering PersonalDetailsStep with initialValues:", JSON.stringify(merchantData.personalDetails, null, 2));
              console.log("[Form] Full merchantData:", JSON.stringify(merchantData, null, 2));
              return (
                <PersonalDetailsStep
                  initialValues={merchantData.personalDetails}
                  onNext={() => {
                    console.log("PersonalDetailsStep onNext called - PersonalDetailsStep already saved data internally");
                    // Don't update merchantData here - PersonalDetailsStep already calls savePersistentData internally
                    // Just proceed to next step
                    handleNextStep();
                  }}
                  onPrev={handlePrevStep}
                />
              );
            })()}

            {displayStep === 2 && (
              <BusinessDetailsStep
                initialValues={merchantData.businessInformation}
                onNext={(data) => {
                  setMerchantData((prev) => ({
                    ...prev,
                    businessInformation: data,
                  }));
                  handleNextStep();
                }}
                onPrev={handlePrevStep}
              />
            )}

            {/* {displayStep === 3 && (
              <LocationSteps
                initialValues={merchantData.locations}
                onNext={(data) => {
                  setMerchantData((prev) => ({ ...prev, locations: data }));
                  handleNextStep();
                }}
                onPrev={handlePrevStep}
              />
            )} */}

            {displayStep === 3 && (() => {
              console.log("[Form] Rendering OwnerSteps with merchantData:", JSON.stringify(merchantData, null, 2));
              console.log("[Form] personalDetails:", JSON.stringify(merchantData.personalDetails, null, 2));
              console.log("[Form] ownership:", JSON.stringify(merchantData.ownership, null, 2));
              return (
                <OwnerSteps
                  initialValues={merchantData.ownership}
                  personalDetails={merchantData.personalDetails}
                  onNext={(data) => {
                    setMerchantData((prev) => ({ ...prev, ownership: data }));
                    handleNextStep();
                  }}
                  onPrev={handlePrevStep}
                />
              );
            })()}
            {displayStep === 4 && (
              <BankSteps
                initialValues={merchantData.bankInformation}
                onNext={(data) => {
                  setMerchantData((prev) => ({ ...prev, bankInformation: data }));
                  handleNextStep();
                }}
                onPrev={handlePrevStep}
              />
            )}
            {displayStep === 5 && (
              <AgreementSteps
                merchantData={merchantData}
                initialValues={merchantData.agreement}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default MerchantApplicationForm;
