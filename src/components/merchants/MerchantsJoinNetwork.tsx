
import React from 'react';
import { Button } from '@/components/ui/button';

const MerchantsJoinNetwork = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-jvc-blue-950">
                Join the JVC Network
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with thousands of businesses already using JVC for their payment processing needs. 
                Experience the future of payments today.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-lg font-semibold text-gray-700">500+ merchants</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-lg font-semibold text-gray-700">5M+ transactions processed</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-lg font-semibold text-gray-700">99.9% uptime guaranteed</span>
              </div>
            </div>
            
            <Button className="bg-jvc-blue-500 hover:bg-jvc-blue-600 text-white px-10 py-4 rounded-xl text-lg font-bold">
              Join Now
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-3xl p-10 shadow-2xl border-2">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                  <div className="w-10 h-10 bg-jvc-blue-500 rounded-xl"></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Ready to get started?</h3>
                  <p className="text-lg text-gray-600">Join thousands of merchants who trust JVC for their payment processing</p>
                </div>
                <Button className="w-full bg-jvc-blue-500 hover:bg-jvc-blue-600 text-white py-4 text-lg font-bold rounded-xl">
                  Apply Now
                </Button>
                <p className="text-sm text-gray-500">
                  No setup fees • Quick approval • 24/7 support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchantsJoinNetwork;
