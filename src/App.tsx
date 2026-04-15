import Layout from "@/layout/Layout";
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/HomePage";
import { Toaster } from "@/components/ui/toaster";
import MerchantsPage from "@/pages/MerchantsPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import MerchantApplicationPage from "@/pages/MerchantApplicationPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConsumerApplicationPage from "./pages/ConsumerApplicationPage";
import PhoneVerificationPage from "./pages/PhoneVerificationPage";
import MerchantOnboardingCompletePage from "./pages/MerchantOnboardingCompletePage";
import AdditionalInformation from "./components/merchant-application/steps/AdditionalInformation";
import TermsOfServicePreview from "@/pages/docs/TermsOfServicePreview";
import ScheduleBFeesPreview from "./pages/docs/ScheduleBFeesPreview";
import ScheduleCACHAuthorizationPreview from "./pages/docs/ScheduleCACHAuthorizationPreview";
import ScheduleAFeesPreview from "@/pages/docs/ScheduleAFeesPreview";
import ScheduleDPrivacyPreview from "./pages/docs/ScheduleDPrivacyPreview";
import ConsentElectronicRecordsPreview from "./pages/docs/ConsentElectronicRecordsPreview";
import ApplicationDisclosuresPreview from "./pages/docs/ApplicationDisclosuresPreview";
import FinancialPrivacyNoticePreview from "./pages/docs/FinancialPrivacyNoticePreview";
import CreditCardAgreementPreview from "./pages/docs/CreditCardAgreementPreview";
import CreditCardOnlineAgreementPreview from "./pages/docs/CreditCardOnlineAgreementPreview";
import { MerchantDataProvider } from "@/context/MerchantDataContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminLogoutPage from "@/pages/admin/AdminLogoutPage";
import MerchantAdminHome from "./components/merchant-admin-application/AdminHome";
import ApplicationReview from "./components/merchant-admin-application/ApplicationReview";
import ReviewQueue from "./components/merchant-admin-application/merchant-enrollment/ReviewQueue";
import CompletedApplications from "./components/merchant-admin-application/merchant-enrollment/CompletedApplications";
import PendingApplications from "./components/merchant-admin-application/merchant-enrollment/PendingApplications";
import ApplicationDetailView from "./components/merchant-admin-application/ApplicationDetailView";
import MerchantPaymentConfiguration from "./components/merchant-admin-application/merchant-enrollment/merchant-payment/merchant-payment-configuration";
import MerchantCreditCardSurcharge from "./components/merchant-admin-application/merchant-enrollment/merchant-payment/merchant-credit-card-surcharge";
import ConsumerApplicationsPage from "./components/consumer-admin-application/ConsumerApplicationsPage";
import MerchantAgreementPreview from "./pages/docs/MerchantAgreementPreview";
import OnlinePrivacyPolicyPreview from "./pages/docs/OnlinePrivacyPolicyPreview";
import MerchantOperatingGuidePreview from "./pages/docs/MerchantOperatingGuidePreview";
import SettlementsPage from "./pages/SettlementsPage";
import TransactionDisputePage from "./pages/TransactionDisputePage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminAutoLogout from "@/components/AdminAutoLogout";
import ConsumerDeclinePage from "./pages/ConsumerDeclinePage";
import ConsumerDownloadAppPage from "./pages/ConsumerDownloadAppPage";
import { useEffect } from "react";
import MerchantResumeHandler from "@/components/merchant-application/MerchantResumeHandler";
import OnlinePrivacyPolicyPreviewConsumer from "./pages/docs/OnlinePrivacyPolicyPreviewConsumer";

const queryClient = new QueryClient();

const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
};

