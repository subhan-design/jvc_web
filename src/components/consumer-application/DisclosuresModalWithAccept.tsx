// ─────────────────────────────────────────────────────────────────────────────
// components/consumer-application/DisclosuresModalWithAccept.tsx
// EXACT Image-1 UI (NO accept / e-signature)
// Shows static PRESCREEN + OFFER TERMS
// Maps ONLY:
//  - Interest Rates... section (all rows)
//  - Fees section (ONLY Annual Fee + Penalty Fees + Late Payment + Returned Payment rows)
// Uses response shape: data.sections[{title, rows[{label,value,style}]}]
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from 'react';
import { useApplicationDisclosures } from '@/hooks/useApplicationDisclosures';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';

interface DisclosuresModalWithAcceptProps {
  applicationId: string | number | null;
  open: boolean;
  onClose: () => void;
}

type RowStyle = 'BOLD' | 'NORMAL' | 'ITALIC';

type ApiDisclosureRow = {
  label: string;
  value: string;
  style: RowStyle;
};

type ApiDisclosureSection = {
  title: string;
  rows: ApiDisclosureRow[];
};

const PRESCREEN_OPT_OUT_NOTICE = {
  title: 'PRESCREEN AND OPT-OUT NOTICE:',
  body: `The consumer received the offer of credit or insurance because the consumer satisfied the criteria for credit worthiness or insurability used to select the consumer for the offer. If applicable, the credit or insurance may not be extended if, after the consumer responds to the offer, the consumer does not meet the criteria used to select the consumer for the offer or any applicable criteria bearing on credit worthiness or insurability or does not furnish any required collateral. You have the right to prohibit information contained in your credit file with any credit reporting agency from being used in connection with any credit or insurance transaction that you did not initiate. To exercise this right, please call Experian Opt-Out at 1-888-5OPT-OUT (1-888-567-8688) or visit optoutprescreen.com. P.O. Box 919, Allen, TX 75013.`,
};

const OFFER_TERMS_AND_CONDITIONS = {
  title: 'OFFER TERMS AND CONDITIONS:',
  body: `This offer is made by Joint Venture Card. Information from your consumer credit report was used in connection with this offer and you received this offer because certain creditworthiness criteria used to screen persons was satisfied. Credit may not be extended if, after you respond to this offer, you no longer meet the selection criteria. Additional eligibility requirements for this line of credit include, but are not limited to, submission of a complete application, acceptable debt-to-income ratio, verification of identity, and verifiable bank account in your name. Other terms and conditions may apply. Minimum line assignment is $250.`,
};

// Image-1 order
const SECTION_ORDER = ['Interest Rates and Interest Charges', 'Fees'];

