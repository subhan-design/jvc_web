import { useState, useEffect, useMemo } from "react";
import {
  fetchCreditCardOffers,
  fetchCompletedApplications,
  type CreditCardOffersResponse,
  type CompletedApplicationsResponse,
  type CreditCardOffer,
  type CompletedApplication,
} from "./dummy-data";

// ============================================================
// Main Page
// ============================================================

type MainTab = "offers" | "completed";

export default function ConsumerApplicationsPage() {
  const [mainTab, setMainTab] = useState<MainTab>("offers");

  return (
    <div className="bg-jvc-blue-950 flex-1 pt-16 sm:pt-20 md:pt-24">
      <div className="border-t border-white/20 w-full" />

      {/* Hero */}
      <section className="bg-jvc-blue-950 text-white py-10 sm:py-16 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
            <span className="text-gray-400">Home</span>&nbsp;&rsaquo;&nbsp;
            <span className="text-white font-medium">Consumer Applications</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
            {mainTab === "offers" ? "Credit Card Offers" : "Completed Applications"}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
          {/* Page heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#043C6B] mb-4 sm:mb-6">
            Consumer Applications
          </h2>

          {/* Main Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto">
            <TabButton
              active={mainTab === "offers"}
              onClick={() => setMainTab("offers")}
            >
              Credit Card Offers
            </TabButton>
            <TabButton
              active={mainTab === "completed"}
              onClick={() => setMainTab("completed")}
            >
              Completed Applications
            </TabButton>
          </div>

          {/* Tab Content */}
          {mainTab === "offers" && <CreditCardOffersTab />}
          {mainTab === "completed" && <CompletedApplicationsTab />}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Credit Card Offers Tab
// ============================================================

function CreditCardOffersTab() {
  const [data, setData] = useState<CreditCardOffersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetchCreditCardOffers();
        if (alive) setData(res);
      } catch (err) {
        console.error("Failed to fetch credit card offers:", err);
        if (alive) setError("Failed to load credit card offers.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const stats = data?.stats;
  const offers = data?.offers ?? [];

  return (
    <>
      {/* KPI Row 1 - Counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
        <KPI label="Number Of Credit Card Pre-Approved Offers:" value={loading ? "..." : stats?.preApprovedOffers} />
        <KPI label="Number Of Credit Card Pre-Qualified Offers:" value={loading ? "..." : stats?.preQualifiedOffers} />
        <KPI label="Number Of Secured Credit Card Offers:" value={loading ? "..." : stats?.securedCardOffers} />
      </div>

      {/* KPI Row 2 - Rates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <KPI label="Pre-Approved Offer Acceptance Rate:" value={loading ? "..." : stats?.preApprovedAcceptanceRate} />
        <KPI label="Pre-Qualified Offer Acceptance Rate:" value={loading ? "..." : stats?.preQualifiedAcceptanceRate} />
        <KPI label="Secured Card Offer Acceptance Rate:" value={loading ? "..." : stats?.securedCardAcceptanceRate} />
      </div>

      {/* Table */}
      <DataTable
        loading={loading}
        error={error}
        emptyMessage="No credit card offers found."
        columns={["Application ID", "Offer Date", "Offer", "Consumer", "State", "Referral Code", "Status"]}
        rows={offers}
        renderRow={(row: CreditCardOffer) => (
          <tr key={row.applicationId} className="hover:bg-gray-50 transition-colors">
            <Td>
              <span className="text-blue-500 font-medium">#{row.applicationId}</span>
            </Td>
            <Td>{formatDate(row.offerDate)}</Td>
            <Td>
              <OfferBadge offer={row.offer} />
            </Td>
            <Td>{row.consumer}</Td>
            <Td>{row.state}</Td>
            <Td>{row.referralCode}</Td>
            <Td>
              <OfferStatusPill status={row.status} />
            </Td>
          </tr>
        )}
      />
    </>
  );
}

// ============================================================
// Completed Applications Tab
// ============================================================

type SubTab = "approved" | "declined";

function CompletedApplicationsTab() {
  const [data, setData] = useState<CompletedApplicationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subTab, setSubTab] = useState<SubTab>("approved");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetchCompletedApplications();
        if (alive) setData(res);
      } catch (err) {
        console.error("Failed to fetch completed applications:", err);
        if (alive) setError("Failed to load completed applications.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const stats = data?.stats;
  const approvedStats = data?.approvedStats;
  const declinedStats = data?.declinedStats;
  const applications = data?.applications ?? [];

  const filteredApps = useMemo(
    () => applications.filter((a) => a.status.toLowerCase() === subTab),
    [applications, subTab]
  );

  return (
    <>
      {/* Aggregate Stats - Row 1: Pre-Approved */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
        <KPI label="Number Of Approved Pre-Approved Applications:" value={loading ? "..." : stats?.approvedPreApproved} />
        <KPI label="Number Of Declined Pre-Approved Applications:" value={loading ? "..." : stats?.declinedPreApproved} />
        <KPI label="Lifetime Pre-Approved Approval Rate:" value={loading ? "..." : stats?.lifetimePreApprovedApprovalRate} />
      </div>

      {/* Row 2: Pre-Qualified */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
        <KPI label="Number Of Approved Pre-Qualified Applications:" value={loading ? "..." : stats?.approvedPreQualified} />
        <KPI label="Number Of Declined Pre-Qualified Applications:" value={loading ? "..." : stats?.declinedPreQualified} />
        <KPI label="Lifetime Pre-Qualified Approval Rate:" value={loading ? "..." : stats?.lifetimePreQualifiedApprovalRate} />
      </div>

      {/* Row 3: Secured Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <KPI label="Number Of Approved Secured Card Applications:" value={loading ? "..." : stats?.approvedSecuredCard} />
        <KPI label="Number Of Declined Secured Card Applications:" value={loading ? "..." : stats?.declinedSecuredCard} />
        <KPI label="Lifetime Secured Card Approval Rate:" value={loading ? "..." : stats?.lifetimeSecuredCardApprovalRate} />
        <KPI label="Number Of Funded Secured Cards:" value={loading ? "..." : stats?.fundedSecuredCards} />
        <KPI label="Number Of Unfunded Secured Cards:" value={loading ? "..." : stats?.unfundedSecuredCards} />
      </div>

      {/* Sub-tabs: Approved / Declined */}
      <div className="flex gap-6 border-b border-gray-200 mb-4 sm:mb-6">
        <TabButton active={subTab === "approved"} onClick={() => setSubTab("approved")}>
          Approved
        </TabButton>
        <TabButton active={subTab === "declined"} onClick={() => setSubTab("declined")}>
          Declined
        </TabButton>
      </div>

      {/* Sub-tab KPIs */}
      {subTab === "approved" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <KPI label="Pre-Approved Offer Approval Rate:" value={loading ? "..." : approvedStats?.preApprovedApprovalRate} />
          <KPI label="Pre-Qualified Offer Approval Rate:" value={loading ? "..." : approvedStats?.preQualifiedApprovalRate} />
          <KPI label="Secured Card Offer Approval Rate:" value={loading ? "..." : approvedStats?.securedCardApprovalRate} />
        </div>
      )}

      {subTab === "declined" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <KPI label="Pre-Approved Offer Decline Rate:" value={loading ? "..." : declinedStats?.preApprovedDeclineRate} />
          <KPI label="Pre-Qualified Offer Decline Rate:" value={loading ? "..." : declinedStats?.preQualifiedDeclineRate} />
          <KPI label="Secured Card Offer Decline Rate:" value={loading ? "..." : declinedStats?.securedCardDeclineRate} />
        </div>
      )}

      {/* Data Table */}
      {subTab === "approved" ? (
        <DataTable
          loading={loading}
          error={error}
          emptyMessage="No approved applications found."
          columns={["Application ID", "Date", "Offer", "Consumer", "State", "Card Number", "Referral Code"]}
          rows={filteredApps}
          renderRow={(row: CompletedApplication) => (
            <tr key={row.applicationId} className="hover:bg-gray-50 transition-colors">
              <Td>
                <span className="text-blue-500 font-medium">#{row.applicationId}</span>
              </Td>
              <Td>{formatDate(row.date)}</Td>
              <Td>
                <OfferBadge offer={row.offer} />
              </Td>
              <Td>{row.consumer}</Td>
              <Td>{row.state}</Td>
              <Td>{row.cardNumber || "---"}</Td>
              <Td>{row.referralCode}</Td>
            </tr>
          )}
        />
      ) : (
        <DataTable
          loading={loading}
          error={error}
          emptyMessage="No declined applications found."
          columns={["Application ID", "Date", "Offer", "Consumer", "State", "Referral Code", "Reason For Decline"]}
          rows={filteredApps}
          renderRow={(row: CompletedApplication) => (
            <tr key={row.applicationId} className="hover:bg-gray-50 transition-colors">
              <Td>
                <span className="text-blue-500 font-medium">#{row.applicationId}</span>
              </Td>
              <Td>{formatDate(row.date)}</Td>
              <Td>
                <OfferBadge offer={row.offer} />
              </Td>
              <Td>{row.consumer}</Td>
              <Td>{row.state}</Td>
              <Td>{row.referralCode}</Td>
              <Td>
                <span
                  className="text-red-600 text-xs sm:text-sm block min-w-[250px] whitespace-normal break-words"
                >
                  {row.reasonForDecline || "---"}
                </span>
              </Td>
            </tr>
          )}
        />
      )}
    </>
  );
}

// ============================================================
// Shared UI Helpers
// ============================================================

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
        active
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

function KPI({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div className="rounded-lg sm:rounded-xl border bg-white px-3 sm:px-4 py-3 sm:py-4">
      <div className="text-xs sm:text-sm text-gray-500 leading-tight">{label}</div>
      <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-600 mt-1">
        {value ?? "---"}
      </div>
    </div>
  );
}

function DataTable<T>({
  loading,
  error,
  emptyMessage,
  columns,
  rows,
  renderRow,
}: {
  loading: boolean;
  error: string | null;
  emptyMessage: string;
  columns: string[];
  rows: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <Th key={col}>{col}</Th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {loading && (
            <>
              <SkeletonRow cols={columns.length} />
              <SkeletonRow cols={columns.length} />
              <SkeletonRow cols={columns.length} />
            </>
          )}

          {!loading && error && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-500">
                {error}
              </td>
            </tr>
          )}

          {!loading && !error && rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          )}

          {!loading && !error && rows.map((row, i) => renderRow(row, i))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 ${className}`}>
      {children}
    </td>
  );
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

function OfferBadge({ offer }: { offer: string }) {
  const styles: Record<string, string> = {
    "Pre-Approved": "bg-blue-50 text-blue-700 border-blue-200",
    "Pre-Qualified": "bg-purple-50 text-purple-700 border-purple-200",
    Secured: "bg-amber-50 text-amber-700 border-amber-200",
    "N/A": "bg-gray-100 text-gray-500 border-gray-300",
  };
  const cls = styles[offer] || "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${cls}`}>
      {offer}
    </span>
  );
}

function OfferStatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  let cls = "bg-gray-50 text-gray-700 border-gray-200";
  if (s.includes("accepted")) cls = "bg-green-50 text-green-700 border-green-200";
  else if (s.includes("declined") || s.includes("rejected")) cls = "bg-red-50 text-red-700 border-red-200";
  else if (s.includes("pending")) cls = "bg-yellow-50 text-yellow-700 border-yellow-200";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${cls}`}>
      {status}
    </span>
  );
}

function formatDate(isoOrYmd?: string) {
  if (!isoOrYmd) return "---";
  const d = new Date(isoOrYmd);
  if (Number.isNaN(d.getTime())) return isoOrYmd;
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}-${dd}-${yy}`;
}
