import React from "react";
import { useMerchantData } from "@/context/MerchantDataContext";

const ScheduleAFeesPreview = () => {
  const { merchantData } = useMerchantData();
  const businessInfo = merchantData?.businessInformation || {};
  const personalInfo = merchantData?.personalDetails || {};

  // Date for the document
  const today = new Date();
  const dateStr = today.toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="bg-white border border-gray-300 shadow-lg rounded-md max-w-5xl w-full px-8 py-10">
        <h1 className="text-2xl font-bold text-center mb-2">Schedule "A"</h1>
        <h2 className="text-xl font-bold text-center mb-8">
          Designation of Merchant, Merchant Affiliates, and Notice Addresses
        </h2>

        <div className="text-gray-900 text-base leading-relaxed space-y-6">
          <p className="mb-6">
            Any change to this Designation of Merchant, Merchant Affiliates, and
            Notice Addresses after the Effective Date of the Agreement must be
            in writing and signed by a duly authorized officer of Joint Venture
            Card and Merchant to be effective and binding on the Parties.
          </p>

          <p className="font-semibold mb-4">
            Check and complete one of the following:
          </p>

          {/* Section 1 */}
          <div className="border border-gray-300 rounded p-4 mb-6">
            <div className="flex items-start mb-4">
              <input type="checkbox" className="mt-1 mr-2" />
              <div>
                <h3 className="font-semibold">
                  COMPLETE IF ONE LOCATION, OR MULTIPLE LOCATIONS ARE FILING
                  TAXES TOGETHER.
                </h3>
                <p className="mt-2">
                  As of the Schedule "A" Effective Date shown below, the entity
                  operating as "Merchant" under the Agreement is{" "}
                  <span className="border-b border-gray-400 inline-block min-w-48">
                    {businessInfo.legalNameOfBusiness || "N/A"}
                  </span>
                  , and this entity operates all Merchant business locations
                  using the following Federal Tax Identification Number (EIN):{" "}
                  <span className="border-b border-gray-400 inline-block min-w-32">
                    {businessInfo.ssn || "N/A"}
                  </span>
                  . The address that used to provide any notice to Merchant
                  required or allowed by the Agreement, other than Retrieval
                  Requests, is:{" "}
                  <span className="border-b border-gray-400 inline-block min-w-48">
                    {businessInfo.primaryPhysicalAddress1 &&
                    businessInfo.city &&
                    businessInfo.state &&
                    businessInfo.zipCode
                      ? `${businessInfo.primaryPhysicalAddress1}, ${businessInfo.city}, ${businessInfo.state} ${businessInfo.zipCode}`
                      : "N/A"}
                  </span>
                  . The address that used to submit Retrieval Requests to
                  Merchant is:{" "}
                  <span className="border-b border-gray-400 inline-block min-w-48">
                    {businessInfo.primaryPhysicalAddress1 &&
                    businessInfo.city &&
                    businessInfo.state &&
                    businessInfo.zipCode
                      ? `${businessInfo.primaryPhysicalAddress1}, ${businessInfo.city}, ${businessInfo.state} ${businessInfo.zipCode}`
                      : "N/A"}
                  </span>
                  .
                </p>
                <p className="mt-2 mb-4">
                  Merchant may make Card Sales and submit Charge Slips for
                  funding from only the following business location(s):
                </p>

                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 p-2 text-left">
                        Merchant Location Name
                      </th>
                      <th className="border border-gray-400 p-2 text-left">
                        Street Address, City, State, Zip
                      </th>
                      <th className="border border-gray-400 p-2 text-left">
                        Telephone Number
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-2">
                        {businessInfo.legalNameOfBusiness || "N/A"}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {businessInfo.primaryPhysicalAddress1 &&
                        businessInfo.city &&
                        businessInfo.state &&
                        businessInfo.zipCode
                          ? `${businessInfo.primaryPhysicalAddress1}, ${businessInfo.city}, ${businessInfo.state} ${businessInfo.zipCode}`
                          : "N/A"}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {personalInfo.phone || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2">N/A</td>
                      <td className="border border-gray-400 p-2">N/A</td>
                      <td className="border border-gray-400 p-2">N/A</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2">N/A</td>
                      <td className="border border-gray-400 p-2">N/A</td>
                      <td className="border border-gray-400 p-2">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="border border-gray-300 rounded p-4 mb-6">
            <div className="flex items-start mb-4">
              <input type="checkbox" className="mt-1 mr-2" />
              <div>
                <h3 className="font-semibold">
                  COMPLETE IF MULTIPLE LOCATIONS, ALL FILING INDIVIDUAL TAX
                  RETURNS.
                </h3>
                <p className="mt-2">
                  As of the Schedule "A" Effective Date shown below, the entity
                  principally operating as "Merchant" under the Agreement is{" "}
                  <span className="border-b border-gray-400 inline-block min-w-64">
                    {businessInfo.legalNameOfBusiness || "N/A"}
                  </span>
                  and other entities that are "Affiliates" of Merchant are
                  identified below. The address used to provide notice to
                  Merchant or and any Merchant Affiliate required or allowed by
                  the Agreement, other than Retrieval Requests, is:{" "}
                  <span className="border-b border-gray-400 inline-block min-w-48">
                    {businessInfo.primaryPhysicalAddress1 &&
                    businessInfo.city &&
                    businessInfo.state &&
                    businessInfo.zipCode
                      ? `${businessInfo.primaryPhysicalAddress1}, ${businessInfo.city}, ${businessInfo.state} ${businessInfo.zipCode}`
                      : "N/A"}
                  </span>
                  . The address that may be used to submit Retrieval Requests to
                  Merchant or a Merchant Affiliate is:{" "}
                  <span className="border-b border-gray-400 inline-block min-w-48">
                    {businessInfo.primaryPhysicalAddress1 &&
                    businessInfo.city &&
                    businessInfo.state &&
                    businessInfo.zipCode
                      ? `${businessInfo.primaryPhysicalAddress1}, ${businessInfo.city}, ${businessInfo.state} ${businessInfo.zipCode}`
                      : "N/A"}
                  </span>
                  . The Federal Tax Identification Numbers (EINs) of Merchant
                  and Merchant Affiliates, and the business locations from which
                  Merchant and Merchant Affiliates may make Card Sales and
                  submit Charge Slips for funding are limited to the following:
                </p>

                <table className="w-full border-collapse border border-gray-400 mt-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 p-2 text-left">
                        Name of Merchant or
                        <br />
                        Merchant Affiliate
                      </th>
                      <th className="border border-gray-400 p-2 text-left">
                        Federal Tax Identification
                        <br />
                        Number (EIN)
                      </th>
                      <th className="border border-gray-400 p-2 text-left">
                        Street Address, City, State,
                        <br />
                        Zip
                      </th>
                      <th className="border border-gray-400 p-2 text-left">
                        Telephone Number
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-2">
                        {businessInfo.legalNameOfBusiness || "N/A"}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {businessInfo.ssn || "N/A"}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {businessInfo.primaryPhysicalAddress1 &&
                        businessInfo.city &&
                        businessInfo.state &&
                        businessInfo.zipCode
                          ? `${businessInfo.primaryPhysicalAddress1}, ${businessInfo.city}, ${businessInfo.state} ${businessInfo.zipCode}`
                          : "N/A"}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {personalInfo.phone || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2">N/A</td>
                      <td className="border border-gray-400 p-2">N/A</td>
                      <td className="border border-gray-400 p-2">N/A</td>
                      <td className="border border-gray-400 p-2">N/A</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2">N/A</td>
                      <td className="border border-gray-400 p-2">N/A</td>
                      <td className="border border-gray-400 p-2">N/A</td>
                      <td className="border border-gray-400 p-2">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Legal Text */}
          <div className="mt-8 p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-700 leading-relaxed">
              Merchant and the person signing below represent and warrant that
              such person is duly authorized by Merchant, and by any Merchant
              Affiliate listed above, to sign on its behalf and their behalf,
              for purposes of binding Merchant and any listed Merchant Affiliate
              to the Agreement and this Designation of Merchant, Merchant
              Affiliates and Notice Addresses. If any Merchant Affiliates are
              listed above, Merchant represents, warrants and covenants that:
              (a) Merchant has the necessary legal authority to bind itself and
              any listed Merchant Affiliate to the terms of the Agreement; (b)
              the submission of Applications and Charge Slips to Joint Venture
              Card by a Merchant Affiliate constitutes its agreement to be bound
              by the terms and conditions of the Agreement; and (c) Merchant
              shall be solely responsible for ensuring compliance by any such
              Merchant Affiliate with the Agreement, and fully liable for any
              failure of a Merchant Affiliate to comply with the Agreement.
            </p>
          </div>

          {/* Date Field */}
          <div className="mt-6 text-right">
            <span className="border-b border-gray-400 inline-block min-w-32 mr-2">
              {dateStr}
            </span>
            , on
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAFeesPreview;
