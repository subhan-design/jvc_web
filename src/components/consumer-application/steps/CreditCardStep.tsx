// Add at the top, after imports
const runtimeConfig = (window as any).__RUNTIME_CONFIG__ || { environment: 'production' };
const isDev = runtimeConfig.environment === 'development';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useNavigate } from "react-router-dom";

// const formSchema = z.object({
//   hasJVCCreditCard: z.string().min(1, "Please select an option"),
// });

// type FormData = z.infer<typeof formSchema>;

// interface CreditCardStepsProps {
//   onNext: () => void;
//   onPrev?: () => void; // optional now
//   onViewPrescreen: () => void; // Navigate to prescreen page
// }

// const CreditCardStep = ({ onNext, onPrev, onViewPrescreen }: CreditCardStepsProps) => {

//   const navigate = useNavigate();

//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       hasJVCCreditCard: "", // can default to "accept"/"decline" if needed
//     },
//   });

//   const handleDecision = (decision: "accept" | "decline") => {
//     // Save the decision into form state if needed
//     form.setValue("hasJVCCreditCard", decision);
//     if (isDev) console.log("User selected:", decision);

//     // Optionally handle different flows
//     if (decision === "accept") {
//       onNext(); // move forward in the flow
//     } else {
//       // maybe show a message or redirect
//       // alert("You have declined the offer.");
//       navigate('/consumer-download-app');
//     }
//   };

//   return (
//     <div className="bg-white">
//       <div className="w-full mx-auto px-4 md:px-12">
//         <Form {...form}>
//           <form className="space-y-8">
//             {/* <div className="mt-20 mx-auto flex flex-col justify-center max-w-2xl text-center">
//               <h2 className="text-xl md:text-3xl lg:text-4xl font-normal text-gray-900 mb-4">
//                 <span className="font-semibold text-[#043C6B]">
//                   Congratulations!<br /> <br /> 
//                 </span>{" "}
//                 You have been pre-approved for a JVC <br /> Credit Card.
               
//               </h2>

//               <p className="text-[14px] text-gray-500 mt-4">
//                 You can choose to stop receiving “prescreened” offers of credit
//                 from this and <br /> other companies by calling toll-free
//                 1-888-5-OPTOUT (1-888-567-8688).
//               </p>

//               <button
//                 type="button"
//                 className="text-[14px] text-blue-600 underline mt-4 cursor-pointer hover:text-blue-800"
//                 onClick={onViewPrescreen}
//               >
//                 Click to view the PRESCREEN & OPT-OUT NOTICE with more
//                 information about <br /> prescreened offers and OTHER IMPORTANT
//                 DISCLOSURES.
//               </button>

//               <div className="flex justify-center gap-4 mt-10">
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   className="bg-green-500 hover:bg-green-400 h-8"
//                   onClick={() => handleDecision("accept")}
//                 >
//                   Accept
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="h-8"
//                   onClick={() => handleDecision("decline")}
//                 >
//                   Decline
//                 </Button>
//               </div>

//               {/* Navigation Buttons */}
//             {/* <div className="flex justify-start gap-4 mt-8">
//                 <Button type="button" variant="outline" onClick={onPrev}>
//                   Previous
//                 </Button>
//                 <Button
//                   type="button"
//                   className="bg-blue-500 hover:bg-blue-600 text-white"
//                   onClick={() => onNext()}
//                 >
//                   Next
//                 </Button>
//               </div> 
//             </div> */}
//             <div className="mt-20 mx-auto max-w-3xl text-center flex flex-col items-center">
//               {/* Small blue heading */}
//               <h3 className="text-xl md:text-3xl lg:text-3xl font-normal text-gray-900 mb-4">
//                 <span className="font-semibold text-[#043C6B]">
//                   Congratulations!</span>

//               </h3>

//               {/* Main title */}
//               <h2 className="text-2xl md:text-3xl lg:text-3xl font-normal text-gray-900 leading-snug">
//                 You have been pre-approved for a JVC <br /> Credit Card.
//               </h2>

//               {/* Opt-out line with phone link */}
//               <p className="text-[13px] md:text-[13px] text-gray-500 mt-3">
//                 You can choose to stop receiving “prescreened” offers of credit from this and other companies
//                 by calling toll-free{" "}
//                 <a href="tel:18885678688" className="text-blue-600 underline hover:text-blue-800">
//                   1-888-567-8688
//                 </a>.
//               </p>

//               {/* Legal link opens modal */}
//               {/* <button
//     type="button"
//     onClick={() => setShowLegalModal(true)}
//     className="text-[13px] md:text-[14px] text-blue-600 underline mt-4 hover:text-blue-800"
//   >
//     Click to view the PRESCREEN &amp; OPT-OUT NOTICE with more information about prescreened offer
//     and OTHER IMPORTANT DISCLOSURES.
//   </button> */}

