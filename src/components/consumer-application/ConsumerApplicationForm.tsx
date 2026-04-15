// Add at the top, after imports
const runtimeConfig = (window as any).__RUNTIME_CONFIG__ || { environment: 'production' };
const isDev = runtimeConfig.environment === 'development';
import SignUpStep from "./steps/SignUpStep";
import type { SignUpFormData } from "./steps/SignUpStep";
import CreditCardStep from "./steps/CreditCardStep";
import PreScreenNoticePage from "./steps/PreScreenNoticePage";
import BankAccountSteps from "./steps/BankAccountSteps";
import AgreementSteps from "./steps/AgreementSteps";
import type { BankFormData } from "./steps/BankAccountSteps";
import type { AgreementFormData } from "./steps/AgreementSteps";
import { useConsumerData } from "@/context/ConsumerDataContext";
import { useNavigate } from "react-router-dom";
import VerifiedSignupPage from "@/pages/VerifiedSignupPage";

const ConsumerApplicationForm = () => {
  const {
    consumerData,
    setConsumerData,
    currentStep,
    setCurrentStep,
    sessionId
  } = useConsumerData();
  
  const navigate = useNavigate();

  return (
    <div className="bg-jvc-blue-950 flex-1 pt-24">
      <div className="border-t border-white/20 w-full" />
      {/* Hero Section */}
      <section className="bg-jvc-blue-950 text-white py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-300 mb-6">
            <span className="text-gray-400">Home</span> &nbsp;›&nbsp;{" "}
            <span className="text-white font-medium">Consumer Information</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Consumer
            <br />
            Information
          </h1>
        </div>
      </section>
      {/* Form Content */}
      <div className="bg-white flex-1">
        <div className="flex-1 mx-auto px-4 py-8 lg:px-12">
          {/* Form Content */}
          <div className="mt-8">
            {/* Step 1: VerifiedSignupPage */}
            {currentStep === 1 && (
              <VerifiedSignupPage />
            )}

            {/* Step 2: Manual SignUpStep (fallback or after Verified) */}
            {currentStep === 2 && (
              <SignUpStep
                initialValues={consumerData.signUp}
                onNext={(data: SignUpFormData) => {
                  setConsumerData((prev) => ({ ...prev, signUp: data }));
                  setCurrentStep(3); // Move to CreditCardStep
                }}
                onPrev={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <CreditCardStep
                consumerData={consumerData?.signUp}
                onNext={() => {
                  setCurrentStep(4); // Move to BankAccountSteps
                }}
                onPrev={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && (
              <BankAccountSteps
                consumerData={consumerData?.signUp}
                initialValues={{
                  zipCode: consumerData.signUp?.zipCode || "",
                }}
                onNext={(data: BankFormData) => {
                  setConsumerData((prev) => ({ ...prev, bank: data }));
                  setCurrentStep(5); // Move to AgreementSteps
                }}
                onPrev={() => setCurrentStep(3)}
                sessionId={sessionId}
              />
            )}

            {currentStep === 5 && (
              <AgreementSteps
                consumerData={consumerData}
                onNext={(data: AgreementFormData) => {
                  setConsumerData((prev) => ({ ...prev, agreement: data }));
                  if (isDev) console.log("Application completed:", data);
                  navigate("/consumer-download-app", {
                    state: { reason: 'approved', fullyOnboarded: true, creditLimit: (consumerData.bank as any)?.creditLimit ?? null },
                    replace: true,
                  });
                }}
                onPrev={() => setCurrentStep(4)}
                sessionId={sessionId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerApplicationForm;
