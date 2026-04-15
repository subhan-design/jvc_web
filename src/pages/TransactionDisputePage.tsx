import React, { useState } from "react";
import TransactionDisputeTable from "@/components/TransactionDisputeTable";

const TransactionDisputePage: React.FC = () => {
  const [tab, setTab] = useState<"pending" | "closed">("pending");

  const pendingRows = [
    { id: "1234", dateReceived: "10/15/2025", disputeReason: "Merchandise/Service Not Receive", amount: "$20" },
    { id: "4567", dateReceived: "11/15/2025", disputeReason: "Paid By Other Means", amount: "$50" },
  ];

  const closedRows = [
    { id: "1234567", dateReceived: "10/15/2025", dateClosed: "10/01/2025", disputeReason: "Merchandise/Service Not Receive", amount: "$20", resolution: "Consumer" },
    { id: "1234567", dateReceived: "10/15/2025", dateClosed: "10/01/2025", disputeReason: "Merchandise/Service Not Receive", amount: "$20", resolution: "Consumer" },
  ];

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
                Transaction dispute
              </h1>
            </div>
          </section>
    
          {/* Content */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
              {/* Transaction Dispute*/}
                       <h2 className="text-base md:text-2xl font-semibold text-jvc-blue-900 mb-3 md:py-4">
    
                Transaction dispute
              </h2> 
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-6 text-sm">
              <button
                onClick={() => setTab("pending")}
                className={`pb-2 ${tab === "pending" ? "text-blue-600 border-b-2 border-blue-300" : "text-gray-500"}`}
              >
                Pending
              </button>
              <button
                onClick={() => setTab("closed")}
                className={`pb-2 ${tab === "closed" ? "text-blue-600 border-b-2 border-blue-300" : "text-gray-500"}`}
              >
                Closed
              </button>
            </nav>
          </div>

          <div className="mb-4">
            {tab === "pending" ? (
              <>
                <h4 className="text-base md:text-2l font-semibold text-jvc-blue-900 mb-4">Pending dispute</h4>
                <p className="text-sm text-gray-600 mb-4">Select A Disputed Transaction:</p>
                <TransactionDisputeTable mode="pending" rows={pendingRows as any} />
              </>
            ) : (
              <>
                <h4 className="text-base md:text-2l font-semibold text-jvc-blue-900 mb-4">Closed dispute</h4>
                <TransactionDisputeTable mode="closed" rows={closedRows as any} />
              </>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-6">Please Investigate Disputes Promptly. Disputes Not Resolved In 10 Days To The Satisfaction Of JVC Are Subject To Chargeback.</p>
        </div>
      </div>
    </div>
  );
};  

export default TransactionDisputePage;
