import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminSessionDetail, getAdminSessionDisclosures, getAccurintReport, getAccurintReports, getAdminEditHistory, adminEditAgreement, adminEditOwnership, adminAddOwner } from "@/lib/api";
import type { AccurintReportData } from "@/lib/api";
import { API_BASE } from "@/config/app";
import { decryptId } from "@/lib/encryption";
import { toast } from "sonner";
import { openPdfInNewTab, downloadPdf } from "@/lib/pdfUtils";
import { RiskStatusBadge } from "./RiskStatusBadge";
import {
  EditButton, EditPersonalDetails, EditBusinessInformation,
  EditOwnership, EditAgreement, EditHistoryDisplay, RerunVerification,
} from "./AdminEditForms";
import {
  ArrowLeft, User, Building2, Users, Landmark, FileCheck, FileText,
  AlertCircle, Shield, ExternalLink, Download, FileBarChart, History, RefreshCw
} from "lucide-react";

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

export default function ApplicationDetailView() {
  if (!isAdminAuthenticated()) {
    window.location.href = "/admin/login";
    return null;
  }

  const navigate = useNavigate();
  const { id: encryptedId } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [disclosures, setDisclosures] = useState<any>(null);
  const [disclosuresLoading, setDisclosuresLoading] = useState(false);
  const [accurintReport, setAccurintReport] = useState<AccurintReportData | null>(null);
  const [accurintReports, setAccurintReports] = useState<any[]>([]);
  const [accurintLoading, setAccurintLoading] = useState(false);
  const [decryptedSessionId, setDecryptedSessionId] = useState<string | null>(null);
  const [editHistory, setEditHistory] = useState<any[]>([]);
  const [editHistoryLoading, setEditHistoryLoading] = useState(false);

  // Edit mode per section
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(false);
  const [editingOwnership, setEditingOwnership] = useState(false);
  const [editingAgreement, setEditingAgreement] = useState(false);
  const [liveFullName, setLiveFullName] = useState<string | null>(null);

  // Refresh counter to reload data after edit
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSaved = useCallback(() => {
    setEditingPersonal(false);
    setEditingBusiness(false);
    setEditingOwnership(false);
    setEditingAgreement(false);
    setLiveFullName(null);
    setRefreshKey((k) => k + 1);
  }, []);

  const handlePersonalDetailsSaved = useCallback(async (savedForm?: any) => {
    if (!savedForm || !decryptedSessionId) { handleSaved(); return; }

    const fullName = `${savedForm.firstName || ""} ${savedForm.lastName || ""}`.trim();
    const isMasked = (v: any) => typeof v === "string" && /\*{2,}/.test(v);

    // Sync agreement fullName
    if (fullName && session?.agreement) {
      try {
        await adminEditAgreement(decryptedSessionId, { ...session.agreement, fullName });
      } catch {
        toast.error("Personal details saved, but failed to sync agreement full name");
      }
    }

    // If ownerIntent switched to yes, populate/create the first owner from personal details
    const prevOwnerIntent = session?.personalDetails?.ownerIntent;
    if (savedForm.ownerIntent === "yes" && prevOwnerIntent !== "yes") {
      const owners: any[] = session?.ownership?.owners || (Array.isArray(session?.ownership) ? session.ownership : []);
      const ownerPatch: any = {
        firstName: savedForm.firstName || "",
        lastName: savedForm.lastName || "",
        email: savedForm.email || "",
        title: savedForm.title || "",
        telephoneNumber: savedForm.phone || "",
      };
      if (savedForm.dob && !isMasked(savedForm.dob)) ownerPatch.dateOfBirth = savedForm.dob;
      if (savedForm.socialSecurityNumber && !isMasked(savedForm.socialSecurityNumber)) ownerPatch.ssn = savedForm.socialSecurityNumber;

      try {
        if (owners.length > 0) {
          // Prepend personal details owner at top
          await adminEditOwnership(decryptedSessionId, { owners: [ownerPatch, ...owners] });
        } else {
          await adminAddOwner(decryptedSessionId, ownerPatch);
        }
      } catch {
        toast.error("Personal details saved, but failed to populate first owner");
      }
    } else if (savedForm.ownerIntent === "yes" && session?.ownership) {
      // ownerIntent already yes, keep first owner in sync with personal details changes
      const owners: any[] = session.ownership?.owners || (Array.isArray(session.ownership) ? session.ownership : []);
      const firstOwner = owners[0];
      if (owners.length > 0 && firstOwner?.telephoneNumber && savedForm.phone &&
          firstOwner.telephoneNumber.replace(/\D/g, "") === savedForm.phone.replace(/\D/g, "")) {
        const updatedOwners = owners.map((o: any, i: number) => {
          if (i !== 0) return o;
          const patch: any = {
            firstName: savedForm.firstName || o.firstName,
            lastName: savedForm.lastName || o.lastName,
            email: savedForm.email || o.email,
            title: savedForm.title || o.title,
            telephoneNumber: savedForm.phone || o.telephoneNumber,
          };
          if (savedForm.dob && !isMasked(savedForm.dob)) patch.dateOfBirth = savedForm.dob;
          if (savedForm.socialSecurityNumber && !isMasked(savedForm.socialSecurityNumber)) patch.ssn = savedForm.socialSecurityNumber;
          return { ...o, ...patch };
        });
        try {
          await adminEditOwnership(decryptedSessionId, { owners: updatedOwners });
        } catch {
          toast.error("Personal details saved, but failed to sync first owner details");
        }
      }
    }

    handleSaved();
  }, [decryptedSessionId, session, handleSaved]);

  const handleOwnershipSaved = useCallback(async (savedOwners?: any[]) => {
    if (!savedOwners || !decryptedSessionId) { handleSaved(); return; }

    const firstOwner = savedOwners[0];
    const personalPhone = session?.personalDetails?.phone;
    const ownerIntent = session?.personalDetails?.ownerIntent;

    // Only sync when ownerIntent is "yes" — first owner mirrors the applicant
    if (ownerIntent === "yes" && firstOwner?.telephoneNumber && personalPhone &&
        firstOwner.telephoneNumber.replace(/\D/g, "") === personalPhone.replace(/\D/g, "")) {

      // Sync agreement fullName
      const fullName = `${firstOwner.firstName || ""} ${firstOwner.lastName || ""}`.trim();
      if (fullName && session?.agreement) {
        try {
          await adminEditAgreement(decryptedSessionId, { ...session.agreement, fullName });
        } catch {
          toast.error("Ownership saved, but failed to sync agreement full name");
        }
      }
    }

    handleSaved();
  }, [decryptedSessionId, session, handleSaved]);

  useEffect(() => {
    if (!encryptedId) return;
    let alive = true;

    (async () => {
      try {
        const sessionId = await decryptId(encryptedId);
        if (alive) setDecryptedSessionId(sessionId);

        const raw = await getAdminSessionDetail(sessionId);
        console.log("[ApplicationDetailView] Raw API response:", raw);

        // Normalize: response may be flat, or nested in .data
        const data = raw?.data || raw;

        // Step data fields may be JSON strings (stored as TEXT in DB)
        const parsed = {
          ...data,
          personalDetails: tryParseJson(data.personalDetails),
          businessInformation: tryParseJson(data.businessInformation),
          ownership: tryParseJson(data.ownership),
          bankInformation: tryParseJson(data.bankInformation),
          agreement: tryParseJson(data.agreement),
          // bridgerResults lives at the top level of raw, not inside raw.data
          bridgerResults: raw.bridgerResults || data.bridgerResults,
        };
        console.log("[ApplicationDetailView] Parsed session:", parsed);

        if (alive) setSession(parsed);

        // Fetch disclosures (non-blocking)
        setDisclosuresLoading(true);
        try {
          const disc = await getAdminSessionDisclosures(sessionId);
          console.log("[ApplicationDetailView] Disclosures response:", disc);
          if (alive) setDisclosures(disc);
        } catch (discErr: any) {
          console.warn("Disclosures not available:", discErr?.message);
        } finally {
          if (alive) setDisclosuresLoading(false);
        }

        // Fetch Accurint reports (versioned + legacy single report)
        setAccurintLoading(true);
        try {
          // Try versioned reports first
          const reportsRes = await getAccurintReports(sessionId);
          const reports = reportsRes?.data || reportsRes || [];
          if (alive && Array.isArray(reports) && reports.length > 0) {
            setAccurintReports(reports);
          }
          // Also fetch legacy single report (has PDF data)
          const accReport = await getAccurintReport({ sessionId });
          if (alive && accReport?.data) setAccurintReport(accReport.data);
        } catch (accErr: any) {
          console.warn("Accurint reports not available:", accErr?.message);
        } finally {
          if (alive) setAccurintLoading(false);
        }

        // Fetch edit history (non-blocking)
        setEditHistoryLoading(true);
        try {
          const historyRes = await getAdminEditHistory(sessionId);
          const historyData = historyRes?.data || historyRes || [];
          if (alive) setEditHistory(Array.isArray(historyData) ? historyData : []);
        } catch (histErr: any) {
          console.warn("Edit history not available:", histErr?.message);
        } finally {
          if (alive) setEditHistoryLoading(false);
        }

      } catch (err: any) {
        console.error("Failed to load application detail:", err);
        if (alive) {
          if (err.status === 401) {
            setError("Unauthorized — please log in again.");
          } else if (err.status === 404) {
            setError("Application not found.");
          } else {
            setError("Failed to load application details.");
          }
          toast.error("Failed to load application");
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [encryptedId, refreshKey]);

  const status = session?.applicationStatus || session?.status || "IN_PROGRESS";
  const isCompleted = status === "COMPLETED" || status === "Approved" || status === "Declined";

  return (
    <div className="bg-jvc-blue-950 flex-1 pt-16 sm:pt-20 md:pt-24">
      <div className="border-t border-white/20 w-full" />

      {/* Hero */}
      <section className="bg-jvc-blue-950 text-white py-10 sm:py-16 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
            <span className="text-gray-400">Home</span>&nbsp;&rsaquo;&nbsp;
            <span className="text-gray-400 cursor-pointer hover:text-white" onClick={() => navigate(-1)}>
              Applications
            </span>&nbsp;&rsaquo;&nbsp;
            <span className="text-white font-medium">Application Detail</span>
          </nav>
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold leading-tight">
            Application Detail
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">

          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to list
          </button>

          {loading && <LoadingSkeleton />}

          {!loading && error && (
            <div className="flex items-center gap-3 p-6 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {!loading && !error && session && (
            <div className="space-y-8">

              {/* Status Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#043C6B]">
                    Session: {session.sessionId}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Created: {formatDate(session.createdAt)} &middot; Last updated: {formatDate(session.updatedAt)}
                  </p>
                </div>
                <StatusBadge status={status} />
              </div>

              {/* Step indicator */}
              {!isCompleted && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    This application is <strong>in progress</strong> - currently on step {session.currentStep ?? "N/A"} of 5.
                    Data shown reflects what the applicant has submitted so far.
                  </p>
                </div>
              )}

              {/* Personal Details */}
              <Section
                icon={User}
                title="Personal Details"
                editButton={<EditButton editing={editingPersonal} onToggle={() => { setEditingPersonal((p) => !p); if (editingPersonal) setLiveFullName(null); }} />}
              >
                {editingPersonal && decryptedSessionId ? (
                  <EditPersonalDetails sessionId={decryptedSessionId} data={session.personalDetails} onSaved={handlePersonalDetailsSaved} onNameChange={setLiveFullName} />
                ) : (
                  <>
                    <FieldGrid data={session.personalDetails} fields={[
                      { key: "title", label: "Title" },
                      { key: "firstName", label: "First Name" },
                      { key: "lastName", label: "Last Name" },
                      { key: "email", label: "Email" },
                      { key: "phone", label: "Phone" },
                      { key: "dob", label: "Date of Birth" },
                      // { key: "socialSecurityNumber", label: "SSN" },
                      { key: "ownerIntent", label: "Owner Intent" },
                    ]} />
                    <div className="mt-4">
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">Referral Code</div>
                      <div className="text-sm text-gray-900">
                        {session.personalDetails?.referralCode || "N/A"}
                      </div>
                    </div>
                  </>
                )}
              </Section>

              {/* Business Details */}
              <Section
                icon={Building2}
                title="Business Information"
                editButton={<EditButton editing={editingBusiness} onToggle={() => setEditingBusiness((p) => !p)} />}
              >
                {editingBusiness && decryptedSessionId ? (
                  <EditBusinessInformation sessionId={decryptedSessionId} data={session.businessInformation} onSaved={handleSaved} />
                ) : (
                  <FieldGrid data={session.businessInformation} fields={[
                    { key: "legalNameOfBusiness", label: "Legal Business Name" },
                    { key: "dbaIfApplicable", label: "DBA" },
                    { key: "einSsnSelection", label: "EIN/SSN Selection" },
                    { key: "einSsnNumber", label: "EIN/SSN" },
                    { key: "dateBusinessStarted", label: "Date Business Started" },
                    { key: "businessWebsite", label: "Website" },
                    { key: "address", label: "Address" },
                    { key: "city", label: "City" },
                    { key: "state", label: "State" },
                    { key: "zipcode", label: "ZIP Code" },
                    { key: "legalEntity", label: "Legal Entity" },
                    { key: "stateWhereRegistered", label: "State Registered" },
                    { key: "hasExistedAsOtherEntity", label: "Existed as Other Entity" },
                    { key: "licenseType", label: "License Type" },
                    ...(session.businessInformation?.licenseType && session.businessInformation.licenseType !== "none" ? [
                      { key: "licenseNumber", label: "License Number" },
                      { key: "licenseState", label: "License State" },
                    ] : []),
                  ]} />
                )}
              </Section>

              {/* Ownership */}
              <Section
                icon={Users}
                title="Ownership"
                editButton={<EditButton editing={editingOwnership} onToggle={() => setEditingOwnership((p) => !p)} />}
              >
                {editingOwnership && decryptedSessionId ? (
                  <EditOwnership sessionId={decryptedSessionId} data={session.ownership} onSaved={handleOwnershipSaved} personalPhone={session.personalDetails?.phone} ownerIntent={session.personalDetails?.ownerIntent} />
                ) : (
                  <OwnersDisplay ownership={session.ownership} />
                )}
              </Section>

              {/* Bank Information */}
              <Section icon={Landmark} title="Bank Information">
                <FieldGrid data={session.bankInformation} fields={[
                  { key: "nameOnAccount", label: "Name on Account" },
                  { key: "financialInstitution", label: "Financial Institution" },
                  { key: "routingNumber", label: "Routing Number" },
                  { key: "accountType", label: "Account Type" },
                  { key: "accountNumber", label: "Account Number" },
                ]} />
              </Section>

              {/* Agreement */}
              <Section
                icon={FileCheck}
                title="Agreement"
                editButton={<EditButton editing={editingAgreement} onToggle={() => setEditingAgreement((p) => !p)} />}
              >
                {editingAgreement && decryptedSessionId ? (
                  <EditAgreement sessionId={decryptedSessionId} data={session.agreement} onSaved={handleSaved} overrideFullName={liveFullName} />
                ) : (
                  <AgreementDisplay agreement={session.agreement} />
                )}
              </Section>

              {/* Disclosures with PDF viewing */}
              <Section icon={FileText} title="Disclosures & Signed Documents">
                <DisclosuresDisplay disclosures={disclosures} loading={disclosuresLoading} />
              </Section>

              {/* Accurint Reports (Versioned) */}
              <Section icon={Shield} title={`Accurint Reports${accurintReports.length > 0 ? ` (${accurintReports.length} run${accurintReports.length > 1 ? 's' : ''})` : ''}`}>
                {accurintReports.length > 0 ? (
                  <AccurintVersionedDisplay reports={accurintReports} legacyReport={accurintReport} loading={accurintLoading} />
                ) : (
                  <AccurintDisplay report={accurintReport} loading={accurintLoading} />
                )}
              </Section>

              {/* Bridger / Verification Results */}
              <Section icon={FileBarChart} title="Bridger / Entity Verification">
                <BridgerDisplay session={session} accurintReports={accurintReports} />
              </Section>

              {/* Re-run Verification */}
              {decryptedSessionId && (
                <Section icon={RefreshCw} title="Re-run Verification">
                  <RerunVerification
                    sessionId={decryptedSessionId}
                    session={session}
                    onComplete={handleSaved}
                  />
                </Section>
              )}

              {/* Edit History */}
              <Section icon={History} title="Edit History">
                {editHistoryLoading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                ) : (
                  <EditHistoryDisplay history={editHistory} />
                )}
              </Section>

              {/* Reason (if declined / manual review) */}
              {session.reason && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-1">Reason</div>
                  <p className="text-sm text-amber-900">{session.reason}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────── Helpers ───────────────── */

function Section({
  icon: Icon, title, children, editButton,
}: {
  icon: any; title: string; children: React.ReactNode; editButton?: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-[#043C6B]" />
          <h3 className="text-sm sm:text-base font-semibold text-[#043C6B]">{title}</h3>
        </div>
        {editButton}
      </div>
      <div className="px-4 sm:px-6 py-4">{children}</div>
    </div>
  );
}

const MASKED_FIELDS = new Set(["einSsnNumber", "socialSecurityNumber", "ssn", "ein"]);

function maskToLast4(value: string): string {
  const digits = value.replace(/[^0-9]/g, "");
  if (digits.length <= 4) return value;
  const last4 = digits.slice(-4);
  return `***-**-${last4}`;
}

function FieldGrid({ data, fields }: { data: any; fields: { key: string; label: string }[] }) {
  if (!data) {
    return <p className="text-sm text-gray-400 italic">Not yet submitted</p>;
  }

  // Filter to only fields that have values, and deduplicate labels (for fallback keys like referralCode/referral_code)
  const seenLabels = new Set<string>();
  const visibleFields = fields.filter(({ key, label }) => {
    const value = data[key];
    if (value === undefined || value === null || value === "") return false;
    if (seenLabels.has(label)) return false;
    seenLabels.add(label);
    return true;
  });

  if (visibleFields.length === 0) {
    return <p className="text-sm text-gray-400 italic">Not yet submitted</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
      {visibleFields.map(({ key, label }) => (
        <div key={key}>
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">{label}</div>
          <div className="text-sm text-gray-900 break-words">
            {MASKED_FIELDS.has(key) ? maskToLast4(String(data[key])) : String(data[key])}
          </div>
        </div>
      ))}
    </div>
  );
}

function OwnersDisplay({ ownership }: { ownership: any }) {
  if (!ownership) {
    return <p className="text-sm text-gray-400 italic">Not yet submitted</p>;
  }

  const owners = ownership.owners || ownership;
  if (!Array.isArray(owners)) {
    return <p className="text-sm text-gray-400 italic">No owner data available</p>;
  }

  return (
    <div className="space-y-4">
      {owners.map((owner: any, idx: number) => (
        <div key={idx} className={idx > 0 ? "pt-4 border-t border-gray-100" : ""}>
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
            Owner {idx + 1}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
            <Field label="Name" value={[owner.firstName, owner.lastName].filter(Boolean).join(" ")} />
            <Field label="Title" value={owner.title} />
            <Field label="SSN" value={owner.ssn ? maskToLast4(owner.ssn) : undefined} />
            <Field label="Date of Birth" value={owner.dateOfBirth} />
            <Field label="Phone" value={owner.telephoneNumber} />
            <Field label="Email" value={owner.email} />
            <Field label="Ownership %" value={owner.ownershipPercentage} />
            <Field label="Address" value={[owner.homeAddress, owner.address2, owner.city, owner.state, owner.zipCode].filter(Boolean).join(", ")} />
          </div>
        </div>
      ))}
    </div>
  );
}

function AgreementDisplay({ agreement }: { agreement: any }) {
  if (!agreement) {
    return <p className="text-sm text-gray-400 italic">Not yet submitted</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        <Field label="Full Name" value={agreement.fullName} />
        <Field label="Signature" value={agreement.signature ? "Signed" : "Not signed"} />
      </div>
      <div className="pt-3 border-t border-gray-100">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Documents Accepted</div>
        <div className="space-y-1">
          <AgreementCheck label="Consent to Electronic Records" checked={agreement.ConsentElectronicRecordsPreview} />
          <AgreementCheck label="Merchant Agreement" checked={agreement.MerchantAgreementPreview} />
          <AgreementCheck label="Merchant Operating Guide" checked={agreement.merchantOperatingGuide} />
          <AgreementCheck label="Online Privacy Policy" checked={agreement.OnlinePrivacyPolicyConsumerPreview} />
        </div>
      </div>
    </div>
  );
}

function AgreementCheck({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={checked ? "text-green-600" : "text-gray-400"}>
        {checked ? "✓" : "○"}
      </span>
      <span className={checked ? "text-gray-900" : "text-gray-400"}>{label}</span>
    </div>
  );
}

/* ───────────────── Disclosures with PDF viewing ───────────────── */

function DisclosuresDisplay({ disclosures, loading }: { disclosures: any; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    );
  }

  // Normalize: backend may return { data: { disclosures, documents } } or flat
  const raw = disclosures?.data || disclosures;
  const items = raw?.disclosures || raw?.documents || [];
  const eSignature = raw?.eSignature || raw?.signature;

  if (items.length === 0 && !eSignature) {
    return <p className="text-sm text-gray-400 italic">No disclosure records available</p>;
  }

  return (
    <div className="space-y-4">
      {items.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Document</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Version</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Accepted At</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((d: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-2 text-gray-900">
                    {formatDocumentType(d.type || d.documentType || d.name || d.fileName || "—")}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{d.version || "—"}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {d.acceptedAt || d.signedAt || d.createdAt ? formatDate(d.acceptedAt || d.signedAt || d.createdAt) : "—"}
                  </td>
                  <td className="px-4 py-2">
                    <DisclosurePdfActions doc={d} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {eSignature && (
        <div className="pt-3 border-t border-gray-100">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">E-Signature</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            <Field label="Signed By" value={eSignature.signedBy || eSignature.fullName} />
            <Field label="Signed At" value={eSignature.signedAt ? formatDate(eSignature.signedAt) : undefined} />
            <Field label="IP Address" value={eSignature.ipAddress} />
          </div>
        </div>
      )}
    </div>
  );
}

function DisclosurePdfActions({ doc }: { doc: any }) {
  const [viewLoading, setViewLoading] = useState(false);
  const [dlLoading, setDlLoading] = useState(false);
  // The doc might have base64 PDF content, a downloadUrl from backend, or a raw fileUrl
  const pdfContent = doc.pdfContent || doc.content || doc.base64 || doc.pdfBase64;
  // Backend now provides downloadUrl pointing to the authenticated document download endpoint
  const downloadUrl = doc.downloadUrl;
  const rawUrl = doc.url || doc.fileUrl || doc.documentUrl;
  const pdfUrl = downloadUrl
    ? (downloadUrl.startsWith("http") ? downloadUrl : `${API_BASE}${downloadUrl.startsWith("/") ? "" : "/"}${downloadUrl}`)
    : rawUrl
      ? (rawUrl.startsWith("http") ? rawUrl : `${API_BASE}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`)
      : null;
  const docType = (doc.type || doc.documentType || doc.name || doc.fileName || "").toLowerCase();

  // Map document type names to existing preview page routes
  const previewRoutes: Record<string, string> = {
    "merchant_agreement": "/docs/merchant-agreement",
    "merchant agreement": "/docs/merchant-agreement",
    "merchantagreementpreview": "/docs/merchant-agreement",
    "schedule_a_fees": "/docs/schedule-a-fees",
    "schedule a": "/docs/schedule-a-fees",
    "scheduleafeespreview": "/docs/schedule-a-fees",
    "schedule_b_fees": "/docs/schedule-b-fees",
    "schedule b": "/docs/schedule-b-fees",
    "schedulebfeespreview": "/docs/schedule-b-fees",
    "schedule_c_ach": "/docs/schedule-c-ach-authorization",
    "schedule c": "/docs/schedule-c-ach-authorization",
    "schedulecachauthorizationpreview": "/docs/schedule-c-ach-authorization",
    "schedule_d_privacy": "/docs/schedule-d-privacy",
    "schedule d": "/docs/schedule-d-privacy",
    "scheduledprivacypreview": "/docs/schedule-d-privacy",
    "consent_electronic_records": "/docs/consent-electronic-records",
    "electronic records consent": "/docs/consent-electronic-records",
    "consentelectronicrecordspreview": "/docs/consent-electronic-records",
    "privacy_policy": "/docs/online-privacy-policy",
    "online privacy policy": "/docs/online-privacy-policy",
    "onlineprivacypolicypreview": "/docs/online-privacy-policy",
    "merchant_operating_guide": "/docs/merchant-operating-guide",
    "merchant operating guide": "/docs/merchant-operating-guide",
    "merchantoperatingguidepreview": "/docs/merchant-operating-guide",
  };

  // If we have base64 PDF content — open/download it
  if (pdfContent) {
    return (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => openPdfInNewTab(pdfContent, doc.type || "Document")}
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
        >
          <ExternalLink className="h-3 w-3" /> View PDF
        </button>
        <button
          type="button"
          onClick={() => downloadPdf(pdfContent, `${doc.type || "document"}.pdf`)}
          className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
        >
          <Download className="h-3 w-3" /> Download
        </button>
      </div>
    );
  }

  // If we have a URL to the PDF — use authenticated fetch since download endpoint requires Bearer token
  if (pdfUrl) {
    const handleViewPdf = async () => {
      if (viewLoading) return;
      setViewLoading(true);
      try {
        const token = localStorage.getItem("admin_access_token");
        const res = await fetch(pdfUrl, {
          method: "GET",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: "application/pdf,application/octet-stream,*/*",
          },
        });
        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status}: ${errText || res.statusText}`);
        }
        const blob = await res.blob();
        if (blob.size === 0) throw new Error("Empty PDF response");
        const url = URL.createObjectURL(blob);
        const newWin = window.open(url, "_blank");
        if (!newWin) {
          const link = document.createElement("a");
          link.href = url;
          link.download = `${doc.type || "document"}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.info("Popup blocked — downloading instead");
        }
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      } catch (err) {
        console.error("[DisclosurePdfActions] Failed to open document:", err);
        toast.error("Failed to open document");
      } finally {
        setViewLoading(false);
      }
    };
    const handleDownload = async () => {
      if (dlLoading) return;
      setDlLoading(true);
      try {
        const token = localStorage.getItem("admin_access_token");
        const res = await fetch(pdfUrl, {
          method: "GET",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: "application/pdf,application/octet-stream,*/*",
          },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${doc.type || "document"}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      } catch (err) {
        console.error("[DisclosurePdfActions] Download failed:", err);
        toast.error("Failed to download document");
      } finally {
        setDlLoading(false);
      }
    };
    return (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleViewPdf}
          disabled={viewLoading}
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ExternalLink className="h-3 w-3" />
          {viewLoading ? "Loading..." : "View PDF"}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={dlLoading}
          className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-3 w-3" />
          {dlLoading ? "Downloading..." : "Download"}
        </button>
      </div>
    );
  }

  // Try matching to an existing doc preview page
  const matchedRoute = Object.entries(previewRoutes).find(
    ([key]) => docType.includes(key) || key.includes(docType)
  );
  if (matchedRoute) {
    return (
      <a
        href={matchedRoute[1]}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
      >
        <ExternalLink className="h-3 w-3" /> View Document
      </a>
    );
  }

  return <span className="text-xs text-gray-400">—</span>;
}

/* ───────────────── Accurint Report ───────────────── */

function AccurintDisplay({ report, loading }: { report: AccurintReportData | null; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    );
  }

  if (!report) {
    return <p className="text-sm text-gray-400 italic">No Accurint report available for this application</p>;
  }

  return (
    <div className="space-y-4">
    
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {report.evidenceRiskStatus && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Evidence Risk:</span>
            <RiskStatusBadge status={report.evidenceRiskStatus} />
          </div>
        )}
        {report.businessRiskStatus && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Business Risk:</span>
            <RiskStatusBadge status={report.businessRiskStatus} />
          </div>
        )}
      </div> */}

      {/* Report Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2">
        <Field label="Transaction ID" value={report.transactionId} />
        <Field label="Business ID" value={report.businessId} />
        <Field label="Report Date" value={report.createdAt ? formatDate(report.createdAt) : undefined} />
      </div>

      {/* PDF Actions */}
      {report.pdfReport && (
        <div className="pt-3 border-t border-gray-100">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Report PDF</div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openPdfInNewTab(report.pdfReport, `Accurint Report - ${report.transactionId}`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" /> View PDF
            </button>
            <button
              type="button"
              onClick={() => downloadPdf(report.pdfReport, `accurint-report-${report.transactionId || report.id}.pdf`)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────── Accurint Versioned Reports ───────────────── */

function AccurintVersionedDisplay({
  reports, legacyReport, loading,
}: {
  reports: any[]; legacyReport: AccurintReportData | null; loading: boolean;
}) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0); // newest expanded by default

  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    );
  }

  if (!reports.length) {
    return <p className="text-sm text-gray-400 italic">No Accurint reports available</p>;
  }

  const statusColor = (status: string | null) => {
    if (!status) return "bg-gray-100 text-gray-600";
    const s = status.toLowerCase();
    if (s === "approved") return "bg-green-100 text-green-800";
    if (s === "declined") return "bg-red-100 text-red-800";
    return "bg-amber-100 text-amber-800"; // Manual Review
  };

  const decisionColor = (decision: string | null) => {
    if (!decision) return "text-gray-500";
    const d = decision.toUpperCase();
    if (d === "APPROVE") return "text-green-700";
    if (d === "DECLINE" || d === "NOT_FOUND" || d === "DENY") return "text-red-700";
    return "text-amber-700";
  };

  return (
    <div className="space-y-3">
      {reports.map((r: any, idx: number) => {
        const isExpanded = expandedIdx === idx;
        const runNumber = reports.length - idx;
        const isAdminRerun = r.triggeredBy === "admin_rerun";
        const reportDate = r.reportDate || r.createdAt;

        return (
          <div key={r.id || idx} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Header — always visible, clickable */}
            <button
              type="button"
              onClick={() => setExpandedIdx(isExpanded ? null : idx)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500">Run #{runNumber}</span>
                <span className="text-sm text-gray-700">
                  {reportDate ? formatDate(reportDate) : "—"}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isAdminRerun ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                  {isAdminRerun ? `Admin Re-run${r.triggeredByAdmin ? ` by ${r.triggeredByAdmin}` : ""}` : "Merchant Submit"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {r.finalStatus && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(r.finalStatus)}`}>
                    {r.finalStatus}
                  </span>
                )}
                <span className="text-gray-400 text-sm">{isExpanded ? "▲" : "▼"}</span>
              </div>
            </button>

            {/* Expanded details */}
            {isExpanded && (
              <div className="px-4 py-4 space-y-4 bg-white">
                {/* Business snapshot */}
                {(r.businessName || r.einSsnMasked) && (
                  <div className="bg-gray-50 rounded-md p-3">
                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Business Data at Time of Verification</div>
                    <div className="flex gap-6 text-sm">
                      {r.businessName && <span><strong>Name:</strong> {r.businessName}</span>}
                      {r.einSsnMasked && <span><strong>EIN/SSN:</strong> {r.einSsnMasked}</span>}
                    </div>
                  </div>
                )}

                {/* Accurint results */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2">
                  <Field label="Transaction ID" value={r.transactionId} />
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">Accurint Decision</div>
                    <div className={`text-sm font-semibold ${decisionColor(r.accurintDecision)}`}>
                      {r.accurintDecision || "—"}
                    </div>
                  </div>
                  <Field label="Evidence Indicator" value={r.accurintEvidenceIndicator} />
                  <Field label="Risk Indicator" value={r.accurintRiskIndicator} />
                  {r.accurintReason && <div className="sm:col-span-2"><Field label="Reason" value={r.accurintReason} /></div>}
                </div>

                {/* Bridger results (if reached) */}
                {r.bridgerDecision && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Bridger Results</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">Bridger Decision</div>
                        <div className={`text-sm font-semibold ${decisionColor(r.bridgerDecision)}`}>
                          {r.bridgerDecision}
                        </div>
                      </div>
                      <Field label="Highest Entity Score" value={r.bridgerHighestScore != null ? String(r.bridgerHighestScore) : undefined} />
                    </div>
                  </div>
                )}

                {/* PDF — match legacy report to this versioned run by transactionId */}
                {legacyReport?.pdfReport && r.transactionId && legacyReport.transactionId === r.transactionId && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Report PDF</div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => openPdfInNewTab(legacyReport.pdfReport, `Accurint Report - Run #${runNumber}`)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4" /> View PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadPdf(legacyReport.pdfReport, `accurint-report-${r.transactionId}.pdf`)}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
                      >
                        <Download className="h-4 w-4" /> Download PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ───────────────── Bridger / Verification Results ───────────────── */

function BridgerDisplay({ session, accurintReports = [] }: { session: any; accurintReports?: any[] }) {
  const reason = session.reason || "";
  const hasVerificationReason = reason.toLowerCase().includes("bridger") ||
    reason.toLowerCase().includes("entity score") ||
    reason.toLowerCase().includes("screening");

  const bridgerRows: any[] = Array.isArray(session.bridgerResults)
    ? session.bridgerResults
    : [];

  const verificationResults =
    tryParseJson(session.entityVerification) ||
    session.verificationResults ||
    session.entityVerification;

  // Fallback: versioned accurint_reports with bridger columns
  const latestBridgerReport = accurintReports.find((r: any) => r.bridgerDecision);

  if (!bridgerRows.length && !verificationResults && !hasVerificationReason && !latestBridgerReport) {
    return <p className="text-sm text-gray-400 italic">No Bridger/entity screening results available for this application</p>;
  }

  // bridger_results rows
  if (bridgerRows.length > 0) {
    return (
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Searched Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Individual Score</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Business Score</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bridgerRows.map((r: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-2 text-gray-900 font-medium">{r.searchedName || "—"}</td>
                  <td className="px-4 py-2 text-gray-700">{r.individualScore ?? "—"}</td>
                  <td className="px-4 py-2 text-gray-700">{r.businessScore ?? "—"}</td>
                  <td className="px-4 py-2">
                    {r.decision ? <VerificationDecisionBadge decision={r.decision} /> : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {reason && hasVerificationReason && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-900">{reason}</p>
          </div>
        )}
      </div>
    );
  }

  // ── Fallback: versioned accurint_reports ────────────────────────────────
  if (latestBridgerReport && !verificationResults) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Overall Decision:</span>
          <VerificationDecisionBadge decision={latestBridgerReport.bridgerDecision} />
          {latestBridgerReport.bridgerHighestScore != null && (
            <span className="text-sm text-gray-500 ml-auto">
              Highest Entity Score: <strong>{latestBridgerReport.bridgerHighestScore}</strong>
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2">
          <Field label="Final Status" value={latestBridgerReport.finalStatus} />
          <Field label="Run Date" value={latestBridgerReport.reportDate ? formatDate(latestBridgerReport.reportDate) : undefined} />
          <Field label="Triggered By" value={latestBridgerReport.triggeredBy === "admin_rerun" ? `Admin Re-run${latestBridgerReport.triggeredByAdmin ? ` (${latestBridgerReport.triggeredByAdmin})` : ""}` : "Merchant Submit"} />
        </div>
        {reason && hasVerificationReason && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-900">{reason}</p>
          </div>
        )}
      </div>
    );
  }

  if (!verificationResults && hasVerificationReason) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">{reason}</p>
      </div>
    );
  }

   // Parse verification results — could be a VerificationSummary object
  const results = verificationResults;
  const overallDecision = results?.overallDecision || results?.decision;
  const highestScore = results?.highestEntityScore ?? results?.highestScore;
  const entities = results?.results || results?.entities || [];

  return (
    <div className="space-y-4">
      {/* Overall decision */}
      {overallDecision && (
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Overall Decision:</span>
          <VerificationDecisionBadge decision={overallDecision} />
          {highestScore !== undefined && (
            <span className="text-sm text-gray-500 ml-auto">
              Highest Entity Score: <strong>{highestScore}</strong>
            </span>
          )}
        </div>
      )}
      
      {/* Entity-level results */}
      {entities.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Searched Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Score</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entities.map((e: any, i: number) => {
                const maxScore = e.entityScores?.length ? Math.max(...e.entityScores) : null;
                const records = e.raw?.records || e.raw?.data?.records || [];
                const categories = Array.from(new Set(
                  records.flatMap((r: any) => {
                    const d = r.recordDetails || r;
                    return [d.category, d.matchCategory].filter(Boolean);
                  })
                )) as string[];
                return (
                  <tr key={i}>
                    <td className="px-4 py-2 text-gray-900 font-medium">{e.name || "—"}</td>
                    <td className="px-4 py-2 text-gray-500 capitalize">{e.entityType || "—"}</td>
                    <td className="px-4 py-2">
                      {maxScore !== null ? (
                        <span className={`font-semibold ${maxScore >= 95 ? "text-red-600" : maxScore >= 80 ? "text-amber-600" : "text-green-600"}`}>
                          {maxScore}
                        </span>
                      ) : "—"}
                      {records.length > 0 && (
                        <span className="ml-2 text-xs text-gray-400">
                          ({records.length} match{records.length !== 1 ? "es" : ""}{categories.length > 0 ? `: ${categories.join(", ")}` : ""})
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {e.decision ? <VerificationDecisionBadge decision={e.decision} /> : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {!overallDecision && entities.length === 0 && verificationResults && (
        <pre className="text-xs bg-gray-50 p-4 rounded-lg overflow-x-auto max-h-64">
          {JSON.stringify(verificationResults, null, 2)}
        </pre>
      )}
    </div>
  );
}

function VerificationDecisionBadge({ decision }: { decision: string }) {
  const d = decision.toUpperCase();
  let cls = "bg-gray-50 text-gray-700 border-gray-200";
  if (d === "APPROVE" || d === "APPROVED") cls = "bg-green-50 text-green-700 border-green-200";
  else if (d === "DENY" || d === "DENIED") cls = "bg-red-50 text-red-700 border-red-200";
  else if (d === "MANUAL_REVIEW" || d === "MANUAL REVIEW") cls = "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${cls}`}>
      {decision}
    </span>
  );
}

/* ───────────────── Common Helpers ───────────────── */

function Field({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">{label}</div>
      <div className="text-sm text-gray-900 break-words">{String(value)}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  let cls = "bg-gray-50 text-gray-700 border-gray-200";
  if (s === "approved" || s === "completed") cls = "bg-green-50 text-green-700 border-green-200";
  else if (s === "declined") cls = "bg-red-50 text-red-700 border-red-200";
  else if (s === "manual review") cls = "bg-amber-50 text-amber-700 border-amber-200";
  else if (s === "in_progress") cls = "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${cls}`}>
      {status}
    </span>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-6">
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  consent_electronic_records: "Consent to Electronic Records",
  merchant_agreement: "Merchant Agreement",
  privacy_policy: "Online Privacy Policy",
  operating_guide: "Merchant Operating Guide",
  schedule_a_fees: "Schedule A — Fees",
  schedule_b_fees: "Schedule B — Fees",
  schedule_c_ach: "Schedule C — ACH Authorization",
  schedule_d_privacy: "Schedule D — Privacy",
};

function formatDocumentType(raw: string): string {
  if (!raw || raw === "—") return "—";
  const key = raw.trim().toLowerCase();
  if (DOCUMENT_TYPE_LABELS[key]) return DOCUMENT_TYPE_LABELS[key];
  // Fallback: replace underscores with spaces and title-case
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(isoOrYmd?: string) {
  if (!isoOrYmd) return "—";
  try {
    const d = new Date(isoOrYmd);
    if (Number.isNaN(d.getTime())) return isoOrYmd;
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${mm}/${dd}/${yyyy} ${hh}:${min}`;
  } catch {
    return isoOrYmd;
  }
}

/** Safely parse a value that might be a JSON string, an object, or null. */
function tryParseJson(value: any): any {
  if (value === null || value === undefined) return null;
  if (typeof value === "object") return value; // already parsed
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return null;
}
