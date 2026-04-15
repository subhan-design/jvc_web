import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConsumerDownloadAppPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get reason from location state: 'approved', 'not-approved', 'declined', or 'failed' (default)
  const reason = location.state?.reason || 'failed';
  const fullyOnboarded = location.state?.fullyOnboarded === true;
  const creditLimit = location.state?.creditLimit ?? null;

  //clear consumer session data
  useEffect(() => {
    localStorage.removeItem('consumer_onboarding_session');
    localStorage.removeItem('vconnect_session_token');
    localStorage.removeItem('consumer_agreement_signature');
  }, []);

  // Override browser back button to navigate to /rewards/signup/verified
  useEffect(() => {
    window.history.replaceState(null, "", "/rewards/signup/verified");
    window.history.pushState(null, "", "/consumer-download-app");

    const handlePopState = () => {
      navigate("/rewards/signup/verified", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const isApproved = reason === 'approved' && fullyOnboarded;
  const isNotApproved = reason === 'not-approved';
  const isDeclined = reason === 'declined';
  const isFailed = !isApproved && !isNotApproved && !isDeclined;

  // Format credit limit for display
  const formattedCreditLimit = creditLimit != null
    ? `$${Number(creditLimit).toLocaleString()}`
    : null;

  return (
    <div className="bg-jvc-blue-950 min-h-screen flex flex-col">

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

      <div className="bg-white flex-1 flex flex-col items-center justify-center text-center px-4">
        {/* Dynamic heading based on reason */}
        <h3 className="text-xl md:text-3xl lg:text-3xl font-normal text-gray-900 mb-4">
          <span className="font-semibold text-[#043C6B]">
            {isApproved ? "Congratulations!" : isNotApproved ? "Application Update!" : "Thank You!"}
          </span>
        </h3>

        {/* Approved / Fully Onboarded */}
        {isApproved && (
          <>
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-normal text-gray-900 leading-snug">
              You have been approved for a JVC Credit Card
              {formattedCreditLimit && (
                <> with a credit limit of <span className="font-bold text-[#043C6B]">{formattedCreditLimit}</span></>
              )}
              {" "}which is available now using the JVC App.
            </h2>

            <p className="text-[13px] md:text-[13px] text-gray-500 mt-3">
              Download the JVC app to activate your card and start using your benefits. <br /><br />
              <a href="https://play.google.com/apps/internaltest/4701377086391157882" className="text-[18px] font-bold text-blue-600 underline hover:text-blue-800">
                Download the App
              </a>
            </p>
          </>
        )}

        {/* Not Approved */}
        {isNotApproved && (
          <>
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-normal text-gray-900 leading-snug">
              We are unable to approve you for a JVC Credit Card at this time.
            </h2>

            <p className="text-[13px] md:text-[13px] text-gray-500 mt-3">
              You can still download the JVC app to check your prequalification and explore JVC Rewards. <br /><br />
              <a href="https://play.google.com/apps/internaltest/4701377086391157882" className="text-[18px] font-bold text-blue-600 underline hover:text-blue-800">
                Download the App
              </a>
            </p>
          </>
        )}

        {/* Failed (PID06 FAIL, PID20 FAIL) or Declined (Experian DECLINED, user declined offer) */}
        {(isFailed || isDeclined) && (
          <>
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-normal text-gray-900 leading-snug">
              Thank you for registering for the JVC Rewards program.
            </h2>

            <p className="text-[13px] md:text-[13px] text-gray-500 mt-3">
              Please download the JVC Consumer App for your iOS or Android Device. <br /><br />
              <a href="https://play.google.com/apps/internaltest/4701377086391157882" className="text-[18px] font-bold text-blue-600 underline hover:text-blue-800">
                Download the App
              </a>
            </p>
          </>
        )}

      </div>
    </div>
  );
};


export default ConsumerDownloadAppPage;