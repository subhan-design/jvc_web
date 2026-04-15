import ConsumerApplicationForm from "@/components/consumer-application/ConsumerApplicationForm";
import { ConsumerDataProvider } from "@/context/ConsumerDataContext";

const ConsumerApplicationPage = () => {
  return (
    <ConsumerDataProvider>
      <div className="bg-gray-50">
        <ConsumerApplicationForm />
      </div>
    </ConsumerDataProvider>
  );
};

export default ConsumerApplicationPage;