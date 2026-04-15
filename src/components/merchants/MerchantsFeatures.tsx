
import React from 'react';

const MerchantsFeatures = () => {
  const features = [
    {
      number: "01",
      title: "Lower rates",
      description: "We offer competitive processing rates that help your business save money on every transaction. Our transparent pricing means no hidden fees."
    },
    {
      number: "02", 
      title: "Best support ever",
      description: "Our dedicated support team is available 24/7 to help you with any questions or issues. Get real human support when you need it most."
    },
    {
      number: "03",
      title: "Latest payment trends", 
      description: "Stay ahead with the latest payment technologies and trends. We continuously update our platform to give your customers the best experience."
    }
  ];

  return (
    <section className="py-20 bg-jvc-blue-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            JVC Card is different than<br />
            anything you've seen before.
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Experience the difference with our innovative payment solutions designed specifically for modern businesses.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="space-y-6">
              <div className="text-6xl font-bold text-white/20">{feature.number}</div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                <p className="text-blue-200 text-lg leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchantsFeatures;
