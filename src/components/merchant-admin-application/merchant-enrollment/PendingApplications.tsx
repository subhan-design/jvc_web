import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getInProgressOnboardingSessions } from "@/lib/api";
import { encryptId } from "@/lib/encryption";

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

export default function PendingApplications() {
  if (!isAdminAuthenticated()) {
    window.location.href = "/admin/login";
    return null;
  }
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");
  const [access, setAccess] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const response = await getInProgressOnboardingSessions();

        //---transform backend response to match UI structure
        const transformedData = response.sessions.map(session => ({
          applicationId: session.id,
          sessionId: session.sessionId || session.id,
          dateStarted: session.created_at,
          merchant: session.name || "N/A",
          person: session.person || "N/A",
          contact: session.phone || "N/A",
          status: `Part ${session.current_step}`,
        }));

        if (alive) setRows(transformedData);
      } catch (error) {
        console.error("Failed to fetch in-progress sessions:", error);
        if (alive) {
          if (error.status === 401 || error.message?.includes("401") || error.message?.includes("Unauthorized")) {
            setAccess(false);
            console.log("Access denied - Unauthorized");
          }
          setRows([]);
          setError("Failed to fetch In Progress Applications");
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) =>
      [r.applicationId, r.merchant, r.contact, r.status]
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
    <>
      <div className="bg-jvc-blue-950 flex-1 pt-16 sm:pt-20 md:pt-24">
        <div className="border-t border-white/20 w-full" />
        {/* Hero */}
        <section className="bg-jvc-blue-950 text-white py-10 sm:py-16 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <nav className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
              <span className="text-gray-400">Home</span>&nbsp;›&nbsp;
              <span className="text-white font-medium">Merchant Business Information</span>
            </nav>
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold leading-tight">
              Pending Applications
            </h1>
          </div>
        </section>

        {/* Content */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#043C6B] mb-4 sm:mb-6 md:py-4">
              Pending Merchant Enrollments
            </h2>

            {/* KPI */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <KPI
                label="Pending Applications"
                value={loading ? "—" : rows.length}
                accent="bg-white text-black border-none"
              />
            </div>

            {/* Search */}
            {/* <div className="flex items-center justify-between gap-4 mb-4">
              <div className="relative w-full max-w-sm">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by ID, merchant, phone, or status…"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>
            </div> */}

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <Th>Application ID</Th>
                    <Th>Date Started</Th>
                    <Th>Merchant</Th>
                    <Th>Person</Th>
                    <Th>Contact</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {loading && (
                    <>
                      <SkeletonRow cols={6} />
                      <SkeletonRow cols={6} />
                      <SkeletonRow cols={6} />
                    </>
                  )}
                  {!loading && error && (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        {error}
                      </td>
                    </tr>
                  )}

                  {!loading && !error && filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        No pending applications found.
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    filtered.map((r) => (
                      <tr key={r.applicationId} className="hover:bg-gray-50 transition-colors">
                        <Td>
                          <button
                            type="button"
                            onClick={async () => {
                              const encrypted = await encryptId(String(r.sessionId));
                              navigate(`/merchant-admin-application/view/${encrypted}`);
                            }}
                            className="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer bg-transparent border-none p-0"
                          >
                            #{r.applicationId}
                          </button>
                        </Td>
                        <Td>{formatDate(r.dateStarted)}</Td>
                        <Td>{r.merchant}</Td>
                        <Td>{r.person}</Td>
                        <Td className="whitespace-nowrap">{r.contact}</Td>
                        <Td><PartPill part={r.status} /></Td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- helpers ---------------- */
function Th({ children }) {
  return (
    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 ${className}`}>{children}</td>;
}
function SkeletonRow({ cols = 6 }) {
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
function KPI({ label, value, accent }) {
  return (
    <div className={`rounded-lg sm:rounded-xl border px-3 sm:px-4 py-3 sm:py-4 ${accent}`}>
      <div className="text-xs sm:text-sm opacity-80">{label}</div>
      <div className="text-2xl sm:text-3xl font-semibold mt-1">{value}</div>
    </div>
  );
}
function PartPill({ part = "" }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-gray-50 text-gray-700 border border-gray-200">
      {part}
    </span>
  );
}
function formatDate(isoOrYmd) {
  try {
    const d = new Date(isoOrYmd);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  } catch {
    return isoOrYmd;
  }
}
