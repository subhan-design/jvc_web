
import React from 'react';
import { Button } from '@/components/ui/button';

const NetworkSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Join the JVC Network
            </h2>
            <p className="text-lg text-gray-600">
              Connect with thousands of alternative medicine retailers and healthcare providers who trust JVC for their payment processing needs.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">10,000+ active merchants</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">$50M+ processed annually</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">99.9% uptime guarantee</span>
              </div>
            </div>
            
            <Button className="bg-jvc-blue-600 hover:bg-jvc-blue-700 text-white px-8 py-3 rounded-lg">
              Join Network
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Real-time notifications</span>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Instant settlements</span>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Advanced analytics</span>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">24/7 customer support</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-jvc-blue-600 rounded-lg text-center">
                <Button variant="secondary" className="w-full">
                  Get Started Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;