//               <button
//                 type="button"
//                 className="text-[14px] text-blue-600 underline mt-4 cursor-pointer hover:text-blue-800"
//                 onClick={onViewPrescreen}
//               >
//                 Click to view the PRESCREEN & OPT-OUT NOTICE with more
//                 information about <br /> prescreened offers and OTHER IMPORTANT
//                 DISCLOSURES.
//               </button>
//               {/* Actions */}
//               <div className="flex justify-center gap-3 md:gap-4 mt-10">
//                 <Button
//                   type="button"
//                   className="h-9 px-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
//                   onClick={() => handleDecision("accept")}
//                 >
//                   Accept
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="h-9 px-6"
//                   onClick={() => handleDecision("decline")}
//                 >
//                   Decline
//                 </Button>
//               </div>
//             </div>

//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default CreditCardStep;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { saveConsumerOnboardingStep } from "@/lib/api";
import { useConsumerData } from "@/context/ConsumerDataContext";
import { toast as sonnerToast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DisclosuresModalWithAccept } from "@/components/consumer-application/DisclosuresModalWithAccept";

const formSchema = z.object({
  hasJVCCreditCard: z.string().min(1, "Please select an option"),
});

type FormData = z.infer<typeof formSchema>;

interface CreditCardStepsProps {
  onNext: () => void;
  onPrev?: () => void; // optional now
  consumerData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    state?: string;
    zipCode?: string;
    id?: string;
  };
}

const CreditCardStep = ({ onNext, onPrev, consumerData }: CreditCardStepsProps) => {
  const { sessionId } = useConsumerData();
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // DEBUG: Log consumerData to check sessionId
  if (isDev) console.log('[CreditCardStep] consumerData:', consumerData);
  if (isDev) console.log('[CreditCardStep] sessionId:', sessionId);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasJVCCreditCard: "", // can default to "accept"/"decline" if needed
    },
  });

  const handleDecision = async (decision: "accept" | "decline") => {
    // Save the decision into form state if needed
    form.setValue("hasJVCCreditCard", decision);
    if (isDev) console.log("User selected:", decision);

    setIsSaving(true);

    try {
      //save accept or decline offer to server
      const offerData = {
        accepted: decision === "accept",
        decision: decision,
        timestamp: new Date().toISOString(),
      };

      if (isDev) console.log("[CreditCard] Saving offer decision:", offerData);
      await saveConsumerOnboardingStep('offer', sessionId, offerData);
      if (isDev) console.log("[CreditCard] Offer decision saved successfully");

      if (decision === "accept") {
        onNext();
      } else {
        navigate('/consumer-download-app', { state: { reason: 'declined' }, replace: true });
      }
    } catch (error) {
      if (isDev) console.error("[CreditCard] Failed to save offer decision:", error);
      sonnerToast.error("Failed to save your decision. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="w-full mx-auto px-4 md:px-12">
        <Form {...form}>
          <form className="space-y-8">
            <div className="mt-20 mx-auto max-w-3xl text-center flex flex-col items-center">
              {/* Small blue heading */}
              <h3 className="text-xl md:text-3xl lg:text-3xl font-normal text-gray-900 mb-4">
                <span className="font-semibold text-[#043C6B]">
                  Congratulations!</span>

              </h3>

              {/* Main title */}
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-normal text-gray-900 leading-snug">
                You have been pre-approved for a JVC <br /> Credit Card.
              </h2>

              {/* Opt-out line with phone link */}
              <p className="text-[13px] md:text-[13px] text-gray-500 mt-3">
                You can choose to stop receiving “prescreened” offers of credit from this and other companies
                by calling toll-free{" "}
                <a href="tel:18885678688" className="text-blue-600 underline hover:text-blue-800">
                  1-888-567-8688
                </a>.
              </p>

              <button
                type="button"
                className="text-[14px] text-blue-600 underline mt-4 cursor-pointer hover:text-blue-800"
                onClick={() => {
                  if (isDev) console.log('[CreditCardStep] Opening disclosure modal, sessionId:', sessionId);
                  setShowLegalModal(true);
                }}
              >
                Click to view the PRESCREEN & OPT-OUT NOTICE with more
                information about <br /> prescreened offers and OTHER IMPORTANT
                DISCLOSURES.
              </button>
              {/* Actions */}
              <div className="flex justify-center gap-3 md:gap-4 mt-10">
                <Button
                  type="button"
                  className="h-9 px-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                  onClick={() => handleDecision("accept")}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Accept"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 px-6"
                  onClick={() => handleDecision("decline")}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Decline"}
                </Button>
              </div>
            </div>

          </form>
        </Form>
      </div>

      {/* Dynamic Disclosures Modal - Fetches from Backend */}
      <DisclosuresModalWithAccept
        applicationId={sessionId || null}
        open={showLegalModal}
        onClose={() => setShowLegalModal(false)}
      
      />

    </div>
  );
};

export default CreditCardStep;
