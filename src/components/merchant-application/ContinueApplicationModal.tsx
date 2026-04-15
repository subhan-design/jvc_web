// // import React from "react";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogDescription,
// //   DialogFooter,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { AlertCircle, Clock, FileText } from "lucide-react";
// // import { getTimeSinceLastSave, getStepName } from "@/lib/merchantPersistence";

// // interface ContinueApplicationModalProps {
// //   isOpen: boolean;
// //   onContinue: () => void;
// //   onStartNew: () => void;
// //   onCancel?: () => void;
// //   savedStep: number;
// //   lastSaved: string; // ISO or human readable
// // }

// // const ContinueApplicationModal: React.FC<ContinueApplicationModalProps> = ({
// //   isOpen,
// //   onContinue,
// //   onStartNew,
// //   onCancel,
// //   savedStep,
// //   lastSaved,
// // }) => {
// //   const primaryRef = React.useRef<HTMLButtonElement>(null);

// //   React.useEffect(() => {
// //     if (!isOpen) return;
// //     primaryRef.current?.focus();

// //     const t = window.setTimeout(() => onCancel?.(), 30 * 60 * 1000);
// //     return () => window.clearTimeout(t);
// //   }, [isOpen, onCancel]);

// //   const lastSavedText =
// //     typeof getTimeSinceLastSave === "function"
// //       ? getTimeSinceLastSave(lastSaved)
// //       : lastSaved;

// //   const handleStartNew = () => {
// //     if (
// //       window.confirm(
// //         "Start a new application? This will permanently delete your previous progress."
// //       )
// //     ) {
// //       onStartNew();
// //     }
// //   };

// //   return (
// //     <Dialog
// //       open={isOpen}
// //       onOpenChange={(open) => {
// //         if (!open) onCancel?.();
// //       }}
// //     >
// //       <DialogContent
// //         className="sm:max-w-md p-0 overflow-hidden rounded-xl"
// //         onPointerDownOutside={(e) => e.preventDefault()}
// //         onEscapeKeyDown={(e) => {
// //           e.preventDefault();
// //           onCancel?.();
// //         }}
// //       >
// //         {/* Header */}
// //         <div className="px-5 pt-5">
// //           <DialogHeader className="space-y-2">
// //             <div className="flex items-center gap-3">
// //               <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
// //                 <FileText className="w-5 h-5 text-blue-600" />
// //               </div>
// //               <div>
// //                 <DialogTitle className="text-lg font-semibold text-gray-900">
// //                   Continue Previous Application?
// //                 </DialogTitle>
// //                 <DialogDescription className="text-gray-600">
// //                   We found an application you worked on earlier. You can pick up
// //                   where you left off or start a new one.
// //                 </DialogDescription>
// //               </div>
// //             </div>
// //           </DialogHeader>
// //         </div>

// //         {/* Body */}
// //         <div className="px-5 py-4">
// //           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
// //             <div className="flex items-start gap-3">
// //               <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
// //               <div className="text-sm text-blue-800 space-y-1">
// //                 <p className="font-medium">Previous application in progress</p>
// //                 <div className="flex items-center gap-2" aria-live="polite">
// //                   <Clock className="w-4 h-4" />
// //                   <span>Last saved: {lastSavedText}</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <FileText className="w-4 h-4" />
// //                   <span>You were on: {getStepName(savedStep)}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <p className="text-sm text-gray-700 mt-4">
// //             Would you like to continue with your previous application or start a
// //             new one?
// //           </p>

// //           <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
// //             <p className="text-xs text-amber-800">
// //               <strong>Note:</strong> Starting a new application will permanently
// //               delete your previous progress.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Footer (buttons inside dialog, consistent spacing) */}
// //         <DialogFooter className="px-5 pb-5">
// //           <div className="w-full flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
// //             <Button
// //               type="button"
// //               variant="ghost"
// //               onClick={onCancel}
// //               className="w-full sm:w-auto"
// //             >
// //               Cancel
// //             </Button>

// //             <Button
// //               type="button"
// //               variant="destructive"
// //               onClick={handleStartNew}
// //               className="w-full sm:w-auto"
// //             >
// //               Start New Application
// //             </Button>

// //             <Button
// //               ref={primaryRef}
// //               type="button"
// //               onClick={onContinue}
// //               className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
// //             >
// //               Continue Previous Application
// //             </Button>
// //           </div>
// //         </DialogFooter>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default ContinueApplicationModal;

// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { AlertCircle, Clock, FileText } from "lucide-react";
// import { getTimeSinceLastSave, getStepName } from "@/lib/merchantPersistence";

// interface ContinueApplicationModalProps {
//   isOpen: boolean;
//   onContinue: () => void;
//   onStartNew: () => void;
//   onCancel?: () => void;
//   savedStep: number;
//   lastSaved: string;
// }

// const ContinueApplicationModal: React.FC<ContinueApplicationModalProps> = ({
//   isOpen,
//   onContinue,
//   onStartNew,
//   onCancel,
//   savedStep,
//   lastSaved,
// }) => {
//   const primaryRef = React.useRef<HTMLButtonElement>(null);

//   React.useEffect(() => {
//     if (!isOpen) return;
//     primaryRef.current?.focus();
//     const t = window.setTimeout(() => onCancel?.(), 30 * 60 * 1000);
//     return () => window.clearTimeout(t);
//   }, [isOpen, onCancel]);

//   const lastSavedText =
//     typeof getTimeSinceLastSave === "function"
//       ? getTimeSinceLastSave(lastSaved)
//       : lastSaved;

