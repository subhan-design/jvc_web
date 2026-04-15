import { Button } from "@/components/ui/button";

interface PreScreenNoticePageProps {
  onNext: () => void;
  onPrev: () => void;
}

const PreScreenNoticePage = ({ onNext, onPrev }: PreScreenNoticePageProps) => {
  return (
    <div className="bg-white rounded-lg p-6 lg:p-8 w-full mx-auto">
          {/* PRESCREEN & OPT-OUT */}
          <div className="space-y-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-[#043C6B]">
                PRESCREEN AND OPT-OUT NOTICE:
              </h3>
              <p className="leading-relaxed">
                The consumer received the offer of credit or insurance because the consumer satisfied
                the criteria for credit worthiness or insurability under which the consumer was selected
                for the offer. If applicable, the credit or insurance may not be extended if, after the
                consumer responds to the offer, the consumer does not meet the criteria used to select
                the consumer for the offer or any applicable criteria bearing on credit worthiness or
                insurability or does not furnish any required collateral. You have the right to prohibit
                information contained in your credit file with any credit reporting agency from being used
                in connection with any credit or insurance transactions that you did not initiate. To
                exercise this right, please call Experian Opt-Out at 1-888-5OPTOUT (1-888-567-8688), or
                write to Experian, P.O. Box 919, Allen, TX 75013.
              </p>
            </div>

            {/* OFFER TERMS */}
            <div>
              <h3 className="font-semibold text-lg mb-2 text-[#043C6B]">
                OFFER TERMS AND CONDITIONS:
              </h3>
              <p className="leading-relaxed">
                This offer is made by Joint Venture Card. Information from your consumer credit report
                was used in connection with this offer and you received this offer because certain
                creditworthiness criteria used to screen persons was satisfied. Credit may not be
                extended if, after you respond to this offer, you no longer meet the selection criteria.
                Additional eligibility requirements for this line of credit include, but are not limited to,
                submission of a complete application, acceptable debt-to-income ratio, verification of
                identity, and verifiable bank account in your name. Other terms and conditions may
                apply. Minimum line assignment is $250.
              </p>
            </div>

            {/* ===== TABLE: Interest Rates And Interest Charges ===== */}
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 text-xs sm:text-sm font-medium text-gray-700">
                Interest Rates And Interest Charges
              </div>

              <div className="divide-y">
                {/* Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 text-sm">
                  <div className="font-semibold text-[#043C6B]">
                    Annual Percentage Rate (APR) for Purchases
                  </div>
                  <div className="sm:col-span-2">
                    <p>
                      <span className="font-semibold">21.99%, 26.99% or 31.99%</span> based upon your credit worthiness.
                    </p>
                    <p className="mt-1 text-gray-600">
                      This APR will vary with the market based on the rate published by the Board of Governors
                      of the Federal Reserve System in its Statistical Release H.15 Selected Interest Rates.
                    </p>
                  </div>
                </div>

                {/* Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 text-sm">
                  <div className="font-semibold text-[#043C6B]">
                    Penalty APR and When it Applies
                  </div>
                  <div className="sm:col-span-2">None</div>
                </div>

                {/* Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 text-sm">
                  <div className="font-semibold text-[#043C6B]">Paying Interest</div>
                  <div className="sm:col-span-2">
                    We will begin charging interest on purchases on the transaction date.
                  </div>
                </div>

                {/* Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 text-sm">
                  <div className="font-semibold text-[#043C6B]">Minimum Interest Charge</div>
                  <div className="sm:col-span-2">None</div>
                </div>

                {/* Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 text-sm">
                  <div className="font-semibold text-[#043C6B]">
                    For Credit Card Tips from the Consumer Financial Protection Bureau
                  </div>
                  <div className="sm:col-span-2">
                    To learn more about factors to consider when applying for or using a credit card,
                    visit the website of the Consumer Financial Protection Bureau at{" "}
                    <a
                      href="https://www.consumerfinance.gov/learnmore"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#043C6B] underline"
                    >
                      consumerfinance.gov/learnmore
                    </a>.
                  </div>
                </div>
              </div>
            </div>

            {/* ===== TABLE: Fees ===== */}
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 text-xs sm:text-sm font-medium text-gray-700">
                Fees
              </div>

              <div className="divide-y">
                {/* Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 text-sm">
                  <div className="font-semibold text-[#043C6B]">Annual Fee</div>
                  <div className="sm:col-span-2">None</div>
                </div>

                {/* Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 text-sm">
                  <div className="font-semibold text-[#043C6B]">Penalty Fees</div>
                  <div className="sm:col-span-2">
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        <span className="font-medium">Late payment:</span> 5% of payment amount due
                      </li>
                      <li>
                        <span className="font-medium">Returned payment:</span> $15
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-8 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              className="px-6"
            >
              Previous
            </Button>
            {/* <Button
              type="button"
              onClick={onNext}
              className="bg-[#043C6B] hover:bg-[#032a52] text-white px-6"
            >
              Next
            </Button> */}
          </div>
    </div>
  );
};

export default PreScreenNoticePage;
