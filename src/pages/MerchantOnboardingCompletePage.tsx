import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, FileText, XCircle, Clock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useMerchantData } from "@/context/MerchantDataContext";

const MerchantOnboardingCompletePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status'); // 'approved', 'denied', 'review'
  const message = searchParams.get('message'); 
  const { handleResumeSession} = useMerchantData();

  
 

useEffect(() => {

    localStorage.removeItem("merchantFormCurrentStep");
    localStorage.removeItem("merchantData");
  }
);


  // Define content based on status
  const getStatusContent = () => {
    switch (status) {
      case 'denied':
        return {
          icon: <XCircle className="h-16 w-16 text-red-600" />,
          iconBg: 'bg-red-100',
          title: 'Application Not Approved',
          titleColor: 'text-blue-600',
          description: message || 'Thank you for your interest in our credit card program.  Unfortunately, we are unable to approve your enrollment application at this time.  Please contact your relationship manager for additional information.',
        };
      case 'review':
        default:
        return {
          icon: <Clock className="h-16 w-16 text-orange-600" />,
          iconBg: 'bg-orange-100',
          title: 'Application in Review',
          titleColor: 'text-blue-600',
          description: 'We are reviewing your application at this time. Our relationship manager will be contacting you shortly. Thank you for your interest in our credit card program.',
        };
      case 'approved':
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-600" />,
          iconBg: 'bg-green-100',
          title: 'Congratulations',
          titleColor: 'text-blue-600',
          description: 'Your application for merchant enrollment has been approved! You may begin accepting the JVC Card by downloading the JVC Merchant App.',
        };
    }
  };

  const content = getStatusContent();

  return (
  <div className="bg-jvc-blue-950 min-h-screen flex flex-col">
    {/* Top header spacing so content is not stuck at top */}
    <div className="pt-32 pb-16" />
    <section className="bg-jvc-blue-950 text-white py-20 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-300 mb-6">
          <span className="text-gray-400">Home</span> &nbsp;›&nbsp;{" "}
          <span className="text-white font-medium">
            Merchant Business Information
          </span>
        </nav>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Merchant
          <br />
          Business
          <br />
          Information
        </h1>
      </div>
    </section>

    {/* White section, centered text */}
    <div className="bg-white flex-1 flex flex-col items-center justify-start text-center px-4 py-20">
      
      {/* Title */}
      <h1 className="text-xl font-semibold text-blue-600 mb-6">
        {content.title}!
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
        {content.description}
      </p>
    </div>
  </div>
);
};

export default MerchantOnboardingCompletePage;