// --- helpers ---
function normalize(s: string) {
  return (s || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function matchSectionTitle(sectionTitle: string): string | null {
  const t = normalize(sectionTitle);

  // Interest Rates... (covers "Interest Rates and Charges" / "Interest Rates and Interest Charges")
  if (t.includes('interest rates')) return 'Interest Rates and Interest Charges';

  // Fees
  if (t === 'fees' || t.includes('fees')) return 'Fees';

  return null;
}

function pickSectionsInOrder(sections: ApiDisclosureSection[]): ApiDisclosureSection[] {
  const bucket = new Map<string, ApiDisclosureSection>();

  for (const s of sections || []) {
    const key = matchSectionTitle(s.title);
    if (key && !bucket.has(key)) bucket.set(key, s);
  }

  return SECTION_ORDER.map((name) => bucket.get(name)).filter(Boolean) as ApiDisclosureSection[];
}

function rowValueClass(style: RowStyle) {
  if (style === 'BOLD') return 'font-semibold';
  if (style === 'ITALIC') return 'italic';
  return '';
}

/**
 * Fees section mein sirf:
 * - Annual Fee
 * - Penalty Fees (header)
 * - Late Payment
 * - Returned Payment
 */
function filterFeesRows(rows: ApiDisclosureRow[]): ApiDisclosureRow[] {
  return (rows || []).filter((row) => {
    const label = normalize(row.label);

    return (
      label.includes('annual fee') ||
      label.includes('penalty fee') || // "Penalty Fees"
      label === 'penalty fees' ||       // exact
      label.includes('late payment') ||
      label.includes('returned payment')
    );
  });
}

export function DisclosuresModalWithAccept({
  applicationId,
  open,
  onClose,
}: DisclosuresModalWithAcceptProps) {
  const { data, isLoading, isError, error, refetch } = useApplicationDisclosures({
    applicationId,
    enabled: open,
  });

  const title = data?.data?.title || 'Application Disclosures';

  // IMPORTANT: tumhare interface mein effectiveFrom/effectiveTo hai.
  // tumhare code mein "effectiveDate" tha — isliye fix kar diya:
  const effectiveFrom =  data?.data?.effectiveDate || null;

  const sectionsToRender = useMemo(() => {
    const rawSections = (data?.data?.sections || []) as unknown as ApiDisclosureSection[];
    return pickSectionsInOrder(rawSections);
  }, [data]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-y-auto p-6 bg-white">
        <DialogHeader>
          <DialogTitle id="disclosures-modal-title" className="text-2xl font-bold text-[#043C6B]">
            {title}
          </DialogTitle>

          {effectiveFrom && (
            <p className="text-sm text-gray-600">
              Effective Date: {new Date(effectiveFrom).toLocaleDateString()}
            </p>
          )}
        </DialogHeader>

        <div className="mt-4">
          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-[#043C6B]" />
              <p className="text-gray-600">Loading disclosures...</p>
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Failed to Load Disclosures</h3>
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

          {/* Success (Exact Image-1 layout) */}
          {!isLoading && !isError && data?.data && (
            <div className="space-y-6">
              {/* PRESCREEN AND OPT-OUT NOTICE (static) */}
              <div className="bg-white">
                <div className="text-[11px] font-bold text-[#043C6B]">
                  {PRESCREEN_OPT_OUT_NOTICE.title}
                </div>
                <p className="mt-2 text-[11px] leading-5 text-gray-700">
                  {PRESCREEN_OPT_OUT_NOTICE.body}
                </p>
              </div>

              {/* OFFER TERMS AND CONDITIONS (static) */}
              <div className="bg-white">
                <div className="text-[11px] font-bold text-[#043C6B]">
                  {OFFER_TERMS_AND_CONDITIONS.title}
                </div>
                <p className="mt-2 text-[11px] leading-5 text-gray-700">
                  {OFFER_TERMS_AND_CONDITIONS.body}
                </p>
              </div>

              {/* Sections block (Interest Rates..., Fees) */}
              <div className="space-y-6">
                {sectionsToRender.map((section, idx) => {
                  const matched = matchSectionTitle(section.title);
                  const rowsToShow =
                    matched === 'Fees' ? filterFeesRows(section.rows) : section.rows;

                  // if Fees section has no allowed rows, hide the whole section
                  if (matched === 'Fees' && rowsToShow.length === 0) return null;

                  return (
                    <div key={idx} className="border border-gray-200 bg-white">
                      {/* Grey section header row (like image-1) */}
                      <div className="bg-gray-100 px-4 py-2 text-[12px] text-gray-800">
                        {matched || section.title}
                      </div>

                      {/* Table rows */}
                      <div className="divide-y divide-gray-200">
                        {rowsToShow.map((row, rIdx) => (
                          <div
                            key={rIdx}
                            className="grid grid-cols-1 sm:grid-cols-[260px_1fr] px-4 py-3"
                          >
                            {/* Left label (blue) */}
                            <div className="text-[#043C6B] text-[12px] font-semibold pr-4">
                              {row.label}
                            </div>

                            {/* Right value */}
                            <div className={`text-[12px] text-gray-800 ${rowValueClass(row.style)}`}>
                              <div
                                dangerouslySetInnerHTML={{ __html: row.value }}
                                className="
                                  prose prose-sm max-w-none
                                  prose-p:my-0
                                  prose-ul:my-1 prose-ol:my-1
                                  prose-li:my-0
                                  prose-a:text-blue-600 prose-a:underline
                                "
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {sectionsToRender.length === 0 && (
                  <div className="text-sm text-gray-600">No disclosure sections available.</div>
                )}
              </div>

              {/* Footer (Image-1: only Close) */}
              <div className="flex justify-end pt-4 border-t mt-6">
                <Button onClick={onClose} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
