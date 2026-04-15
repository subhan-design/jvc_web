import ApprovalSection from "@/components/home/ApprovalSection";
import FAQSection from "@/components/home/FAQSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import NetworkSection from "@/components/home/NetworkSection";
import PaymentFeaturesSection from "@/components/home/PaymentFeaturesSection";
import RewardsSection from "@/components/home/RewardsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <FeaturesSection />
      <PaymentFeaturesSection />
      <ApprovalSection />
      <RewardsSection />
      <TestimonialSection />
      <NetworkSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
