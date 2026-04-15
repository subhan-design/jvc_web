import { useEffect } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {toast} from "sonner";
import MerchantApplicationForm from "@/components/merchant-application/MerchantApplicationForm";
import { log } from "console";

const MerchantApplicationPage = () => {
  const {isAuthenticated, logout} = useAdminAuth();

  useEffect(() =>{
    if(isAuthenticated){
      logout();
    }
  }), [isAuthenticated, logout];

  return (
    <div className=" bg-gray-50">
      <MerchantApplicationForm />
    </div>
  );
};

export default MerchantApplicationPage;
