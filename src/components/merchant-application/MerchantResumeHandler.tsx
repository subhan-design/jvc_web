import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect} from "react";
import { useMerchantData } from "@/context/MerchantDataContext";
import { getOnboardingSession } from "@/lib/api";
import { useParams } from "react-router-dom";
const MerchantResumeHandler = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { search } = useLocation();
  const navigate = useNavigate();
  const {
    setMerchantData,
    setCurrentStep,
  } = useMerchantData();

  useEffect(() => {
    console.log("Session Id in url", sessionId);

    if (!sessionId) {
      navigate("/merchant-application");
      return;
    }

    const resume = async () => {
      try {
        const resp = await getOnboardingSession(sessionId);
        const session = resp.data;

        if (session.status === "COMPLETED") {
          navigate("/merchant-onboarding-complete?status=approved");
          return;
        }

        if (session.application_status === "Manual Review") {
          navigate("/merchant-onboarding-complete?status=review");
          return;
        }

        if (session.application_status === "Declined") {
          navigate("/merchant-onboarding-complete?status=denied");
          return;
        }

        setMerchantData({
          personalDetails: session.personalDetails || {},
          businessInformation: session.businessInformation || {},
          ownership: session.ownership || {},
          bankInformation: session.bankInformation || {},
          agreement: session.agreement || {},
        });

        setCurrentStep(session.current_step);

        localStorage.setItem("merchant_onboarding_session", sessionId);

        navigate("/merchant-application");

      } catch (e) {
        console.error("Resume failed", e);
        navigate("/merchant-application");
      }
    };

    resume();
  }, []);

  return <p className="p-8">Resuming your application…</p>;
};

export default MerchantResumeHandler;
