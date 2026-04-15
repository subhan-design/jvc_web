
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getManualReviewOnboardingSessions } from "@/lib/api";
import { encryptId } from "@/lib/encryption";

/* ---------- types ---------- */
type Row = {
  applicationId: string;
  dateReceived: string; // ISO or YYYY-MM-DD
  merchant: string;
  reason: string;
};

/* ---------- mock (fallback while API not ready) ---------- */
const MOCK: Row[] = [
  { applicationId: "25648", dateReceived: "2025-08-05", merchant: "John Doe",    reason: "Accurint Indicator Entity Score: 84" },
  { applicationId: "25649", dateReceived: "2025-08-05", merchant: "Alex Carter", reason: "Accurint Indicator Entity Score: 84" },
  { applicationId: "25650", dateReceived: "2025-08-05", merchant: "Maya James",  reason: "Accurint Indicator Entity Score: 84" },
  { applicationId: "25651", dateReceived: "2025-08-05", merchant: "Edward Flue", reason: "Accurint Indicator Entity Score: 84" },
];

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

export default function ReviewQueue() {
  if (!isAdminAuthenticated()) {
    window.location.href = "/admin/login";
    return null;
  }
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [error, setError] = useState(null);
  const [access, setAccess] = useState(true);

  //encrypted navigation for application id
  const handleReviewClick = async (row: Row, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const encryptedId = await encryptId(row.applicationId);
      navigate(`/merchant-admin-application/review/${encryptedId}`, { state: row });
    } catch (error) {
      console.error('Failed to encrypt application ID:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const response = await getManualReviewOnboardingSessions();
        
        console.log('[ReviewQueue] Full API response:', response);
        console.log('[ReviewQueue] First session:', response.sessions?.[0]);

        //--transform backend response to match UI structure
        const transformedData: Row[] = response.sessions.map(session => {
          console.log('[ReviewQueue] Session reason:', session.reason);
          return {
            applicationId: session.id,
            dateReceived: session.date,
            merchant: session.name || "N/A",
            reason: session.reason || "Manual Review Required - No reason provided",
          };
        });

        if (isMounted) setRows(transformedData);
      } catch (error) {
        console.error("Failed to fetch manual review sessions:", error);
        if (isMounted) {
          if (error.status === 401 || error.message?.includes("401") || error.message?.includes("Unauthorized")) {
            setAccess(false);
            console.log("Access denied - Unauthorized");
          }
          setRows([]);
          setError("Failed to fetch Review Applications");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) =>
      [r.applicationId, r.merchant, r.reason]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    );
  }, [rows, q]);

  if (access === false) {
  return (
    <div className="bg-jvc-blue-950 flex-1 pt-24">
      <div className="border-t border-white/20 w-full" />

      <section className="bg-jvc-blue-950 text-white py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-300 mb-6">
            <span className="text-gray-400">Home</span>&nbsp;›&nbsp;
            <span className="text-white font-medium">Merchant Business Information</span>
          </nav>
          
        </div>
      </section>
      <div className="bg-white">
        <div className="w-full py-20 text-center text-gray-300 text-2xl font-semibold">
          Access Denied
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="bg-jvc-blue-950 flex-1 pt-16 sm:pt-20 md:pt-24">
      <div className="border-t border-white/20 w-full" />
      {/* Hero */}
      <section className="bg-jvc-blue-950 text-white py-10 sm:py-16 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
            <span className="text-gray-400">Home</span>&nbsp;›&nbsp;
            <span className="text-white font-medium">Merchant Enrollment</span>
          </nav>
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold leading-tight">Review Queue</h1>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          {/* Search */}
          {/* <div className="flex items-center justify-between gap-4 mb-4">
            <div className="relative w-full max-w-sm">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by Application ID, merchant, or reason…"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          </div> */}

            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#043C6B] mb-4 sm:mb-6 md:py-4">
              Review Queue
            </h3>

          <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <Th>Application ID</Th>
                  <Th>Date Received</Th>
                  <Th>Merchant</Th>
                  <Th>Reason</Th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {loading && (<><SkeletonRow /><SkeletonRow /><SkeletonRow /></>)}

                {!loading && error && (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                        {error}
                      </td>
                    </tr>
                )}

                {!loading && !error && filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                      No applications found.
                    </td>
                  </tr>
                )}

                {!loading && filtered.map((r) => (
                  <tr key={r.applicationId} className="hover:bg-gray-50 transition-colors">
                    <Td>
                      <a
                        href="#"
                        onClick={(e) => handleReviewClick(r, e)}
                        className="text-blue-500 underline font-medium cursor-pointer"
                      >
                        #{r.applicationId}
                      </a>
                    </Td>
                    <Td>{formatDate(r.dateReceived)}</Td>
                    <Td>{r.merchant}</Td>
                    <Td>
                      {r.reason}
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

/* ---------- tiny helpers ---------- */
function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
      {children}
    </th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">{children}</td>;
}
function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {[...Array(4)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </td>
      ))}
    </tr>
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
