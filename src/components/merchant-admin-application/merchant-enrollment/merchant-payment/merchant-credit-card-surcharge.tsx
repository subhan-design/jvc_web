import { useEffect, useMemo, useState } from "react";
import { getAllActiveSurcharges, ActiveSurchargeItem } from "@/lib/api";

/* ---------- types ---------- */
type SurchargeRow = {
  id: number;
  date: string;
  merchant: string;
  state: string;
  percentage: number;
  minimum: number;
};

export default function MerchantCreditCardSurcharge() {
  const [rows, setRows] = useState<SurchargeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getAllActiveSurcharges();
        if (alive) {
          const transformed: SurchargeRow[] = data.map((item: ActiveSurchargeItem) => ({
            id: item.id,
            date: item.effectiveDate,
            merchant: item.merchantName,
            state: item.state,
            percentage: item.feePercentage,
            minimum: item.minimumFee,
          }));
          setRows(transformed);
        }
      } catch (err) {
        console.error('Failed to fetch active surcharges:', err);
        if (alive) setRows([]);
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
      [r.merchant, r.state]
        .map(String)
        .some((v) => v.toLowerCase().includes(term))
    );
  }, [rows, q]);

  return (
    <div className="bg-jvc-blue-950 flex-1 pt-24">
      <div className="border-t border-white/20 w-full" />

      {/* Hero */}
      <section className="bg-jvc-blue-950 text-white py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-300 mb-6">
            <span className="text-gray-400">Home</span>&nbsp;›&nbsp;
            <span className="text-white font-medium">Merchant Enrollment</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Merchant Credit Card Surcharge
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <h2 className="text-base md:text-2xl font-semibold text-jvc-blue-900 mb-3 md:py-4">
            Active Surcharge Configurations
          </h2>

          <div className="overflow-hidden border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <Th>Date</Th>
                  <Th>Merchant</Th>
                  <Th>State</Th>
                  <Th>Percentage</Th>
                  <Th>Minimum</Th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {loading && (
                  <>
                    <SkeletonRow cols={5} />
                    <SkeletonRow cols={5} />
                    <SkeletonRow cols={5} />
                  </>
                )}

                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      No active surcharge configurations found.
                    </td>
                  </tr>
                )}

                {!loading &&
                  filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <Td>{formatDate(r.date)}</Td>
                      <Td>{r.merchant}</Td>
                      <Td>{r.state}</Td>
                      <Td>{r.percentage}%</Td>
                      <Td>${formatMoney(r.minimum)}</Td>
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

/* ---------- helpers ---------- */
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
function SkeletonRow({ cols = 5 }: { cols?: number }) {
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
