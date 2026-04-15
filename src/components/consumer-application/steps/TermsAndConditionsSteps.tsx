import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// You can remove zod and zodResolver since there's no validation now
export type TermsFormData = Record<string, never>;

interface TermsAndConditionsStepsProps {
  onNext: (data: TermsFormData) => void;
  onPrev: () => void;
}

const TermsAndConditionsSteps = ({
  onNext,
  onPrev,
}: TermsAndConditionsStepsProps) => {
  const form = useForm<TermsFormData>({
    defaultValues: {},
  });

  const onSubmit = (data: TermsFormData) => {
    console.log("Terms step submitted");
    onNext(data);
  };

  return (
    <div className="bg-white">
      <div className="w-full mx-auto px-4 md:px-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mt-10 mb-6">
              <p className="text-gray-500">
                <span className="font-bold text-ateneoBlue">
                  PRESCREEN AND OPT-OUT NOTICE:
                </span>{" "}
                The consumer received the offer of credit or insurance because
                the consumer satisfied the criteria for credit worthiness or
                insurability under which the consumer was selected for the
                offer. If applicable, the credit or insurance may not be
                extended if, after the consumer responds to the offer, the
                consumer does not meet the criteria used to select the consumer
                for the offer or any applicable criteria bearing on credit
                worthiness or insurability or does not furnish any required
                collateral. You have the right to prohibit information contained
                in your credit file with any credit reporting agency from being
                used in connection with any credit or insurance transactions
                that you did not initiate. To exercise this right, please call
                Experian Opt-Out at 1-888-5OPTOUT (1-888-567-8688), or write to
                Experian, P.O. Box 919, Allen, TX 75013.
              </p>

              <p className="text-gray-500 mt-6">
                <span className="font-bold text-ateneoBlue">
                  OFFER TERMS AND CONDITIONS:
                </span>{" "}
                This offer is made by Joint Venture Card. Information from your
                consumer credit report was used in connection with this offer
                and you received this offer because certain creditworthiness
                criteria used to screen persons was satisfied. Credit may not be
                extended if, after you respond to this offer, you no longer meet
                the selection criteria. Additional eligibility requirements for
                this line of credit include, but are not limited to, submission
                of a complete application, acceptable debt-to-income ratio,
                verification of identity, and verifiable bank account in your
                name. Other terms and conditions may apply. Minimum line
                assignment is $250.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
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
                className="bg-blue-500 hover:bg-blue-600 text-white order-1 sm:order-2"
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TermsAndConditionsSteps;
export type { TermsAndConditionsStepsProps };
