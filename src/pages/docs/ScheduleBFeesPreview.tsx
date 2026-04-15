import React from "react";

const ScheduleBFeesPreview = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="bg-white border border-gray-300 shadow-lg rounded-md max-w-3xl w-full px-8 py-10">
        <h1 className="text-2xl font-bold text-center mb-8">
          Schedule “B” Schedule of Fees and Charges
        </h1>
        <ol className="list-decimal pl-8 text-gray-900 text-base leading-relaxed space-y-4 mb-8">
          <li>
            <span className="font-semibold">Schedule Amendments.</span> Merchant
            understands and agrees that Joint Venture Card may impose a change
            to the terms of this Schedule of Fees and Charges from time to time
            at their sole discretion, after Joint Venture Card gives reasonable
            advance notice of any such change to Merchant. Merchant understands
            and agrees that notice of a change to the Schedule of Fees and
            Charges shall be considered reasonable if Joint Venture Card sends
            it in the manner and to the location Merchant specified in its most
            recent Designation of Merchant, Merchant Affiliates, and Notice
            Addresses (Schedule “A” to the Agreement), at least ten (10)
            Business Days before the effective date of any such change. Merchant
            shall be deemed to have accepted and agreed to any such changes if
            it accepts purchases for new Card Sales to Joint Venture Card on or
            after the effective date for the change that Joint Venture Card
            specified in its notice.
          </li>
          <li>
            <span className="font-semibold">
              Credit Sale Acceptance and Payment.
            </span>{" "}
            Joint Venture Card agrees to pay Merchant the amounts due for the
            Credit Sales for acceptance during the term of the Agreement,
            subject to all terms, conditions, representations, and warranties
            made by Merchant in the Agreement, the compliance by Merchant with
            all duties assigned to it by the Agreement, and the satisfaction by
            Merchant of all conditions related to the authorization, acceptance
            and processing of Charge Slips established by the Agreement,
            including those described in the Merchant Operating Guide.
          </li>
          <li>
            <span className="font-semibold">Returns and Refunds.</span> Joint
            Venture Card may deduct from any amount due to the Merchant in
            connection with this Agreement, the amounts that become due from
            Merchant for Chargebacks or other reasons authorized by the
            Agreement.
          </li>
          <li>
            <span className="font-semibold">Transaction Processing.</span>{" "}
            Merchant agrees to pay Joint Venture Card a Transaction Processing
            Fee for each Credit Sale. Joint Venture Card may deduct from any
            amount due to the Merchant in connection with this Agreement, the
            amounts that become due from Merchant for the Transaction Processing
            Fees.
          </li>
          <li>
            <span className="font-semibold">Cash Back Rewards.</span> Merchant
            understands and agrees to participate in the cardholder “Cash Back”
            rewards program. The cardholder cash back reward is one (1%) of net
            purchases which shall be split 50/50 between the Merchant and Joint
            Venture Card. Joint Venture Card may deduct from any amount due to
            the Merchant in connection with this Agreement, the amount due from
            Merchant for its participation in the Cash Back Rewards program.
          </li>
          <li>
            <span className="font-semibold">Due Diligence.</span> Merchant
            agrees to pay Joint Venture Card a Due Diligence Fee for its
            investigation and evaluation of the merchant and its owners during
            the account opening process.
          </li>
          <li>
            <span className="font-semibold">
              Liability for Amounts Not Timely Paid by Merchant.
            </span>{" "}
            If Merchant has not made payment in full of any amounts due for
            credits and returns in the time and manner described above, Merchant
            must pay such amounts to Joint Venture Card within ten (10) days
            after Merchant receives a written notice from Joint Venture Card
            requiring payment of these amounts. If Merchant does not pay Joint
            Venture Card the full amount due within ten (10) days after Merchant
            receives this notice from Joint Venture Card, Merchant agrees that
            it is also liable to Joint Venture Card for an amount equal to the
            lesser of: (i) seventeen percent (17%) per year on the amount
            specified in Joint Venture Card’s written notice from the date such
            amount became due until it is paid in full; or (ii) the maximum
            daily rate of interest that may be permitted by Applicable Law on
            the amount specified in Joint Venture Card’s written notice from the
            date such amount became due until it is paid in full.
          </li>
        </ol>
        <h2 className="text-lg font-semibold mb-4 text-center">Fee Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-400 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">
                  Fee Type
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-4 py-2">
                  Transaction Processing
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  2.40% of the purchase amount + $0.25 per transaction
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">
                  Cardholder Cash Back Rewards participation.
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  1% of the purchase transaction amount (0.5% net to each party)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">POS Set-up</td>
                <td className="border border-gray-400 px-4 py-2">
                  No Charge using our QR code merchant app
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">
                  Merchant Enrollment and Due Diligence
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  $150 one-time. Waived if Merchant Application received prior
                  to January 1, 2025
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-400">
            <tbody>
              <tr>
                <td className="border border-gray-400 px-4 py-2">
                  Employee Referral Bonus paid to Merchant for the benefit of
                  the employee who referred the consumer to the credit card
                  application.
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  $8.00 per approved credit card account.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleBFeesPreview;
