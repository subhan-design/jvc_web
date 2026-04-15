import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { US_STATES, US_STATE_CODES, US_STATES_WITH_CODES } from "@/data/us-states";
import { toast } from "sonner";
import {
  adminEditPersonalDetails,
  adminEditBusinessInformation,
  adminEditOwnership,
  adminAddOwner,
  adminEditAgreement,
  adminUpdateOwnerIntent,
  adminUpdateApplicationStatus,
  accurintEvaluateBusiness,
  getOnboardingSession,
  uploadAgreementDocuments,
  validateEmail,
  validateEin,
  validateSSN,
  verifyCannabisLicense,
} from "@/lib/api";
import { generatePdfFromUrl } from "@/lib/pdfGenerator";
import { runEntityVerification } from "@/lib/verification";
import { Pencil, X, Save, Plus, Trash2, AlertTriangle, RefreshCw, CheckCircle, XCircle, AlertOctagon, Loader2 } from "lucide-react";

/* ───────────────── Shared Types & Helpers ───────────────── */

// PII fields that come masked from the detail endpoint (e.g., ***-**-1234)
// These should NOT be pre-filled in edit forms and should only be sent if admin enters a new value
const PII_FIELDS = new Set([
  "socialSecurityNumber", "ssn", "einSsnNumber", "ein",
  "dob", "dateOfBirth", "accountNumber",
]);

function isMaskedValue(value: any): boolean {
  if (typeof value !== "string") return false;
  return /^\*{2,}/.test(value) || /\*{2,}/.test(value);
}

// Send ALL non-PII fields back (backend replaces entire JSON column).
// Only filter out PII fields that still have masked values — include PII only if admin typed a new value.
function buildPayload(formData: Record<string, any>, originalData: Record<string, any>): Record<string, any> {
  const payload: Record<string, any> = {};
  for (const [key, value] of Object.entries(formData)) {
    if (PII_FIELDS.has(key)) {
      // Only include PII field if admin typed a new, non-masked, non-empty value
      if (value && !isMaskedValue(value) && value !== originalData?.[key]) {
        payload[key] = value;
      }
      // Skip masked/empty PII — backend keeps existing value
    } else {
      // Always send non-PII fields so backend doesn't lose them
      payload[key] = value;
    }
  }
  return payload;
}

// re upload merchant agreement after edited
async function regenerateMerchantAgreementPdf(sessionId: string): Promise<void> {
  const timestamp = Date.now();
  const fileName = `merchant_agreement_${timestamp}.pdf`;

  const sessionResp = await getOnboardingSession(sessionId);
  const personal = sessionResp?.data?.personalDetails || {};
  const fullName = `${personal.firstName || ""} ${personal.lastName || ""}`.trim();
  const signatureDataUrl = sessionResp?.data?.agreement?.signature || null;

  const blob = await generatePdfFromUrl(
    `/docs/merchant-agreement/preview?sessionId=${encodeURIComponent(sessionId)}`,
    fileName
  );
  const file = new File([blob], fileName, { type: "application/pdf", lastModified: Date.now() });

  await uploadAgreementDocuments(sessionId, [
    {
      file,
      metadata: {
        fileName,
        documentType: "merchant_agreement",
        documentVersion: "Oct_2025_v1.0",
        merchantFullName: fullName,
        signatureDataUrl,
        acceptedAt: new Date().toISOString(),
      },
    },
  ]);
}

