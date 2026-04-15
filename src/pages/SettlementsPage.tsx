import React from "react";
import SettlementTable from "@/components/SettlementTable";

const SettlementsPage: React.FC = () => {
  // Sample data to match the provided mockup. Replace with real API data when available.
  const merchants = [
    {
      name: "Merchant A",
      transactions: [
        { id: "#72543" },
      ],
    },
    {
      name: "Merchant B",
      transactions: [
        { id: "#72543" },
      ],
    },
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
              <h1 className="text-2xl md:text-4xl font-bold  leading-tight">
                Settlements
              </h1>
            </div>
          </section>
    
          {/* Content */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
              {/* Settlements*/}
                       <h2 className="text-base md:text-2xl font-semibold text-jvc-blue-900 mb-3 md:py-4">
                         Daily Settlement
              </h2>
        
         {merchants.map((m) => (
          <SettlementTable
            key={m.name}
            merchantName={m.name}
            transactions={m.transactions as any}
          />
        ))}
         
              </div>      
        </div>
        </div>
      );
    }
  


export default SettlementsPage;