//   const handleStartNew = () => {
//     if (
//       window.confirm(
//         "Start a new application? This will permanently delete your previous progress."
//       )
//     ) {
//       onStartNew();
//     }
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={(open) => {
//         if (!open) onCancel?.();
//       }}
//     >
//       <DialogContent
//         // ⬇️ wider, responsive width
//         className="w-[640px] max-w-[95vw] p-0 overflow-hidden rounded-xl"
//         onPointerDownOutside={(e) => e.preventDefault()}
//         onEscapeKeyDown={(e) => {
//           e.preventDefault();
//           onCancel?.();
//         }}
//       >
//         {/* Header */}
//         <div className="px-5 pt-5">
//           <DialogHeader className="space-y-2">
//             <div className="flex items-center gap-3">
//               <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                 <FileText className="w-5 h-5 text-blue-600" />
//               </div>
//               <div className="min-w-0">
//                 <DialogTitle className="text-lg font-semibold text-gray-900">
//                   Continue Previous Application?
//                 </DialogTitle>
//                 <DialogDescription className="text-gray-600 break-words">
//                   We found an application you worked on earlier. You can pick up
//                   where you left off or start a new one.
//                 </DialogDescription>
//               </div>
//             </div>
//           </DialogHeader>
//         </div>

//         {/* Body */}
//         <div className="px-5 py-4">
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//               <div className="text-sm text-blue-800 space-y-1 min-w-0">
//                 <p className="font-medium">Previous application in progress</p>
//                 <div className="flex items-center gap-2" aria-live="polite">
//                   <Clock className="w-4 h-4" />
//                   <span className="break-words">Last saved: {lastSavedText}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FileText className="w-4 h-4" />
//                   <span className="break-words">
//                     You were on: {getStepName(savedStep)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <p className="text-sm text-gray-700 mt-4">
//             Would you like to continue with your previous application or start a new one?
//           </p>

//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
//             <p className="text-xs text-amber-800">
//               <strong>Note:</strong> Starting a new application will permanently delete your previous progress.
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <DialogFooter className="px-5 pb-5">
//           <div className="w-full flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
//             <Button
//               type="button"
//               variant="ghost"
//               onClick={onCancel}
//               className="w-full sm:w-auto"
//             >
//               Cancel
//             </Button>

//             <Button
//               type="button"
//               variant="destructive"
//               onClick={handleStartNew}
//               className="w-full sm:w-auto"
//             >
//               Start New Application
//             </Button>

//             <Button
//               ref={primaryRef}
//               type="button"
//               onClick={onContinue}
//               className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               Continue Previous Application
//             </Button>
//           </div>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ContinueApplicationModal;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, FileText } from "lucide-react";
import { getTimeSinceLastSave, getStepName } from "@/lib/merchantPersistence";

interface ContinueApplicationModalProps {
  isOpen: boolean;
  onContinue: () => void;
  onStartNew: () => void;
  onCancel?: () => void;
  savedStep: number;
  /** Optional: ISO or human-readable datetime string */
  lastSaved?: string;
}

const ContinueApplicationModal: React.FC<ContinueApplicationModalProps> = ({
  isOpen,
  onContinue,
  onStartNew,
  onCancel,
  savedStep,
  lastSaved,
}) => {
  const primaryRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    primaryRef.current?.focus();
    const t = window.setTimeout(() => onCancel?.(), 30 * 60 * 1000);
    return () => window.clearTimeout(t);
  }, [isOpen, onCancel]);

  // ---- Safe helper usage (works whether helper expects 0 or 1 arg) ----
  const computeLastSavedText = (): string => {
    try {
      // Try as (value?: string) => string
      const fn = getTimeSinceLastSave as unknown as (v?: string) => string;
      return fn?.(lastSaved) ?? lastSaved ?? "";
    } catch {
      try {
        // Try as () => string
        const fn0 = getTimeSinceLastSave as unknown as () => string;
        return fn0?.() ?? lastSaved ?? "";
      } catch {
        return lastSaved ?? "";
      }
    }
  };

  const lastSavedText = computeLastSavedText();

  const stepName = (() => {
    try {
      return getStepName?.(savedStep) ?? `Step ${savedStep}`;
    } catch {
      return `Step ${savedStep}`;
    }
  })();

  const handleStartNew = () => {
    if (
      window.confirm(
        "Start a new application? This will permanently delete your previous progress."
      )
    ) {
      onStartNew();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel?.();
      }}
    >
      <DialogContent
        className="w-[640px] max-w-[95vw] p-0 overflow-hidden rounded-xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          onCancel?.();
        }}
      >
        {/* Header */}
        <div className="px-5 pt-5">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Continue Previous Application?
                </DialogTitle>
                {/* Having DialogDescription fixes the Radix a11y warning */}
                <DialogDescription className="text-gray-600 break-words">
                  We found an application you worked on earlier. You can pick up
                  where you left off or start a new one.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 space-y-1 min-w-0">
                <p className="font-medium">Previous application in progress</p>
                <div className="flex items-center gap-2" aria-live="polite">
                  <Clock className="w-4 h-4" />
                  <span className="break-words">
                    Last saved: {lastSavedText || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="break-words">You were on: {stepName}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700 mt-4">
            Would you like to continue with your previous application or start a new one?
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
            <p className="text-xs text-amber-800">
              <strong>Note:</strong> Starting a new application will permanently delete your previous progress.
            </p>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-5 pb-5">
          <div className="w-full flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={handleStartNew}
              className="w-full sm:w-auto"
            >
              Start New Application
            </Button>

            <Button
              ref={primaryRef}
              type="button"
              onClick={onContinue}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue Previous Application
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContinueApplicationModal;
