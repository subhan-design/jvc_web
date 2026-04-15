
import React from 'react';

const MerchantsNetwork = () => {
  const networkFeatures = [
    {
      title: "Point & Click Billing",
      description: "Simple and intuitive billing solution for your business needs"
    },
    {
      title: "Full E-commerce", 
      description: "Complete online payment processing with advanced features"
    },
    {
      title: "E-commerce",
      description: "Advanced e-commerce capabilities for online businesses"
    },
    {
      title: "No monthly fees",
      description: "Pay only for what you use - no hidden monthly charges"
    },
    {
      title: "Live chat Support",
      description: "Get real-time customer support whenever you need help"
    },
    {
      title: "Leading Edge AI",
      description: "AI-powered fraud detection and risk management"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-jvc-blue-950 mb-6">
            JVC Card doesn't touch the<br />
            Visa/Mastercard networks.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our direct processing approach gives you better rates, faster settlements, and complete control over your transactions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {networkFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <div className="w-8 h-8 bg-jvc-blue-500 rounded-lg"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchantsNetwork;
