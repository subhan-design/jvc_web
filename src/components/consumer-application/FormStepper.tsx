import React from "react";

interface Step {
  id: number;
  title: string;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const FormStepper = ({ steps = [], currentStep = 1 }: FormStepperProps) => {
  return (
    <div className="flex-1 flex items-center justify-center">
      {/* Desktop Stepper */}
      <div className="hidden md:block w-full mx-0 md:mx-10 max-w-4xl">
        {/* Circles and Lines Row */}
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <React.Fragment key={step.id}>
                {/* Step Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-blue-300"
                  } transition-colors duration-200`}
                >
                  {step.id}
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200">
                    <div
                      className={`h-full ${
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      }`}
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Titles Row */}
        <div className="flex items-center mt-4">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;

            return (
              <React.Fragment key={`title-${step.id}`}>
                {/* Step Title */}
                <div
                  className="flex justify-center items-center"
                  style={{ width: "32px" }}
                >
                  <span
                    className={`text-sm font-medium text-center whitespace-nowrap ${
                      isActive ? "text-blue-500" : "text-gray-700"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Spacer for alignment with lines */}
                {index < steps.length - 1 && <div className="flex-1" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full ${
                  isActive
                    ? "bg-blue-500"
                    : isCompleted
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            );
          })}
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {steps.find((step) => step.id === currentStep)?.title}
          </h2>
          <p className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormStepper;
