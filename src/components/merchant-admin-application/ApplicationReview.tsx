
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateInvestigation, getOnboardingSession, getApplicationById } from "@/lib/api";
import { toast } from "sonner";
import { decryptId } from "@/lib/encryption";
import { FileText, Shield } from "lucide-react";
import { AccurintReportModal } from "./AccurintReportModal";
import { RiskStatusBadge } from "./RiskStatusBadge";
import type { RiskStatus } from "@/lib/api";



/* ---------- type & mock ---------- */
type AppItem = {
  applicationId: string;
  dateReceived: string;
  merchant: string;
  reason: string;
};
const MOCK: AppItem = {
  applicationId: "25648",
  dateReceived: "2025-08-05",
  merchant: "John Doe",
  reason: "Accurint Indicator Entity Score: 84",
};

function isAdminAuthenticated() {
  try {
    const token = localStorage.getItem("admin_access_token");
    const timestamp = localStorage.getItem("admin_auth_timestamp");
    if (!token || !timestamp) return false;
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    return Date.now() - parseInt(timestamp, 10) < TWENTY_FOUR_HOURS;
  } catch {
    return false;
  }
}

export default function ApplicationReview() {
  if (!isAdminAuthenticated()) {
    window.location.href = "/admin/login";
    return null;
  }
  const navigate = useNavigate();
  const location = useLocation();
  const passed = location.state as AppItem | null;
  const { id: encryptedId } = useParams<{ id: string }>();

  const [app, setApp] = useState<AppItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [investigation, setInvestigation] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [decryptedId, setDecryptedId] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [accurintPdf, setAccurintPdf] = useState<string | null>(null);
  const [showAccurintModal, setShowAccurintModal] = useState(false);
  const [evidenceRisk, setEvidenceRisk] = useState<RiskStatus | null>(null);
  const [businessRisk, setBusinessRisk] = useState<RiskStatus | null>(null);
  const [hasAccurintData, setHasAccurintData] = useState(false);
  const [onboardingSessionId, setOnboardingSessionId] = useState<string | null>(null);

  //decrypts the ID from URL parameter
  useEffect(() => {
    if (!encryptedId) return;

    (async () => {
      try {
        const id = await decryptId(encryptedId);
        setDecryptedId(id);
        console.log('Decrypted application ID:', id);
      } catch (error) {
        console.error('Failed to decrypt application ID:', error);
        toast.error('Invalid application ID');
        navigate('/merchant-admin-application/review-queue');
      }
    })();
  }, [encryptedId, navigate]);

  useEffect(() => {
    if (passed) {
      setApp(passed);
      setLoading(false);
      
      // Check if reason contains "Accurint" to show report button
      if (passed.reason && passed.reason.toLowerCase().includes('accurint')) {
        setHasAccurintData(true);
        console.log('[ApplicationReview] Accurint keyword found in reason, enabling report button');
      }
      
      return;
    }

    if (decryptedId) {
      setLoading(false);
    }
  }, [passed, decryptedId]);

  // Fetch session data to get Accurint PDF and risk status
  useEffect(() => {
    if (!decryptedId) return;

    (async () => {
      try {
        let sessionId: string | null = null;
        let pdf: string | null = null;
        let evidenceRiskStatus: RiskStatus | null = null;
        let businessRiskStatus: RiskStatus | null = null;
        let reason: string | null = null;

        // Try to fetch application data first (if endpoint exists)
        try {
          const application = await getApplicationById(decryptedId);
          console.log('[ApplicationReview] Application data:', application);
          
          // Extract session ID from application data
          sessionId = application?.sessionId || application?.data?.sessionId || application?.onboardingSessionId || application?.data?.onboardingSessionId;
          console.log('[ApplicationReview] Extracted session ID from application:', sessionId);
          
          // Store session ID for Accurint report query
          if (sessionId) {
            setOnboardingSessionId(sessionId);
          }
          
          // Extract Accurint data from application
          pdf = application?.accurintPdf || application?.data?.accurintResult?.data?.pdf;
          evidenceRiskStatus = application?.data?.accurintResult?.data?.evidenceRiskStatus;
          businessRiskStatus = application?.data?.accurintResult?.data?.businessRiskStatus;
          reason = application?.reason || application?.data?.reason;
          
          console.log('[ApplicationReview] Reason from application:', reason);
          
          if (pdf) {
            setAccurintPdf(pdf);
            setHasAccurintData(true);
            console.log('[ApplicationReview] Accurint PDF found in application data');
            console.log('[ApplicationReview] PDF base64 (first 100 chars):', pdf.substring(0, 100));
            console.log('[ApplicationReview] PDF full base64 length:', pdf.length);
            console.log('[ApplicationReview] PDF full base64:', pdf);
          }
          
          if (evidenceRiskStatus) setEvidenceRisk(evidenceRiskStatus);
          if (businessRiskStatus) setBusinessRisk(businessRiskStatus);
          
          // Update app reason with application reason if available
          if (reason && app) {
            console.log('[ApplicationReview] Updating app reason from:', app.reason, 'to:', reason);
            setApp(prev => prev ? { ...prev, reason: reason } : prev);
          }
          
          // If we found any Accurint data, mark as having it
          if (pdf || evidenceRiskStatus || businessRiskStatus || (reason && reason.toLowerCase().includes('accurint'))) {
            setHasAccurintData(true);
          }
        } catch (appError: any) {
          console.warn('[ApplicationReview] Application endpoint not available or failed:', appError?.message || appError);
          // If application endpoint doesn't exist, try using decryptedId as session ID directly
          sessionId = decryptedId;
          console.log('[ApplicationReview] Will try using ID as session ID:', sessionId);
        }

        // If PDF already found, no need to fetch session
        if (pdf) {
          console.log('[ApplicationReview] Accurint data complete, skipping session fetch');
          return;
        }

        // Try to fetch session data
        if (sessionId) {
          try {
            const session = await getOnboardingSession(sessionId);
            setSessionData(session);
            
            // Store session ID for Accurint report query
            setOnboardingSessionId(sessionId);
            
            console.log('[ApplicationReview] Full session data:', session);
            console.log('[ApplicationReview] session.data.accurintResult:', session?.data?.accurintResult);
            
            // Extract Accurint data from session
            const sessionPdf = session?.data?.accurintResult?.data?.pdf;
            const sessionEvidenceRiskStatus = session?.data?.accurintResult?.data?.evidenceRiskStatus;
            const sessionBusinessRiskStatus = session?.data?.accurintResult?.data?.businessRiskStatus;
            const sessionReason = session?.reason || session?.data?.reason;
            
            console.log('[ApplicationReview] PDF from session:', sessionPdf ? 'Found (length: ' + sessionPdf.length + ')' : 'Not found');
            console.log('[ApplicationReview] Reason from session:', sessionReason);
            
            if (sessionPdf) {
              setAccurintPdf(sessionPdf);
              setHasAccurintData(true);
              console.log('✓ Accurint PDF loaded from session:', sessionId);
              console.log('[ApplicationReview] PDF base64 (first 100 chars):', sessionPdf.substring(0, 100));
              console.log('[ApplicationReview] PDF full base64 length:', sessionPdf.length);
              console.log('[ApplicationReview] PDF full base64:', sessionPdf);
            }
            
            if (sessionEvidenceRiskStatus) setEvidenceRisk(sessionEvidenceRiskStatus);
            if (sessionBusinessRiskStatus) setBusinessRisk(sessionBusinessRiskStatus);
            
            // Update app reason with session reason if available
            if (sessionReason && app) {
              console.log('[ApplicationReview] Updating app reason from:', app.reason, 'to:', sessionReason);
              setApp(prev => prev ? { ...prev, reason: sessionReason } : prev);
            }
            
            // Check for Accurint data
            if (sessionPdf || sessionEvidenceRiskStatus || sessionBusinessRiskStatus || (sessionReason && sessionReason.toLowerCase().includes('accurint'))) {
              setHasAccurintData(true);
            }
          } catch (sessionError: any) {
            console.warn('[ApplicationReview] Failed to fetch session:', sessionError?.message || sessionError);
          }
        }
      } catch (error) {
        console.error('[ApplicationReview] Error in data fetch:', error);
      }
    })();
  }, [decryptedId]);

//----previous implementation, but endpoint didnt exist
  // useEffect(() => {
  //   if (!id) return;
  //   let alive = true;
  //   (async () => {
  //     try {
  //       const res = await fetch(`/api/review-queue/${encodeURIComponent(id)}`, {
  //         credentials: "include",
  //       });
  //       if (!res.ok) throw new Error("fallback");
  //       const data: AppItem = await res.json();
  //       if (alive) setApp(data || null);
  //     } catch {
  //       if (alive) setApp({ ...MOCK, applicationId: String(id) });
  //     } finally {
  //       if (alive) setLoading(false);
  //     }
  //   })();
  //   return () => { alive = false; };
  // }, [id]);

  async function decide(decision: "Approved" | "Declined") {
    if (!app) return;

    if (!investigation.trim()) {
      toast.error("Please fill in the Investigation field");
      return;
    }
    if (!conclusion.trim()) {
      toast.error("Please fill in the Conclusion field");
      return;
    }

    const ok = window.confirm(
      `Are you sure you want to ${decision.toLowerCase()} application #${app.applicationId}?`
    );
    if (!ok) return;

    setSubmitting(true);

    try {
      await updateInvestigation({
        applicationId: Number(app.applicationId),
        investigation: investigation.trim(),
        conclusion: conclusion.trim(),
        applicationStatus: decision,
        updatedBy: "admin@jvc.com", 
      });

      toast.success(`Application # ${app.applicationId} ${decision}!`);

      setTimeout(() => {
        navigate("/merchant-admin-application/review-queue");
      }, 1000);
    } catch (e) {
      console.error("Error updating investigation:", e);
      toast.error("Failed to update application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-jvc-blue-950 flex-1 pt-16 sm:pt-20 md:pt-24">
      <div className="border-t border-white/20 w-full" />

      {/* Accurint Report Modal - Only render if Accurint has been called */}
      {hasAccurintData && (
        <AccurintReportModal
          open={showAccurintModal}
          onOpenChange={setShowAccurintModal}
          queryParams={{
            ...(onboardingSessionId && { onboardingSessionId: Number(onboardingSessionId) }),
            ...(decryptedId && !onboardingSessionId && { applicationId: Number(decryptedId) })
          }}
          title={`Accurint Report - Application #${app?.applicationId || decryptedId}`}
        />
      )}

      {/* Hero */}
      <section className="bg-jvc-blue-950 text-white py-10 sm:py-16 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
            <span className="text-gray-400">Home</span>&nbsp;›&nbsp;
            <span className="text-white font-medium">Merchant Business Information</span>
          </nav>
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold leading-tight">Application Review</h1>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#043C6B] mb-4 sm:mb-6">
            Merchant Enrollment Review
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 rounded w-1/2 animate-pulse" />
              ))}
              <div className="h-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-24 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : !app ? (
            <div className="text-gray-600">Application not found.</div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* Basics */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
                <Info label="Application ID">
                  <span className="text-blue-500 font-medium">#{app.applicationId}</span>
                </Info>
                <Info label="Merchant">{app.merchant || "—"}</Info>
                <Info label="Date Received">{formatDate(app.dateReceived)}</Info>
                <Info label="Reason">
                  <span className="inline-flex items-center text-xl font-medium">
                    {app.reason || "—"}
                  </span>
                </Info>
              </div>

              {/* Risk Status Indicators */}
              {(evidenceRisk || businessRisk) && (
                <div className="pt-2 pb-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <h3 className="text-sm font-semibold text-gray-900">Risk Assessment</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {evidenceRisk && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Evidence Risk:</span>
                          <RiskStatusBadge status={evidenceRisk} />
                        </div>
                      )}
                      {businessRisk && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Business Risk:</span>
                          <RiskStatusBadge status={businessRisk} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Accurint Report Button - Only show if Accurint has been called */}
              {decryptedId && hasAccurintData && (
                <div className="pt-2 pb-4">
                  <button
                    type="button"
                    onClick={() => setShowAccurintModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    <FileText className="h-4 w-4" />
                    View Accurint Report
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Complete LexisNexis Accurint business verification report with risk analysis
                  </p>
                </div>
              )}

              {/* Investigation */}
              <div>
                <Label>Investigation</Label>
                <textarea
                  value={investigation}
                  onChange={(e) => setInvestigation(e.target.value)}
                  rows={6}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  placeholder="Write any checks you performed, supporting evidence, notes, etc."
                />
              </div>

              {/* Conclusion */}
              <div>
                <Label>Conclusion</Label>
                <textarea
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  placeholder="Summarize why this should be approved or declined."
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <button
                  onClick={() => decide("Approved")}
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 order-1"
                >
                  Approve
                </button>
                <button
                  onClick={() => decide("Declined")}
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-60 order-2"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="sm:ml-auto inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 order-3"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{label}</div>
      <div className="text-sm sm:text-base text-gray-900">{children}</div>
    </div>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs sm:text-sm uppercase tracking-wide text-gray-500 font-medium">{children}</div>;
}
function formatDate(isoOrYmd?: string) {
  if (!isoOrYmd) return "—";
  const d = new Date(isoOrYmd);
  if (Number.isNaN(d.getTime())) return isoOrYmd;
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}
