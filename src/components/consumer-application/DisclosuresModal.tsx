// ─────────────────────────────────────────────────────────────────────────────
// components/consumer-application/DisclosuresModal.tsx
// Reusable modal component for displaying application disclosures
// ─────────────────────────────────────────────────────────────────────────────

import { useApplicationDisclosures } from '@/hooks/useApplicationDisclosures';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';

interface DisclosuresModalProps {
  /** SessionId string (e.g., "consumer_1767730688744_xbtvaqoat") */
  applicationId: string | number | null;
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
}

/**
 * DisclosuresModal - Displays application disclosures in a modal
 *
 * Features:
 * - Fetches disclosures from backend using React Query
 * - Displays loading skeleton while fetching
 * - Shows error states with retry option
 * - Renders disclosure sections in a responsive table format
 * - Accessible with focus trap and keyboard navigation
 *
 * @example
 * ```tsx
 * <DisclosuresModal
 *   applicationId={sessionId}
 *   open={showDisclosuresModal}
 *   onClose={() => setShowDisclosuresModal(false)}
 * />
 * ```
 */
export function DisclosuresModal({
  applicationId,
  open,
  onClose,
}: DisclosuresModalProps) {
  const { data, isLoading, isError, error, refetch } = useApplicationDisclosures({
    applicationId,
    enabled: open, // Only fetch when modal is open
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-4xl max-h-[85vh] overflow-y-auto"
        aria-labelledby="disclosures-modal-title"
      >
        <DialogHeader>
          <DialogTitle id="disclosures-modal-title" className="text-2xl font-bold text-[#043C6B]">
            {data?.data?.title || 'Application Disclosures'}
          </DialogTitle>
          {data?.data?.effectiveDate && (
            <p className="text-sm text-gray-600">
              Effective Date: {new Date(data.data.effectiveDate).toLocaleDateString()}
            </p>
          )}
        </DialogHeader>

        <div className="mt-4">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-[#043C6B]" />
              <p className="text-gray-600">Loading disclosures...</p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Failed to Load Disclosures
                </h3>
                <p className="text-sm text-gray-600 max-w-md">
                  {error?.message || 'An error occurred while loading the disclosures. Please try again.'}
                </p>
              </div>
              <Button
                onClick={() => refetch()}
                className="bg-[#043C6B] hover:bg-[#032a52] text-white"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Success State - Display Disclosures */}
          {data?.data && !isLoading && !isError && (
            <div className="space-y-6 text-sm text-gray-700">
              {data.data.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="border rounded-md overflow-hidden"
                >
                  {/* Section Header */}
                  <div className="bg-gray-100 px-3 py-2 text-xs sm:text-sm font-medium text-gray-700">
                    {section.name}
                  </div>

                  {/* Section Rows */}
                  <div className="divide-y">
                    {section.rows.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 text-sm"
                      >
                        {/* Label Column */}
                        <div className="font-semibold text-[#043C6B]">
                          {row.label}
                        </div>

                        {/* Value Column */}
                        <div className="sm:col-span-2">
                          {typeof row.value === 'string' ? (
                            <div
                              dangerouslySetInnerHTML={{ __html: row.value }}
                              className="prose prose-sm max-w-none"
                            />
                          ) : (
                            row.value
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t mt-6">
          <Button
            onClick={onClose}
            className="bg-[#043C6B] hover:bg-[#032a52] text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
