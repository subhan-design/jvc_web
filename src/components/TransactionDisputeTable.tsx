import React from "react";

type Row = {
  id: string; // transaction id
  dateReceived: string;
  dateClosed?: string;
  disputeReason: string;
  amount: string;
  resolution?: string;
};

type Props = {
  mode: "pending" | "closed";
  rows: Row[];
};

const TransactionDisputeTable: React.FC<Props> = ({ mode, rows }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Date Received</th>
              {mode === "closed" && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500   tracking-wider">Date Closed</th>
              )}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500   tracking-wider">Transaction ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500   tracking-wider">Dispute Reason</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500   tracking-wider">Amount</th>
              {mode === "closed" && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500   tracking-wider">Resolution</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-blue-600">
                  <a href="#">{r.dateReceived}</a>
                </td>
                {mode === "closed" && (
                  <td className="px-4 py-3 text-sm text-gray-700">{r.dateClosed ?? ""}</td>
                )}
                <td className="px-4 py-3 text-sm text-gray-700">{r.id}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{r.disputeReason}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{r.amount}</td>
                {mode === "closed" && (
                  <td className="px-4 py-3 text-sm text-gray-700">{r.resolution ?? ""}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionDisputeTable;
