
import React from 'react';

const RewardsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Credit Card points and rewards
            </h2>
            <p className="text-lg text-gray-600">
              Help your customers earn more rewards on their purchases while you benefit from increased customer loyalty and higher transaction values.
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Reward Integration</h4>
                <p className="text-gray-600 text-sm">
                  Seamlessly integrate with major credit card reward programs to maximize customer benefits.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Loyalty Tracking</h4>
                <p className="text-gray-600 text-sm">
                  Track customer spending patterns and reward program participation for better insights.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Rewards Dashboard</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Cash Back</span>
                  <span className="text-blue-600 font-bold">2.5%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Points Earned</span>
                  <span className="text-green-600 font-bold">1,250</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Miles</span>
                  <span className="text-purple-600 font-bold">850</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <svg className="w-full h-24" viewBox="0 0 300 100">
                  <polyline
                    points="10,80 50,60 100,40 150,30 200,20 250,25 290,15"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                  <circle cx="290" cy="15" r="3" fill="#3B82F6" />
                </svg>
                <p className="text-xs text-gray-500 text-center mt-2">Reward trend over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