// Wrapper component to render Outlet within MerchantDataProvider
const MerchantRoutes = () => (
  <MerchantDataProvider>
    <Outlet />
  </MerchantDataProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminAutoLogout />
          <Routes>
            {/* Admin Routes*/}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Consumer Admin — standalone route to avoid MerchantDataContext conflicts */}
            <Route
              path="/consumer-admin-application"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ConsumerApplicationsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route element={<Layout />}>
              <Route path="/admin/logout" element={<AdminLogoutPage />} />
              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Navigate to="/merchant-admin-application" replace />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/merchant-admin-application"
                element={
                  <ProtectedRoute>
                    <MerchantAdminHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/merchant-admin-application/review-queue"
                element={
                  <ProtectedRoute>
                    <ReviewQueue />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/merchant-admin-application/review/:id"
                element={
                  <ProtectedRoute>
                    <ApplicationReview />
                  </ProtectedRoute>
                }
              />

              {/* optional: if someone hits /review without id, send them to the queue */}
              <Route
                path="/merchant-admin-application/review"
                element={<Navigate to="/merchant-admin-application/review-queue" replace />}
              />

              <Route
                path="/merchant-admin-application/completed"
                element={
                  <ProtectedRoute>
                    <CompletedApplications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/merchant-admin-application/pending"
                element={
                  <ProtectedRoute>
                    <PendingApplications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/merchant-admin-application/view/:id"
                element={
                  <ProtectedRoute>
                    <ApplicationDetailView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/merchant-admin-application/payment-config"
                element={
                  <ProtectedRoute>
                    <MerchantPaymentConfiguration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/merchant-admin-application/credit-card-surcharge"
                element={
                  <ProtectedRoute>
                    <MerchantCreditCardSurcharge />
                  </ProtectedRoute>
                }
              />

              {/* Verified signup routes redirect to consumer application */}
              <Route path="/rewards/signup/verified" element={<Navigate to="/consumer-application" replace />} />
              <Route path="/rewards/signup/manual" element={<Navigate to="/consumer-application" replace />} />

              {/* Merchant Routes - wrapped with MerchantDataProvider */}
              <Route element={<MerchantRoutes />}>
                {/*Wordpress based pages link*/}
                <Route path="/" element={<ExternalRedirect to="https://jvcpayments.com/" />} />
                <Route path="/merchants" element={<ExternalRedirect to="https://jvcpayments.com/merchants" />} />
                <Route path="/about" element={<ExternalRedirect to="https://jvcpayments.com/about-us/" />} />
                <Route path="/contact" element={<ExternalRedirect to="https://jvcpayments.com/contact" />} />


                {/*React based pages link*/}
                {/* <Route path="/" element={<HomePage/>} >
                <Route path="/merchants" element={<MerchantsPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} /> */}
                {/* <Route path="/features" element={<ContactPage />} />
                <Route path="/security" element={<ContactPage />} />
                <Route path="/integrations" element={<ContactPage />} />
                <Route path="/careers" element={<ContactPage />} />
                <Route path="/press" element={<ContactPage />} />
                <Route path="/help-center" element={<ContactPage />} />
                <Route path="/api-documentation" element={<ContactPage />} />
                <Route path="/system-status" element={<ContactPage />} />
                <Route path="/community" element={<ContactPage />} /> */}

                <Route
                  path="/merchant-application"
                  element={<MerchantApplicationPage />}
                />
                 <Route
                  path="/merchant-app"
                  element={<MerchantApplicationPage />}
                />
                <Route
                  path="/merchant-application/resume/:sessionId"
                  element={<MerchantResumeHandler />}
                />

                <Route
                  path="/consumer-application"
                  element={<ConsumerApplicationPage />}
                />
                <Route
                  path="/consumer-onboarding-complete"
                  element={<ConsumerDeclinePage />}
                />
                <Route
                  path="/consumer-download-app"
                  element={<ConsumerDownloadAppPage />}
                />


                <Route
                  path="/merchant-onboarding-complete"
                  element={<MerchantOnboardingCompletePage />}
                />
                <Route
                  path="/merchant-additional-information"
                  element={<AdditionalInformation merchantData={{} as any} />}
                />
                <Route path="/settlements" element={<SettlementsPage />} />
                <Route path="/transaction-dispute" element={<TransactionDisputePage />} />

                <Route
                  path="/docs/merchant-agreement/preview"
                  element={<MerchantAgreementPreview />}
                />
              </Route>
            </Route>
            <Route
              path="/phone-verification/:type"
              element={<PhoneVerificationPage />}
            />
            <Route
              path="/docs/terms-of-service/preview"
              element={<TermsOfServicePreview />}
            />
            <Route
              path="/docs/schedule-b/preview"
              element={<ScheduleBFeesPreview />}
            />
            <Route
              path="/docs/schedule-c/preview"
              element={<ScheduleCACHAuthorizationPreview />}
            />
            <Route
              path="/docs/schedule-a/preview"
              element={<ScheduleAFeesPreview />}
            />
            <Route
              path="/docs/schedule-d/preview"
              element={<ScheduleDPrivacyPreview />}
            />

            {/* Consumer Application Document Routes */}
            <Route
              path="/docs/consent-electronic-records/preview"
              element={<ConsentElectronicRecordsPreview />}
            />
            <Route
              path="/docs/application-disclosures/:state/preview"
              element={<ApplicationDisclosuresPreview />}
            />
            <Route
              path="/docs/financial-privacy-notice/preview"
              element={<FinancialPrivacyNoticePreview />}
            />
            <Route
              path="/docs/credit-card-agreement/preview"
              element={<CreditCardAgreementPreview />}
            />
            <Route
             path="/docs/consent-electronic-records-2025/preview"
              element={<ConsentElectronicRecordsPreview />}
        />
             <Route
             path="/docs/online-privacy-policy/preview"
              element={<OnlinePrivacyPolicyPreview />}
        />
          <Route
             path="/docs/online-privacy-policy-consumer/preview"
              element={<OnlinePrivacyPolicyPreviewConsumer />}
        />
            <Route path="/docs/merchant-operating-guide/preview"
              element={<MerchantOperatingGuidePreview />}
        
        />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
