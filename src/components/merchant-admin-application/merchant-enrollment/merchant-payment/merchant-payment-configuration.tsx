import { useEffect, useMemo, useState } from "react";
import {
  PaymentConfigurationResponse,
  approvePaymentConfiguration,
  getAllPaymentConfigurations,
  updatePaymentConfiguration
} from "@/lib/api";

/* ---------------- Types ---------------- */
type FeeConfig = {
  feeType: string;
  amount: number; // dollars
};

type ScheduleRow = {
  id: number;
  businessId: number;
  date: string;            // ISO or YYYY-MM-DD
  merchant: string;
  state: string;
  percentage: number;      // e.g., 2.6 means 2.6%
  minimum: number;         // dollars
  authorizedBy: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUPERSEDED";
};

/* ---------------- Mock (fallback) ---------------- */
const MOCK_FEE: FeeConfig = { feeType: "XYZ Fee Type", amount: 56 };

/* ---------------- Component ---------------- */
export default function MerchantPaymentConfiguration() {
  const [fee, setFee] = useState<FeeConfig | null>(null);
  const [rows, setRows] = useState<ScheduleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [editingRow, setEditingRow] = useState<{ id: number; percentage: string; minimum: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchConfigurations = async () => {
    setLoading(true);
    try {
      const configs = await getAllPaymentConfigurations();

      if (configs && configs.length > 0) {
        const transformedRows: ScheduleRow[] = configs.map((config: PaymentConfigurationResponse) => ({
          id: config.id,
          businessId: config.businessId ?? 0,
          date: config.createdDate || new Date().toISOString(),
          merchant: config.businessName || (config.sessionId ? `Session: ${config.sessionId.slice(0, 8)}…` : `Business #${config.businessId}`),
          state: config.state,
          percentage: config.feePercentage,
          minimum: config.minimumFee,
          authorizedBy: config.createdByName || "Admin",
          status: config.approvalStatus as "PENDING" | "APPROVED" | "REJECTED" | "SUPERSEDED",
        }));
        setRows(transformedRows);
      } else {
        setRows([]);
      }
      setFee(MOCK_FEE);
    } catch (err) {
      console.error('Failed to fetch configurations:', err);
      setFee(MOCK_FEE);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) =>
      [r.merchant, r.state, r.authorizedBy]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    );
  }, [rows, q]);

  async function handleApprove(row: ScheduleRow) {
    setRows((prev) =>
      prev.map((r) => (r.id === row.id ? { ...r, status: "APPROVED" } : r))
    );
    try {
      await approvePaymentConfiguration(row.id, true, undefined, "Approved by admin");
      await fetchConfigurations();
      alert("Configuration approved and activated successfully");
    } catch (e: any) {
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: row.status } : r))
      );
      const msg = e?.responseText
        ? (() => { try { return JSON.parse(e.responseText).message; } catch { return null; } })()
        : null;
      alert(msg || "Unable to approve configuration. Please try again.");
      console.error(e);
    }
  }

  async function handleReject(row: ScheduleRow) {
    const reason = prompt("Please enter rejection reason:");
    if (!reason) return;

    try {
      await approvePaymentConfiguration(row.id, false, reason);
      await fetchConfigurations();
      alert("Configuration rejected successfully");
    } catch (e: any) {
      const msg = e?.responseText
        ? (() => { try { return JSON.parse(e.responseText).message; } catch { return null; } })()
        : null;
      alert(msg || "Unable to reject configuration. Please try again.");
      console.error(e);
    }
  }

  function startEditing(row: ScheduleRow) {
    setEditingRow({ id: row.id, percentage: String(row.percentage), minimum: String(row.minimum) });
  }

  function cancelEditing() {
    setEditingRow(null);
  }

  async function handleSaveInline(row: ScheduleRow) {
    if (!editingRow) return;
    const newPercentage = parseFloat(editingRow.percentage);
    const newMinimum = parseFloat(editingRow.minimum);
    if (isNaN(newPercentage) || isNaN(newMinimum)) {
      alert("Please enter valid numbers for percentage and minimum.");
      return;
    }
    if (newPercentage === row.percentage && newMinimum === row.minimum) {
      setEditingRow(null);
      return;
    }
    setSaving(true);
    try {
      await updatePaymentConfiguration(row.id, {
        businessId: row.businessId,
        feePercentage: newPercentage,
        minimumFee: newMinimum,
        state: row.state
      });
      setEditingRow(null);
      await fetchConfigurations();
    } catch (e) {
      alert("Unable to update configuration. Please try again.");
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-jvc-blue-950 flex-1 pt-24">
      <div className="border-t border-white/20 w-full" />

      {/* Hero */}
      <section className="bg-jvc-blue-950 text-white py-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-300 mb-6">
            <span className="text-gray-400">Home</span>&nbsp;›&nbsp;
            <span className="text-white font-medium">Merchant Enrollment</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            Merchant Payment Configuration
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {/* Transaction Processing Fee */}
          <h2 className="text-base md:text-2xl font-semibold text-jvc-blue-900 mb-3 md:py-4">
            Transaction Processing Fee
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <Th>Fee Type</Th>
                  <Th>Amount</Th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {loading ? (
                  <SkeletonRow cols={2} />
                ) : (
                  <tr>
                    <Td>{"Transaction Processing Fee"}</Td>
                    <Td>4.75% of the Gross Sale amount ($3 minimum) plus any Distribution/Referral partner fee amount.</Td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Schedule header */}
          <div className="flex items-center justify-between mb-3 md:py-4">
            <h2 className="text-base md:text-2xl font-semibold text-jvc-blue-900">
              Transaction Processing Fee Schedule
            </h2>
          </div>

          {/* Schedule table */}
          <div className="overflow-hidden border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <Th>Date</Th>
                  <Th>Merchant</Th>
                  <Th>State</Th>
                  <Th>Percentage</Th>
                  <Th>Minimum</Th>
                  <Th>Authorized By</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {loading && (
                  <>
                    <SkeletonRow cols={8} />
                    <SkeletonRow cols={8} />
                    <SkeletonRow cols={8} />
                  </>
                )}

                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                      No rows found.
                    </td>
                  </tr>
                )}

                {!loading &&
                  filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <Td>{formatDate(r.date)}</Td>
                      <Td>{r.merchant}</Td>
                      <Td>{r.state}</Td>
                      <Td>
                        {editingRow !== null && editingRow.id === r.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              step="0.01"
                              value={editingRow.percentage}
                              onChange={(e) => setEditingRow({ ...editingRow, percentage: e.target.value })}
                              className="w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              disabled={saving}
                            />
                            <span>%</span>
                          </div>
                        ) : (
                          <span
                            className="cursor-pointer hover:text-blue-600 hover:underline"
                            onClick={() => startEditing(r)}
                            title="Click to edit"
                          >
                            {r.percentage}%
                          </span>
                        )}
                      </Td>
                      <Td>
                        {editingRow !== null && editingRow.id === r.id ? (
                          <div className="flex items-center gap-1">
                            <span>$</span>
                            <input
                              type="number"
                              step="0.01"
                              value={editingRow.minimum}
                              onChange={(e) => setEditingRow({ ...editingRow, minimum: e.target.value })}
                              className="w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              disabled={saving}
                            />
                          </div>
                        ) : (
                          <span
                            className="cursor-pointer hover:text-blue-600 hover:underline"
                            onClick={() => startEditing(r)}
                            title="Click to edit"
                          >
                            ${formatMoney(r.minimum)}
                          </span>
                        )}
                      </Td>
                      <Td>{r.authorizedBy}</Td>
                      <Td>
                        {r.status === "APPROVED" ? (
                          <Badge className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
                        ) : r.status === "REJECTED" ? (
                          <Badge className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
                        ) : r.status === "SUPERSEDED" ? (
                          <Badge className="bg-gray-100 text-gray-500 border-gray-300">Superseded</Badge>
                        ) : (
                          <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
                        )}
                      </Td>
                      <Td>
                        <div className="flex items-center gap-2">
                          {r.status === "PENDING" && (
                            <>
                              <button
                                onClick={() => handleApprove(r)}
                                className="rounded-md bg-blue-600 text-white text-xs px-3 py-1 hover:bg-blue-700"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(r)}
                                className="rounded-md bg-red-600 text-white text-xs px-3 py-1 hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {editingRow !== null && editingRow.id === r.id && (
                            <>
                              <button
                                onClick={() => handleSaveInline(r)}
                                disabled={saving}
                                className="rounded-md bg-blue-600 text-white text-xs px-3 py-1 hover:bg-blue-700 disabled:opacity-50"
                              >
                                {saving ? "Saving…" : "Save"}
                              </button>
                              <button
                                onClick={cancelEditing}
                                disabled={saving}
                                className="rounded-md bg-gray-400 text-white text-xs px-3 py-1 hover:bg-gray-500 disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </Td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ---------------- UI helpers ---------------- */
function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
      {children}
    </th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-6 py-4 text-sm text-gray-900">{children}</td>;
}
function SkeletonRow({ cols = 6 }: { cols?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}
function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${className}`}>
      {children}
    </span>
  );
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
function formatMoney(n?: number | null) {
  if (n == null || Number.isNaN(n)) return "0";
  return n.toFixed(0);
}
