import React from "react";

const ConsumerDeclinePage = () => {

  return (
      <div className="bg-jvc-blue-950 min-h-screen flex flex-col">
    {/* Top header spacing so content is not stuck at top */}
    <div className="pt-32 pb-16" />
    <section className="bg-jvc-blue-950 text-white py-20 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-300 mb-6">
          <span className="text-gray-400">Home</span> &nbsp;›&nbsp;{" "}
          <span className="text-white font-medium">
            Consumer Information
          </span>
        </nav>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Consumer
          <br />
          Information
        </h1>
      </div>
    </section>

    {/* White section, centered text */}
    <div className="bg-white flex-1 flex flex-col items-center justify-center text-center px-4">
      
      {/* Title */}
      <h1 className="text-xl font-semibold text-blue-600 mb-6">
        Application Not Approved
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
        Unfortunaltey your application has not been pre-approved for a JVC <br /> Credit Card due to failed verification.
      </p>
    </div>
  </div>

  );
};

export default ConsumerDeclinePage;