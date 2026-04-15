import merchantHeroImage from "@/assets/images/merchant-hero-image.png"

const MerchantsHero = () => {
  return (
    <section className="bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-jvc-blue-950 leading-tight">
                Apply for JVC<br />
                in under 5<br />
                minutes
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Get your business approved quickly with our streamlined application process. 
                Start accepting payments and growing your business today.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Business Information</h3>
                  <p className="text-gray-600">Tell us about your business and get started</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Financial Details</h3>
                  <p className="text-gray-600">Share your financial information securely</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Quick Approval</h3>
                  <p className="text-gray-600">Get approved and start processing payments</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8">
            <img src={merchantHeroImage} alt="merchant-hero-image" className="h-full w-full"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchantsHero;
