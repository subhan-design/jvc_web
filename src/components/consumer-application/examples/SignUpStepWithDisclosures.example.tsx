// ─────────────────────────────────────────────────────────────────────────────
// examples/SignUpStepWithDisclosures.example.tsx
// Example implementation showing how to integrate DisclosuresModal into SignUpStep
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DisclosuresModal } from '@/components/consumer-application/DisclosuresModal';
import { toast as sonnerToast } from 'sonner';
import { prescreenVerifiedConsumer, type PrescreenVerifiedResponse } from '@/lib/api';

/**
 * INTEGRATION GUIDE:
 * ==================
 * This example shows how to integrate the DisclosuresModal into your SignUpStep component.
 * Follow these steps:
 *
 * 1. Add state for managing the modal and storing the application ID
 * 2. Store the applicationId/userId after successful prescreen
 * 3. Add a button to trigger the modal
 * 4. Render the DisclosuresModal component
 */

export function SignUpStepWithDisclosuresExample() {
  // ========================================================================
  // STEP 1: Add State Management
  // ========================================================================
  const [showDisclosuresModal, setShowDisclosuresModal] = useState(false);
  const [applicationId, setApplicationId] = useState<number | null>(null);
  const [isVerifyingPreScreen, setIsVerifyingPreScreen] = useState(false);

  // ========================================================================
  // STEP 2: Update Prescreen Handler to Store Application ID
  // ========================================================================
  const verifyPreScreenVerified = async (data: any) => {
    try {
      console.log('[SignUp] Starting Verified prescreen for:', data.email);

      const payload = {
        phone: data.phoneNumber.replace(/\D/g, ''),
        password: data.password,
        email: data.email,
        refCode: data.referralCode || undefined,
        prequalifyAllow: true,
        preapprovalAllow: false,
      };

      console.log('[SignUp] Verified prescreen payload:', payload);
      const response = await prescreenVerifiedConsumer(payload);
      console.log('[SignUp] Verified prescreen response:', response);

      setIsVerifyingPreScreen(false);

      if (!response.success || !response.data) {
        sonnerToast.error(response.message || 'Pre-screening failed');
        return;
      }

      const { status, creditLimit, userId } = response.data;

      // ========================================================================
      // IMPORTANT: Store the userId/applicationId for disclosures
      // ========================================================================
      if (userId) {
        setApplicationId(userId);
      }

      // Handle different prescreen statuses
      if (status === 'APPROVED' && response.data.preapprovalAllow) {
        sonnerToast.success(
          `Congratulations! You are pre-approved with a credit limit of $${creditLimit?.toLocaleString()}`
        );

        // ========================================================================
        // STEP 3: Optionally Auto-Open Disclosures Modal
        // ========================================================================
        // You can automatically open the disclosures modal after approval
        // setShowDisclosuresModal(true);

        // Or continue to next step
        // await saveSignupStepAndContinue(data, response);
      }
    } catch (error: any) {
      console.error('[SignUp] Verified prescreen error:', error);
      sonnerToast.error(error.message || 'Pre-screening failed. Please try again.');
      setIsVerifyingPreScreen(false);
    }
  };

  // ========================================================================
  // STEP 4: Render the Component
  // ========================================================================
  return (
    <div className="bg-white rounded-lg p-6 lg:p-8 w-full mx-auto">
      {/* Your existing form fields here */}

      <div className="space-y-4 pt-4">
        {/* Existing verify button */}
        <Button
          type="button"
          onClick={() => {
            /* Your existing verify logic */
            // After successful verification, applicationId will be set
          }}
          disabled={isVerifyingPreScreen}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8"
        >
          {isVerifyingPreScreen ? 'Verifying...' : 'Verify'}
        </Button>

        {/* ====================================================================== */}
        {/* NEW: Button to View Application Disclosures                          */}
        {/* Show this button only after successful prescreen when userId exists  */}
        {/* ====================================================================== */}
        {applicationId && (
          <Button
            type="button"
            onClick={() => setShowDisclosuresModal(true)}
            variant="outline"
            className="border-[#043C6B] text-[#043C6B] hover:bg-[#043C6B] hover:text-white"
          >
            View Application Disclosures
          </Button>
        )}
      </div>

      {/* ========================================================================
          STEP 5: Render the DisclosuresModal Component
          ======================================================================== */}
      <DisclosuresModal
        applicationId={applicationId}
        open={showDisclosuresModal}
        onClose={() => setShowDisclosuresModal(false)}
      />
    </div>
  );
}

// ============================================================================
// ALTERNATIVE INTEGRATION PATTERNS
// ============================================================================

/**
 * Pattern 1: Auto-open disclosures after approval
 * ------------------------------------------------
 * In your verifyPreScreenVerified function, after successful approval:
 *
 * ```typescript
 * if (status === 'APPROVED' && response.data.preapprovalAllow) {
 *   setApplicationId(userId);
 *   setShowDisclosuresModal(true); // Auto-open modal
 * }
 * ```
 */

/**
 * Pattern 2: Show disclosures before continuing to next step
 * -----------------------------------------------------------
 * Add a callback to the modal's onClose to continue to next step:
 *
 * ```typescript
 * const [shouldContinue, setShouldContinue] = useState(false);
 *
 * const handleDisclosuresClose = () => {
 *   setShowDisclosuresModal(false);
 *   if (shouldContinue) {
 *     onNext({ ...data, id: generateSessionId() });
 *   }
 * };
 *
 * <DisclosuresModal
 *   applicationId={applicationId}
 *   open={showDisclosuresModal}
 *   onClose={handleDisclosuresClose}
 * />
 * ```
 */

/**
 * Pattern 3: Fetch and display inline (without modal)
 * ---------------------------------------------------
 * You can also use the hook directly for inline display:
 *
 * ```typescript
 * import { useApplicationDisclosures } from '@/hooks/useApplicationDisclosures';
 *
 * const { data, isLoading, isError } = useApplicationDisclosures({
 *   applicationId: userId,
 *   enabled: !!userId,
 * });
 *
 * // Then render the data inline in your component
 * ```
 */