// Format EIN input (XX-XXXXXXX)
function formatEIN(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}-${digits.slice(2, 9)}`;
}

// Format SSN input (XXX-XX-XXXX)
function formatSSN(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
}


function DOBPicker({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  const [view, setView] = useState<'year' | 'month' | 'day'>('year');
  const [selectedYear, setSelectedYear] = useState(() => {
    if (value) { const parts = value.split('/'); return parseInt(parts[2]) || 2000; }
    return 2000;
  });
  const [selectedMonth, setSelectedMonth] = useState(() => {
    if (value) { const parts = value.split('/'); return (parseInt(parts[0]) - 1) || 0; }
    return 0;
  });
  const [open, setOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const maxYear = currentYear - 18;
  const years = Array.from({ length: maxYear - 1900 + 1 }, (_, i) => maxYear - i);
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const formatDOB = (raw: string) => {
    const digits = raw.replace(/D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const parsedDate =
  value && /^\d{2}\/\d{2}\/\d{4}$/.test(value)
    ? new Date(
        parseInt(value.split('/')[2]),
        parseInt(value.split('/')[0]) - 1,
        parseInt(value.split('/')[1])
      )
    : undefined;
  return (
    <Popover open={disabled ? false : open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <div className={`relative ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
          <input
            type="text"
            value={value}
            onChange={(e) => !disabled && onChange(formatDOB(e.target.value))}
            placeholder="MM/DD/YYYY"
            maxLength={10}
            disabled={disabled}
            className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200" : "border-gray-300"}`}
            onClick={() => !disabled && setOpen(true)}
          />
          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          {view === 'year' && (
            <div>
              <div className="text-sm font-semibold mb-3 text-center">Select Year</div>
              <div className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto">
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => { setSelectedYear(year); setView('month'); }}
                    className={`h-10 text-sm rounded-md border ${selectedYear === year ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:bg-gray-50'}`}
                  >{year}</button>
                ))}
              </div>
            </div>
          )}
          {view === 'month' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={() => setView('year')} className="text-sm font-semibold hover:bg-gray-100 px-2 py-1 rounded">
                  {selectedYear}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {months.map((month, index) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => { setSelectedMonth(index); setView('day'); }}
                    className={`h-10 text-sm rounded-md border ${selectedMonth === index ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:bg-gray-50'}`}
                  >{month.slice(0, 3)}</button>
                ))}
              </div>
            </div>
          )}
          {view === 'day' && (
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <button type="button" onClick={() => setView('month')} className="text-sm font-semibold hover:bg-gray-100 px-2 py-1 rounded">
                  {months[selectedMonth]} {selectedYear}
                </button>
              </div>
              <Calendar
                mode="single"
                selected={parsedDate}
                onSelect={(date) => {
                  if (date) {
                    const formatted = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
                    onChange(formatted);
                    setOpen(false);
                  }
                }}
                disabled={(date) => date > maxDate || date < new Date('1900-01-01')}
                month={new Date(selectedYear, selectedMonth)}
                onMonthChange={(month) => { setSelectedYear(month.getFullYear()); setSelectedMonth(month.getMonth()); }}
              />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface EditSectionProps {
  sessionId: string;
  data: any;
  onSaved: (data?: any) => void;
}

function InputField({
  label, value, onChange, disabled, type = "text", placeholder, error,
}: {
  label: string; value: string; onChange: (v: string) => void;
  disabled?: boolean; type?: string; placeholder?: string; error?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md text-sm ${
          disabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
            : error
            ? "bg-white text-gray-900 border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        }`}
      />
    </div>
  );
}

function SelectField({
  label, value, onChange, options, disabled, error,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; disabled?: boolean; error?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">{label}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md text-sm ${
          disabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
            : error
            ? "bg-white text-gray-900 border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        }`}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

const stateOptions = US_STATES.map((s) => ({ value: s, label: s }));
const stateCodeOptions = US_STATES_WITH_CODES.map((s) => ({ value: s.code, label: s.name }));

const TITLE_OPTIONS = [
  { value: "president", label: "President" },
  { value: "vp", label: "Vice President" },
  { value: "secretary", label: "Secretary" },
  { value: "treasurer", label: "Treasurer" },
  { value: "member", label: "Member" },
  { value: "manager", label: "Manager" },
  { value: "sole", label: "Sole Proprietor" },
];

const LEGAL_ENTITY_OPTIONS = [
  { value: "sole_proprietor", label: "Sole Proprietor" },
  { value: "partnership", label: "Partnership" },
  { value: "corporation", label: "Corporation (including S-Corp and Professional Corp)" },
  { value: "llc", label: "Limited Liability Corporation (LLC)" },
  { value: "not_for_profit", label: "Not-for-profit" },
];

/* ───────────────── Confirmation Modal ───────────────── */

function ConfirmSaveModal({
  open, saving, message, onConfirm, onCancel,
}: {
  open: boolean; saving: boolean; message: string;
  onConfirm: () => void; onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">Confirm Changes</h3>
            <p className="text-sm text-gray-600 mt-1">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={saving}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Confirm & Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── Edit Button for Section Header ───────────────── */

export function EditButton({ editing, onToggle, disabled }: { editing: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
        editing
          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
          : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {editing ? <><X className="h-3.5 w-3.5" /> Cancel</> : <><Pencil className="h-3.5 w-3.5" /> Edit</>}
    </button>
  );
}

/* ───────────────── Tab 1: Personal Details Edit ───────────────── */

export function EditPersonalDetails({ sessionId, data, onSaved, onNameChange }: EditSectionProps & { onNameChange?: (fullName: string) => void }) {
  // Clear masked PII fields so they show as empty in the form
  const [form, setForm] = useState(() => {
    const init = { ...data };
    if (isMaskedValue(init.socialSecurityNumber)) init.socialSecurityNumber = "";
    if (isMaskedValue(init.dob)) init.dob = "";
    return init;
  });
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "checking" | "available" | "exists">("idle");
  const [emailError, setEmailError] = useState("");

  const set = (key: string, val: string) => {
    setForm((p: any) => ({ ...p, [key]: val }));
    if (key === "email") { setEmailError(""); setEmailStatus("idle"); }
    if ((key === "firstName" || key === "lastName") && onNameChange) {
      const firstName = key === "firstName" ? val : form.firstName || "";
      const lastName = key === "lastName" ? val : form.lastName || "";
      onNameChange(`${firstName} ${lastName}`.trim());
    }
  };

  useEffect(() => {
    const email = form.email;
    if (!email || !email.includes("@") || email === data?.email) {
      setEmailStatus("idle");
      setEmailError("");
      return;
    }
    setEmailStatus("checking");
    const timer = setTimeout(async () => {
      try {
        const res = await validateEmail(email);
        if (res?.data?.exists) {
          setEmailStatus("exists");
          setEmailError(res?.data?.message || "Email is already in use");
        } else {
          setEmailStatus("available");
          setEmailError("");
        }
      } catch {
        setEmailStatus("idle");
        setEmailError("Unable to validate email");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [form.email]);

  const handleValidateAndConfirm = () => {
    if (emailStatus === "checking") { toast.error("Please wait for email validation to complete"); return; }
    if (emailStatus === "exists") { toast.error("Please fix the email address before saving"); return; }
    setShowConfirm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = buildPayload(form, data);
      await adminEditPersonalDetails(sessionId, payload);
      toast.success("Personal details updated successfully");
      setShowConfirm(false);
      onSaved(form);
    } catch (err: any) {
      toast.error(err.message || "Failed to save changes");
      return;
    } finally {
      setSaving(false);
    }
    try {
      await regenerateMerchantAgreementPdf(sessionId);
      toast.success("Merchant agreement document updated");
    } catch (pdfErr: any) {
      console.error("[AdminEdit] Failed to regenerate merchant agreement:", pdfErr);
      toast.warning("Data saved but merchant agreement document could not be regenerated");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        <SelectField
          label="Title"
          value={form.title}
          onChange={(v) => set("title", v)}
          options={TITLE_OPTIONS}
        />
        <InputField label="First Name" value={form.firstName} onChange={(v) => set("firstName", v)} />
        <InputField label="Last Name" value={form.lastName} onChange={(v) => set("lastName", v)} />
        <div>
          <InputField label="Email" value={form.email} onChange={(v) => set("email", v)} type="email" error={emailStatus === "exists"} />
          {emailStatus === "checking" && <p className="mt-1 text-xs text-gray-500 flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> Checking availability...</p>}
          {emailStatus === "available" && <p className="mt-1 text-xs text-green-600 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Email is available</p>}
          {emailStatus === "exists" && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><XCircle className="h-3 w-3" /> {emailError}</p>}
        </div>
        <InputField label="Phone" value={form.phone} onChange={() => {}} disabled />
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
          <DOBPicker value={form.dob} onChange={(v) => set("dob", v)} />
        </div>
        {/* <InputField label="SSN" value={form.socialSecurityNumber} onChange={(v) => set("socialSecurityNumber", formatSSN(v))} placeholder="XXX-XX-XXXX" /> */}
        <SelectField
          label="Owner Intent (25%+)"
          value={form.ownerIntent}
          onChange={(v) => set("ownerIntent", v)}
          options={[
            { value: "-", label: "-" },
            { value: "yes", label: "Yes" },
            
          ]}
        />
      </div>

      {/* Referral Code - read only */}
      <div className="mt-4">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">Referral Code</div>
        <div className="text-sm text-gray-900">{form.referralCode || "N/A"}</div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleValidateAndConfirm}
          disabled={emailStatus === "checking" || emailStatus === "exists"}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4" /> {emailStatus === "checking" ? "Validating..." : "Save Changes"}
        </button>
      </div>

      <ConfirmSaveModal
        open={showConfirm}
        saving={saving}
        message="Saving changes to personal details. You can re-run verification separately after saving. Continue?"
        onConfirm={handleSave}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

/* ─────��─────────── Tab 2: Business Information Edit ───────────────── */

export function EditBusinessInformation({ sessionId, data, onSaved }: EditSectionProps) {
  const [form, setForm] = useState(() => {
    const init = { ...data };
    if (isMaskedValue(init.einSsnNumber)) init.einSsnNumber = "";
    return init;
  });
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validating, setValidating] = useState(false);
  const [einSsnStatus, setEinSsnStatus] = useState<"idle" | "checking" | "available" | "exists">("idle");
  const [einSsnError, setEinSsnError] = useState("");
  const [licenseError, setLicenseError] = useState("");

  const set = (key: string, val: string) => {
    setForm((p: any) => ({ ...p, [key]: val }));
    if (key === "einSsnNumber" || key === "einSsnSelection") { setEinSsnError(""); setEinSsnStatus("idle"); }
    if (key === "licenseNumber" || key === "licenseState") setLicenseError("");
  };

  useEffect(() => {
    const num = form.einSsnNumber;
    if (!num || isMaskedValue(num) || num === data?.einSsnNumber) {
      setEinSsnStatus("idle");
      setEinSsnError("");
      return;
    }
    setEinSsnStatus("checking");
    const timer = setTimeout(async () => {
      try {
        const res = form.einSsnSelection === "ein"
          ? await validateEin(num)
          : await validateSSN(num);
        if (res?.data?.exists) {
          setEinSsnStatus("exists");
          setEinSsnError(res?.data?.message || `${form.einSsnSelection?.toUpperCase() || "EIN/SSN"} is already in use`);
        } else {
          setEinSsnStatus("available");
          setEinSsnError("");
        }
      } catch {
        setEinSsnStatus("idle");
        setEinSsnError("Unable to validate EIN/SSN");
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [form.einSsnNumber, form.einSsnSelection]);

  const handleValidateAndConfirm = async () => {
    if (einSsnStatus === "checking") { toast.error("Please wait for EIN/SSN validation to complete"); return; }
    if (einSsnStatus === "exists") { toast.error("Please fix the EIN/SSN before saving"); return; }

    const requiresLicenseVerification =
      (form.licenseType === "cannabis" || form.licenseType === "psilocybin") &&
      (form.licenseNumber !== data?.licenseNumber || form.licenseState !== data?.licenseState);

    if (requiresLicenseVerification) {
      if (!form.licenseNumber?.trim()) {
        setLicenseError("License number is required for verification");
        return;
      }
      if (!form.licenseState?.trim()) {
        setLicenseError("License state is required for verification");
        return;
      }
      setValidating(true);
      setLicenseError("");
      try {
        const stateCode = US_STATE_CODES[form.licenseState] || form.licenseState.slice(0, 2).toUpperCase();
        const resp = await verifyCannabisLicense(form.licenseNumber, stateCode, 'USA');
        const licenseInfo = Array.isArray(resp.data) && resp.data.length ? resp.data[0] : null;
        if (!licenseInfo) {
          setLicenseError("License could not be verified — no matching license found");
          await adminUpdateApplicationStatus(sessionId, "Declined", "Cannabis/Psilocybin license verification failed — no matching license found", null, "licenseVerification");
          return;
        }
        const status = (licenseInfo.status || '').toUpperCase();
        if (status !== 'ACTIVE') {
          const reason = `Cannabis/Psilocybin license verification failed. Status: ${licenseInfo.status || 'unknown'}`;
          toast.warning(`License status is ${licenseInfo.status || 'unknown'}. Application marked as Declined.`);
          await adminUpdateApplicationStatus(sessionId, "Declined", reason, null, "licenseVerification");
        }
      } catch (err: any) {
        setLicenseError(err?.message || "License verification failed");
        await adminUpdateApplicationStatus(sessionId, "Declined", `Cannabis/Psilocybin license verification failed: ${err?.message || 'unknown error'}`, null, "licenseVerification");
        return;
      } finally {
        setValidating(false);
      }
    }

    setShowConfirm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = buildPayload(form, data);
      await adminEditBusinessInformation(sessionId, payload);
      toast.success("Business information updated successfully");
      setShowConfirm(false);
      onSaved();
    } catch (err: any) {
      toast.error(err.message || "Failed to save changes");
      return;
    } finally {
      setSaving(false);
    }
    try {
      await regenerateMerchantAgreementPdf(sessionId);
      toast.success("Merchant agreement document updated");
    } catch (pdfErr: any) {
      console.error("[AdminEdit] Failed to regenerate merchant agreement:", pdfErr);
      toast.warning("Data saved but merchant agreement document could not be regenerated");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        <InputField label="Legal Business Name" value={form.legalNameOfBusiness} onChange={(v) => set("legalNameOfBusiness", v)} />
        <InputField label="DBA" value={form.dbaIfApplicable} onChange={(v) => set("dbaIfApplicable", v)} />
        <SelectField
          label="EIN/SSN Selection"
          value={form.einSsnSelection}
          onChange={(v) => set("einSsnSelection", v)}
          options={[
            { value: "ein", label: "EIN" },
            { value: "ssn", label: "SSN" },
          ]}
        />
        <div>
          <InputField
            label="EIN/SSN Number"
            value={form.einSsnNumber}
            onChange={(v) => {
              const formatted = form.einSsnSelection === "ein" ? formatEIN(v) : form.einSsnSelection === "ssn" ? formatSSN(v) : v;
              set("einSsnNumber", formatted);
            }}
            placeholder={form.einSsnSelection === "ein" ? "XX-XXXXXXX" : form.einSsnSelection === "ssn" ? "XXX-XX-XXXX" : "Leave empty to keep current value"}
            error={einSsnStatus === "exists"}
          />
          {einSsnStatus === "checking" && <p className="mt-1 text-xs text-gray-500 flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> Checking availability...</p>}
          {einSsnStatus === "available" && <p className="mt-1 text-xs text-green-600 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> {form.einSsnSelection?.toUpperCase() || "EIN/SSN"} is available</p>}
          {einSsnStatus === "exists" && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><XCircle className="h-3 w-3" /> {einSsnError}</p>}
        </div>
        <InputField label="Date Business Started" value={form.dateBusinessStarted} onChange={(v) => set("dateBusinessStarted", v)} placeholder="MM/DD/YYYY" />
        <InputField label="Website" value={form.businessWebsite} onChange={(v) => set("businessWebsite", v)} />
        <InputField label="Address" value={form.address} onChange={(v) => set("address", v)} />
        <InputField label="City" value={form.city} onChange={(v) => set("city", v)} />
        <SelectField label="State" value={form.state} onChange={(v) => set("state", v)} options={stateOptions} />
        <InputField label="ZIP Code" value={form.zipcode} onChange={(v) => set("zipcode", v)} />
        <SelectField
          label="Legal Entity"
          value={form.legalEntity}
          onChange={(v) => set("legalEntity", v)}
          options={LEGAL_ENTITY_OPTIONS}
        />
        <SelectField label="State Registered" value={form.stateWhereRegistered} onChange={(v) => set("stateWhereRegistered", v)} options={stateCodeOptions} />
        <SelectField
          label="Existed as Other Entity"
          value={form.hasExistedAsOtherEntity}
          onChange={(v) => set("hasExistedAsOtherEntity", v)}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {form.hasExistedAsOtherEntity === "yes" && (
          <InputField label="Previous Entity Name" value={form.entity} onChange={(v) => set("entity", v)} />
        )}
        <SelectField
          label="License Type"
          value={form.licenseType}
          onChange={(v) => set("licenseType", v)}
          options={[
            { value: "cannabis", label: "Cannabis License" },
            { value: "psilocybin", label: "Psilocybin License" },
            { value: "other", label: "Other" },
            { value: "none", label: "Non-Licensed" },
          ]}
        />
        {form.licenseType && form.licenseType !== "none" && (
          <>
            <div>
              <InputField label="License Number" value={form.licenseNumber} onChange={(v) => set("licenseNumber", v)} />
              {licenseError && <p className="mt-1 text-xs text-red-600">{licenseError}</p>}
            </div>
            <SelectField label="License State" value={form.licenseState} onChange={(v) => set("licenseState", v)} options={stateOptions} />
          </>
        )}
        {form.licenseType === "other" && (
          <div>
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">License Image</label>
            <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-md p-2">
              License image upload is handled during merchant onboarding. To update the license image, the merchant must re-upload through their application.
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleValidateAndConfirm}
          disabled={validating || einSsnStatus === "checking" || einSsnStatus === "exists"}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4" /> {(validating || einSsnStatus === "checking") ? "Validating..." : "Save Changes"}
        </button>
      </div>

      <ConfirmSaveModal
        open={showConfirm}
        saving={saving}
        message="Saving changes to business information. You can re-run verification separately after saving. Continue?"
        onConfirm={handleSave}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

/* ───────────────── Tab 3: Ownership Edit ───────────────── */

function OwnerForm({
  owner, index, onChange, onRemove, isNew, phoneEditable, readOnly, displayNumber, showErrors,
}: {
  owner: any; index: number; onChange: (idx: number, key: string, val: string) => void;
  onRemove?: (idx: number) => void; isNew?: boolean; phoneEditable?: boolean; readOnly?: boolean; displayNumber?: number; showErrors?: boolean;
}) {
  const set = (key: string, val: string) => onChange(index, key, val);
  const req = (val: string | undefined) => showErrors && !val?.trim();

  const dobValue = isMaskedValue(owner.dateOfBirth) ? "" : owner.dateOfBirth;

  return (
    <div className={`${(displayNumber ?? index + 1) > 1 ? "pt-4 border-t border-gray-200" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {`Owner ${displayNumber ?? index + 1}`}
          {readOnly && <span className="ml-2 text-xs font-normal text-amber-600">(linked to applicant — edit via Personal Details)</span>}
        </div>
        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        <InputField label="First Name" value={owner.firstName} onChange={(v) => set("firstName", v)} disabled={readOnly} error={req(owner.firstName)} />
        <InputField label="Last Name" value={owner.lastName} onChange={(v) => set("lastName", v)} disabled={readOnly} error={req(owner.lastName)} />
        <SelectField
          label="Title"
          value={owner.title}
          onChange={(v) => set("title", v)}
          disabled={readOnly}
          options={TITLE_OPTIONS}
          error={req(owner.title)}
        />
        <InputField label="SSN" value={isMaskedValue(owner.ssn) ? "" : owner.ssn} onChange={(v) => set("ssn", formatSSN(v))} placeholder="XXX-XX-XXXX" error={req(isMaskedValue(owner.ssn) ? "" : owner.ssn)} />
        <div>
          <label className={`block text-xs font-medium mb-1 ${req(dobValue) ? "text-red-600" : "text-gray-600"}`}>Date of Birth</label>
          <div className={req(dobValue) ? "ring-1 ring-red-500 rounded-md" : ""}>
            <DOBPicker value={dobValue} onChange={(v) => set("dateOfBirth", v)} disabled={readOnly} />
          </div>
        </div>
        <InputField label="Phone" value={owner.telephoneNumber} onChange={(v) => (isNew || phoneEditable) ? set("telephoneNumber", v) : undefined} disabled={readOnly} error={req(owner.telephoneNumber)} />
        <InputField label="Email" value={owner.email} onChange={(v) => set("email", v)} type="email" disabled={readOnly} error={req(owner.email)} />
        <InputField label="Ownership %" value={owner.ownershipPercentage} onChange={(v) => set("ownershipPercentage", v)} disabled={readOnly} error={req(owner.ownershipPercentage)} />
        <InputField label="Home Address" value={owner.homeAddress} onChange={(v) => set("homeAddress", v)} error={req(owner.homeAddress)} />
        <InputField label="Address Line 2" value={owner.address2} onChange={(v) => set("address2", v)} />
        <InputField label="City" value={owner.city} onChange={(v) => set("city", v)} error={req(owner.city)} />
        <SelectField label="State" value={owner.state} onChange={(v) => set("state", v)} options={stateOptions} error={req(owner.state)} />
        <InputField label="ZIP Code" value={owner.zipCode} onChange={(v) => set("zipCode", v)} error={req(owner.zipCode)} />
      </div>
    </div>
  );
}

export function EditOwnership({ sessionId, data, onSaved, personalPhone, ownerIntent }: EditSectionProps & { personalPhone?: string; ownerIntent?: string }) {
  const existingOwners = data?.owners || (Array.isArray(data) ? data : []);
  const [owners, setOwners] = useState<any[]>(() => existingOwners.map((o: any) => ({ ...o })));
  const [newOwners, setNewOwners] = useState<any[]>([]);
  const [newOwnerErrors, setNewOwnerErrors] = useState<boolean[]>([]);
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const totalOwners = owners.length + newOwners.length;

  const handleOwnerChange = (idx: number, key: string, val: string) => {
    setOwners((prev) => prev.map((o, i) => (i === idx ? { ...o, [key]: val } : o)));
  };

  const handleNewOwnerChange = (idx: number, key: string, val: string) => {
    setNewOwners((prev) => prev.map((o, i) => (i === idx ? { ...o, [key]: val } : o)));
  };

  const addOwner = () => {
    if (totalOwners >= 4) {
      toast.error("Maximum 4 beneficial owners allowed");
      return;
    }
    setNewOwners((prev) => [...prev, {
      firstName: "", lastName: "", title: "", ssn: "", dateOfBirth: "",
      telephoneNumber: "", email: "", ownershipPercentage: "",
      homeAddress: "", address2: "", city: "", state: "", zipCode: "",
    }]);
  };

  const removeNewOwner = (idx: number) => {
    setNewOwners((prev) => prev.filter((_, i) => i !== idx));
    setNewOwnerErrors((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Only send changed fields per owner — prevents overwriting existing data
      const cleanedOwners = owners.map((o, i) => buildPayload(o, existingOwners[i]));
      await adminEditOwnership(sessionId, { owners: cleanedOwners });

      // Add new owners one by one
      for (const newOwner of newOwners) {
        await adminAddOwner(sessionId, newOwner);
      }

      toast.success("Ownership updated successfully");
      setShowConfirm(false);
      onSaved(owners);
    } catch (err: any) {
      toast.error(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {owners.map((owner, idx) => (
          <OwnerForm key={idx} owner={owner} index={idx} onChange={handleOwnerChange}
            readOnly={idx === 0 && ownerIntent === "yes"}
            phoneEditable={!(personalPhone && owner.telephoneNumber &&
              owner.telephoneNumber.replace(/\D/g, "") === personalPhone.replace(/\D/g, ""))} />
        ))}

        {newOwners.map((owner, idx) => (
          <OwnerForm
            key={`new-${idx}`}
            owner={owner}
            index={idx}
            onChange={handleNewOwnerChange}
            onRemove={removeNewOwner}
            displayNumber={owners.length + idx + 1}
            phoneEditable
            showErrors={!!newOwnerErrors[idx]}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={addOwner}
          disabled={totalOwners >= 4}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" /> Add Owner {totalOwners >= 4 && "(Max 4)"}
        </button>
        <button
          type="button"
          onClick={() => {
            const REQUIRED_OWNER_FIELDS: { key: string; label: string }[] = [
              { key: "firstName", label: "First Name" },
              { key: "lastName", label: "Last Name" },
              { key: "title", label: "Title" },
              { key: "ssn", label: "SSN" },
              { key: "dateOfBirth", label: "Date of Birth" },
              { key: "telephoneNumber", label: "Phone" },
              { key: "email", label: "Email" },
              { key: "ownershipPercentage", label: "Ownership %" },
              { key: "homeAddress", label: "Home Address" },
              { key: "city", label: "City" },
              { key: "state", label: "State" },
              { key: "zipCode", label: "ZIP Code" },
            ];
            const errors = newOwners.map((o) =>
              REQUIRED_OWNER_FIELDS.some((f) => !o[f.key]?.trim())
            );
            if (errors.some(Boolean)) {
              setNewOwnerErrors(errors);
              const firstIdx = errors.findIndex(Boolean);
              const firstMissing = REQUIRED_OWNER_FIELDS.find((f) => !newOwners[firstIdx][f.key]?.trim());
              toast.error(`Owner ${owners.length + firstIdx + 1}: ${firstMissing!.label} is required`);
              return;
            }
            setNewOwnerErrors([]);
            setShowConfirm(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      <ConfirmSaveModal
        open={showConfirm}
        saving={saving}
        message="Saving ownership changes. New owners will be checked for duplicates. You can re-run verification separately after saving. Continue?"
        onConfirm={handleSave}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

/* ───────────────── Tab 5: Agreement Edit ───────────────── */

export function EditAgreement({ sessionId, data, onSaved, overrideFullName }: EditSectionProps & { overrideFullName?: string | null }) {
  const [form, setForm] = useState(() => ({ ...data }));
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const set = (key: string, val: any) => setForm((p: any) => ({ ...p, [key]: val }));

  // Sync fullName when personal details firstName/lastName change
  useEffect(() => {
    if (overrideFullName) {
      setForm((p: any) => ({ ...p, fullName: overrideFullName }));
    }
  }, [overrideFullName]);

  const nameChanged = form.fullName !== data?.fullName;

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminEditAgreement(sessionId, form);
      toast.success("Agreement updated successfully");
      setShowConfirm(false);
      onSaved();
    } catch (err: any) {
      toast.error(err.message || "Failed to save changes");
      return;
    } finally {
      setSaving(false);
    }
    try {
      await regenerateMerchantAgreementPdf(sessionId);
      toast.success("Merchant agreement document updated");
    } catch (pdfErr: any) {
      console.error("[AdminEdit] Failed to regenerate merchant agreement:", pdfErr);
      toast.warning("Data saved but merchant agreement document could not be regenerated");
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <InputField label="Full Name" value={form.fullName} disabled={true} onChange={(v) => set("fullName", v)} />
          <InputField label="Signature" value={form.signature} onChange={(v) => set("signature", v)} />
        </div>

        {nameChanged && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-800">
              <strong>Note:</strong> Changing the full name will require the merchant agreement document to be regenerated.
            </p>
          </div>
        )}

        <div className="pt-3 border-t border-gray-100">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Consent Switches</div>
          <div className="space-y-2">
            <CheckboxField
              label="Consent to Electronic Records"
              checked={form.ConsentElectronicRecordsPreview}
              onChange={(v) => set("ConsentElectronicRecordsPreview", v)}
            />
            <CheckboxField
              label="Merchant Agreement"
              checked={form.MerchantAgreementPreview}
              onChange={(v) => set("MerchantAgreementPreview", v)}
            />
            <CheckboxField
              label="Merchant Operating Guide"
              checked={form.merchantOperatingGuide}
              onChange={(v) => set("merchantOperatingGuide", v)}
            />
            <CheckboxField
              label="Online Privacy Policy"
              checked={form.OnlinePrivacyPolicyConsumerPreview}
              onChange={(v) => set("OnlinePrivacyPolicyConsumerPreview", v)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      <ConfirmSaveModal
        open={showConfirm}
        saving={saving}
        message={
          nameChanged
            ? "Full name has changed. The merchant agreement document will need to be regenerated. Continue?"
            : "Saving agreement changes. Continue?"
        }
        onConfirm={handleSave}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

function CheckboxField({ label, checked, onChange }: { label: string; checked?: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-gray-900">{label}</span>
    </label>
  );
}

/* ───────────────── Edit History Display ───────────────── */

export function EditHistoryDisplay({ history }: { history: any[] }) {
  if (!history || history.length === 0) {
    return <p className="text-sm text-gray-400 italic">No edit history available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Admin</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Tab</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Field</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Old Value</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">New Value</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Verification</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {history.map((h: any, i: number) => (
            <tr key={i}>
              <td className="px-4 py-2 text-gray-600 whitespace-nowrap">{formatHistoryDate(h.createdAt)}</td>
              <td className="px-4 py-2 text-gray-900">{h.adminEmail || `Admin #${h.adminUserId}`}</td>
              <td className="px-4 py-2 text-gray-600">{formatTabName(h.tabName)}</td>
              <td className="px-4 py-2 text-gray-600">{formatFieldName(h.fieldName)}</td>
              <td className="px-4 py-2 text-red-600">{h.oldValue || "—"}</td>
              <td className="px-4 py-2 text-green-600">{h.newValue || "—"}</td>
              <td className="px-4 py-2 text-gray-500 text-xs">{h.verificationTriggered || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatHistoryDate(iso?: string) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

function formatTabName(tab?: string) {
  if (!tab) return "—";
  return tab.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatFieldName(field?: string) {
  if (!field) return "—";
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/* ───────────────── Re-run Verification ───────────────── */

interface RerunVerificationProps {
  sessionId: string;
  session: any;
  onComplete: () => void;
}

export function RerunVerification({ sessionId, session, onComplete }: RerunVerificationProps) {
  const [running, setRunning] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [result, setResult] = useState<{
    status: string;
    applicationStatus: string | null;
    reason: string | null;
  } | null>(null);

  const handleRerun = async () => {
    setRunning(true);
    setResult(null);
    setShowConfirm(false);

    try {
      // Build merchant data from session (same structure as AdditionalInformation.tsx expects)
      let merchantData = {
        personalDetails: session.personalDetails || {},
        businessInformation: session.businessInformation || {},
        ownership: session.ownership || {},
        bankInformation: session.bankInformation || {},
        agreement: session.agreement || {},
      };

      // Also try to get fresh data from server
      try {
        const sessionData = await getOnboardingSession(sessionId);
        if (sessionData?.data) {
          merchantData = {
            personalDetails: sessionData.data.personalDetails || merchantData.personalDetails,
            businessInformation: sessionData.data.businessInformation || merchantData.businessInformation,
            ownership: sessionData.data.ownership || merchantData.ownership,
            bankInformation: sessionData.data.bankInformation || merchantData.bankInformation,
            agreement: sessionData.data.agreement || merchantData.agreement,
          };
        }
      } catch {
        console.warn("[RerunVerification] Could not fetch fresh session data, using cached");
      }

      const businessInfo = merchantData.businessInformation;
      const personalInfo = merchantData.personalDetails;

      if (!businessInfo?.legalNameOfBusiness) {
        toast.error("Business information is missing — cannot run verification");
        setRunning(false);
        return;
      }

      // --- Step 1: Accurint Business Evaluation ---
      console.log("[RerunVerification] Running Accurint business evaluation...");
      const cleanPhone = personalInfo?.phone?.replace(/\D/g, "") || "";
      const cleanTin = businessInfo.einSsnNumber?.replace(/-/g, "") || "";

      let businessId: number | undefined;
      try {
        const sd = await getOnboardingSession(sessionId);
        businessId = sd?.businessId || sd?.data?.businessId;
      } catch {
        // ignore
      }

      const accurintPayload = {
        companyName: businessInfo.legalNameOfBusiness,
        streetAddress1: businessInfo.address,
        city: businessInfo.city,
        state: businessInfo.state,
        zip5: businessInfo.zipcode?.substring(0, 5),
        phone: cleanPhone,
        tin: cleanTin,
        ...(businessId && { businessId }),
        sessionId,
      };

      const accurintResult = await accurintEvaluateBusiness(accurintPayload);
      console.log("[RerunVerification] Accurint result:", accurintResult);

      let accurintEvidenceIndicator: string | null = null;
      let accurintRiskIndicator: string | null = null;
      let accurintDecision: string | null = null;
      let accurintReason: string | null = null;

      if (accurintResult?.data) {
        accurintEvidenceIndicator = accurintResult.data.evidenceIndicator || null;
        accurintRiskIndicator = accurintResult.data.riskIndicator || null;
        accurintDecision = accurintResult.data.decision;
        accurintReason = accurintResult.data.reason;
      }

      let status = "denied";
      let applicationStatus: string | null = null;
      let reason: string | null = null;

      // --- Step 2: Accurint Decisioning (same logic as AdditionalInformation.tsx) ---
      if (accurintDecision === "NOT_FOUND") {
        status = "denied";
        applicationStatus = "Declined";
        reason = "Accurint Evaluation: Business Not Found";
      } else if (accurintDecision === "DECLINE") {
        status = "denied";
        applicationStatus = "Declined";
        reason = `Accurint Evaluation: Evidence ${accurintEvidenceIndicator}, Risk ${accurintRiskIndicator} | ${accurintReason}`;
      } else if (accurintDecision === "REVIEW") {
        status = "review";
        applicationStatus = "Manual Review";
        reason = `Accurint Evaluation: Evidence ${accurintEvidenceIndicator}, Risk ${accurintRiskIndicator} | ${accurintReason}`;
      } else if (accurintDecision === "APPROVE") {
        // --- Step 3: Bridger verification ---
        console.log("[RerunVerification] Accurint APPROVE — running Bridger...");
        const verification = await runEntityVerification(merchantData, accurintResult);
        console.log("[RerunVerification] Bridger result:", verification);

        const businessResults = (verification.results || []).filter(
          (r: any) => r.entityType === "business" && r.provider === "bridger"
        );
        const isBusinessIndicatorsLow = (raw: any) => {
          if (!raw) return false;
          try {
            const s = JSON.stringify(raw).toLowerCase();
            return s.includes("businessevidencestatus") && s.includes("businessriskstatus") && s.includes("low");
          } catch { return false; }
        };
        const anyBusinessLow = businessResults.some((r: any) => isBusinessIndicatorsLow(r.raw));

        if (verification.overallDecision === "DENY" || verification.highestEntityScore >= 95) {
          status = "denied";
          applicationStatus = "Declined";
          reason = verification.reason || `Bridger Entity Score: ${verification.highestEntityScore}`;
        } else if (
          verification.overallDecision === "MANUAL_REVIEW" ||
          (verification.highestEntityScore >= 80 && verification.highestEntityScore < 95) ||
          verification.highestEntityScore === 0
        ) {
          status = "review";
          applicationStatus = "Manual Review";
          reason = verification.reason || `Bridger Entity Score: ${verification.highestEntityScore}`;
        } else if (anyBusinessLow || (verification.highestEntityScore > 0 && verification.highestEntityScore < 80)) {
          status = "approved";
          applicationStatus = "Approved";
        }
      } else {
        status = "denied";
        applicationStatus = "Declined";
        reason = "Accurint Evaluation: Business Not Found";
      }

      // --- Step 4: Submit the final decision ---
      console.log("[RerunVerification] Final:", { status, applicationStatus, reason });
      await adminUpdateApplicationStatus(sessionId, applicationStatus!, reason, accurintResult);

      setResult({ status, applicationStatus, reason });
      toast.success(`Verification complete — ${applicationStatus}`);
      onComplete();
    } catch (err: any) {
      console.error("[RerunVerification] Error:", err);
      toast.error(err.message || "Verification failed");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={running}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${running ? "animate-spin" : ""}`} />
          {running ? "Running Verification..." : "Re-run Verification"}
        </button>
        <p className="text-xs text-gray-500">
          Runs Accurint + Bridger with current application data and updates the application status.
        </p>
      </div>

      {result && (
        <div className={`flex items-start gap-3 p-4 rounded-lg border ${
          result.status === "approved"
            ? "bg-green-50 border-green-200"
            : result.status === "review"
            ? "bg-amber-50 border-amber-200"
            : "bg-red-50 border-red-200"
        }`}>
          {result.status === "approved" ? (
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          ) : result.status === "review" ? (
            <AlertOctagon className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <div className="text-sm font-medium">
              Result: <strong>{result.applicationStatus}</strong>
            </div>
            {result.reason && (
              <p className="text-xs text-gray-600 mt-1">{result.reason}</p>
            )}
          </div>
        </div>
      )}

      <ConfirmSaveModal
        open={showConfirm}
        saving={running}
        message="This will re-run Accurint business evaluation and Bridger entity screening with the current application data. The application status will be updated based on the verification results (Approved / Declined / Manual Review). Continue?"
        onConfirm={handleRerun}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
