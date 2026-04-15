import MerchantsFAQ from "@/components/merchants/MerchantsFAQ";
import MerchantsHero from "@/components/merchants/MerchantsHero";
import MerchantsNetwork from "@/components/merchants/MerchantsNetwork";
import MerchantsFeatures from "@/components/merchants/MerchantsFeatures";
import MerchantsComparison from "@/components/merchants/MerchantsComparison";
import MerchantsJoinNetwork from "@/components/merchants/MerchantsJoinNetwork";

const MerchantsPage = () => {
  return (
    <div>
      <MerchantsHero />
      <MerchantsFeatures />
      <MerchantsNetwork />
      <MerchantsComparison />
      <MerchantsJoinNetwork />
      <MerchantsFAQ />
    </div>
  );
};

export default MerchantsPage;
