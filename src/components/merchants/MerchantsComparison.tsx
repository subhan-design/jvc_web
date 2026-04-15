
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MerchantsComparison = () => {
  const comparisonData = [
    { feature: "Pay Per Txn", jvc: true, others: false },
    { feature: "No Fees", jvc: true, others: false },
    { feature: "Pay fees", jvc: false, others: true },
    { feature: "Top Rate", jvc: true, others: false },
    { feature: "Fast Settlements", jvc: true, others: false },
    { feature: "24/7 Support", jvc: true, others: false },
    { feature: "Easy Merchant Payments", jvc: true, others: false },
    { feature: "Application under 5 mins", jvc: true, others: false },
    { feature: "No setup Cost", jvc: true, others: false },
    { feature: "Live - AI Support - Everything", jvc: true, others: false }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-jvc-blue-950 mb-6">
            Why Choose JVC?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we compare to traditional payment processors and discover why thousands of businesses choose JVC
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2">
          <div className="grid grid-cols-3 bg-gray-50 p-8 border-b-2">
            <div className="font-bold text-xl text-gray-900">Features</div>
            <div className="text-center">
              <span className="bg-aquamarine text-black px-6 py-3 rounded-full font-bold text-lg">JVC</span>
            </div>
            <div className="text-center">
              <span className="bg-jvc-blue-950 text-white px-6 py-3 rounded-full font-bold text-lg">Others</span>
            </div>
          </div>
          
          {comparisonData.map((item, index) => (
            <div key={index} className="grid grid-cols-3 p-6 border-b border-gray-100 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
              <div className="font-semibold text-gray-900 text-lg">{item.feature}</div>
              <div className="text-center">
                {item.jvc ? (
                  <Check className="w-8 h-8 text-green-500 mx-auto" />
                ) : (
                  <X className="w-8 h-8 text-red-500 mx-auto" />
                )}
              </div>
              <div className="text-center">
                {item.others ? (
                  <Check className="w-8 h-8 text-green-500 mx-auto" />
                ) : (
                  <X className="w-8 h-8 text-red-500 mx-auto" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-jvc-blue-500 hover:bg-jvc-blue-600 text-white px-12 py-4 rounded-xl text-lg font-bold">
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MerchantsComparison;
