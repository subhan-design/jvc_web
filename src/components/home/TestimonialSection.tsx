
import React from 'react';

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-jvc-gradient">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-6">
              <blockquote className="text-xl lg:text-2xl text-white leading-relaxed">
                "We've able to save with credit card fees..."
              </blockquote>
              <p className="text-lg text-blue-100 leading-relaxed">
                I'm a massage therapist working out of my workspace, and I wanted to be able to take credit cards. Setting up JVC was easy, and I've been extremely happy with it. The rates are reasonable, the setup process was smooth, and I can accept all major credit cards. It's made my business much more professional and convenient for my clients.
              </p>
              <div className="text-blue-200">
                <p className="font-semibold">Sandra M.</p>
                <p className="text-sm">Massage Therapist</p>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Sandra M."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
