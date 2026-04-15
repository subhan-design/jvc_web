import React from "react";

type Transaction = {
  id: string;
  netSales?: string;
  rewardCoSponsor?: string;
  returnsDisputes?: string;
  surchargeReversal?: string;
  processingFees?: string;
  settlementAmount?: string;
};

type Props = {
  merchantName: string;
  transactions: Transaction[];
};

const headerCols = [
  "Transaction ID",
  "Net Sales",
  "JVC Reward Co-Sponsor",
  "Purchase Returns/Disputes",
  "Surcharge Reversal",
  "Net Transaction Processing Fees",
  "Settlement Amount",
];

const SettlementTable: React.FC<Props> = ({ merchantName, transactions }) => {
  return (
    <section className="w-full max-w-6xl mx-auto my-8">
      <h4 className="text-sm text-gray-600 mb-3">{merchantName}</h4>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headerCols.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-blue-600">
                    <a href="#">{t.id}</a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{t.netSales ?? "XXXX"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{t.rewardCoSponsor ?? "XXXX"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{t.returnsDisputes ?? "XXXX"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{t.surchargeReversal ?? "XXXX"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{t.processingFees ?? "XXXX"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{t.settlementAmount ?? "XXXX"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SettlementTable;
