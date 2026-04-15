import React from "react";
import { Separator } from "@/components/ui/separator";
import { getStateDisclosureConfig } from "@/data/state-disclosure-rates";

const STATE_NAME_TO_CODE: Record<string, string> = {
  "Arizona": "AZ",
  "Colorado": "CO",
  "Oregon": "OR",
};

const STATE_CODE_TO_FULL_NAME: Record<string, string> = {
  "AZ": "Arizona",
  "CO": "Colorado",
  "OR": "Oregon",
};

interface ApplicationDisclosureContentProps {
  state?: string; 
}

export const ApplicationDisclosureContent: React.FC<ApplicationDisclosureContentProps> = ({ state }) => {
  const getStateCode = (stateName?: string): string => {
    if (!stateName) return "AZ"; // Default to Arizona

    if (STATE_CODE_TO_FULL_NAME[stateName]) {
      return stateName;
    }

    return STATE_NAME_TO_CODE[stateName] || "AZ";
  };

  const stateCode = getStateCode(state);
  const stateFullName = STATE_CODE_TO_FULL_NAME[stateCode] || "Arizona";
  const config = getStateDisclosureConfig(stateCode);

  // Determine if APR has market variation
  const hasVariableAPR = config.apr.includes(',');
  const aprDescription = hasVariableAPR
    ? "based upon your credit worthiness"
    : "";
  const aprNote = hasVariableAPR
    ? "This APR will vary with the market based on the rate published by the Board of Governors of the Federal Reserve System in its Statistical Release H.15 Selected Interest Rates."
    : "";

  return (
    <div className="space-y-6 text-sm">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Joint Venture Card of {stateFullName}, LLC
        </h2>
        <p className="text-gray-600">Consumer Credit Card Application Disclosure</p>
      </div>

      <Separator />

      {/* Interest Rates and Interest Charges */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Interest Rates and Interest Charges
        </h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-3 bg-gray-50 font-medium text-gray-800 w-1/2">
                  Annual Percentage Rate (APR) for Purchases
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <div>
                    <p>
                      {config.apr} {aprDescription}
                    </p>
                    {aprNote && (
                      <p className="text-sm text-gray-500 mt-1">
                        {aprNote}
                      </p>
                    )}
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-3 bg-gray-50 font-medium text-gray-800">
                  Penalty APR and When it Applies
                </td>
                <td className="px-4 py-3 text-gray-600">None</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-3 bg-gray-50 font-medium text-gray-800">
                  Paying Interest
                </td>
                <td className="px-4 py-3 text-gray-600">
                  We will begin charging interest on purchases on the
                  transaction date.
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-3 bg-gray-50 font-medium text-gray-800">
                  Minimum Interest Charge
                </td>
                <td className="px-4 py-3 text-gray-600">None</td>
              </tr>
              <tr>
                <td className="px-4 py-3 bg-gray-50 font-medium text-gray-800">
                  For Credit Card Tips from the Consumer Financial
                  Protection Bureau
                </td>
                <td className="px-4 py-3 text-gray-600">
                  To learn more about factors to consider when applying
                  for or using a credit card, visit the website of the
                  Consumer Financial Protection Bureau at{" "}
                  <a
                    href="http://www.consumerfinance.gov/learnmore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    http://www.consumerfinance.gov/learnmore
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Separator />

      {/* Fees */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Fees
        </h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-3 bg-gray-50 font-medium text-gray-800 w-1/2">
                  Annual Fee
                </td>
                <td className="px-4 py-3 text-gray-600">None</td>
              </tr>
              <tr>
                <td className="px-4 py-3 bg-gray-50 font-medium text-gray-800">
                  Penalty Fees
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>• Late Payment</span>
                      <span className="font-medium">
                        {config.latePayment}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Returned Payment</span>
                      <span className="font-medium">{config.returnedPayment}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Separator />

      {/* Additional Information */}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-800">
            How We Will Calculate Your Balance
          </h4>
          <p className="text-gray-600">
            We use a method called "average daily balance (including new
            transactions)."
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            The information provided in this disclosure is accurate as
            of August 1, 2025. The information may have changed after
            that date. To find out what may have changed call us at{" "}
            <span className="font-medium">855.858.2227</span> or write
            us at{" "}
            <span className="font-medium">question@jvccard.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};