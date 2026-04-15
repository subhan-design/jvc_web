import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMerchantData } from "@/context/MerchantDataContext";

const MerchantOperatingGuidePreview = () => {
  const { merchantData } = useMerchantData();

  // Extract merchant data
  const personal = merchantData?.personalDetails || {};
  const business = merchantData?.businessInformation || {};
  const fullName = `${personal.firstName || ''} ${personal.lastName || ''}`.trim();
  const merchantName = business.legalNameOfBusiness || business.dbaIfApplicable || fullName || 'Merchant';
  const email = personal.email || '';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Document Content - Page 1 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            {/* Merchant Info Header */}
            {merchantName && (
              <div className="mb-6 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Merchant:</strong> {merchantName}
                </p>
                {email && (
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {email}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  <strong>Accepted Date:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            )}

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Merchant Operating Guide
              </h1>
              <p className="text-sm text-gray-600">Revised October 2025</p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Definitions
                </h2>
                <p>
                  Capitalized terms used in this Merchant Operating Guide have
                  the meanings assigned to them by the JVC Merchant Agreement
                  between Merchant and Joint Venture Card.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Changes to Merchant Operating Guide
                </h2>
                <p>
                  Merchant understands and agrees that Joint Venture Card may
                  change the terms of this Merchant Operating Guide from time to
                  time at their sole discretion and expense, after Joint Venture
                  Card gives reasonable advance notice of any such change to
                  Merchant. Merchant understands and agrees that notice of a
                  change to the Merchant Operating Guide shall be considered
                  reasonable if Joint Venture Card sends it in the manner and to
                  the location Merchant specified in its most recent Designation
                  of Merchant, Merchant Affiliates, and Notice Addresses
                  (Schedule "A" to the Agreement), at least thirty (30) days
                  before the effective date of any such change. Merchant shall
                  accept and be bound by changes made to this Merchant Operating
                  Guide if Merchant transmits any new Charge Slip or new
                  Application to Joint Venture Card on or after the effective
                  date of the change.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Business Practices
                </h2>
                <p className="font-medium text-gray-900 mb-2">
                  This section includes requirements that can result in a whole
                  or partial Chargeback of any funding if violated.
                </p>

                <ul className="list-disc ml-6 space-y-3">
                  <li>
                    Merchant must provide <em>bona fide</em> sale of goods and
                    services in connection with each Card Sale, pursuant to
                    standard customs and trade practices and any applicable
                    manufacturer's warranties. Merchant must provide any
                    repairs, services, and replacements associated with its
                    Goods and Services in the time and manner required by
                    Applicable Law and take any corrective action that may be
                    required by Applicable Law.
                  </li>

                  <li>
                    If Merchant elects to impose a surcharge, convenience fee,
                    or other additional or different fee or charge that causes
                    an increase to the cash price of the Goods and Services that
                    Merchant assesses at the time of a Card Sale as a result of
                    any Cardholder's use or request to use a Card or Account,
                    including the Cardholder Credit Card Surcharge, such
                    surcharges and other fees may only be imposed as permitted
                    in the Agreement and in compliance with applicable law,
                    including the proper posting of prices. Note that such
                    requirements may vary based on the state in which Merchant
                    is operating.
                  </li>

                  <li>
                    Merchant must not make any card sale in connection with the
                    sale of any motorized vehicle or other product in which a
                    title document, lien, or other security interest is created
                    between the Merchant and Cardholder. If such a security
                    interest or title document exists, such interest or title
                    shall be vested in or held by Joint Venture Card, and Joint
                    Venture Card shall be the sole party in interest of any
                    purchase-money security interests.
                  </li>

                  <li>
                    Merchant may not submit a credit card purchase for funding
                    for the purpose of (1) disbursing cash to Cardholder, or (2)
                    funding a loan, lease, or similar structure in which a
                    Cardholder does not receive goods or non-banking services.
                  </li>

                  <li>
                    Merchant shall maintain reasonable and fair (as determined
                    by Joint Venture Card) refund, return, exchange, and
                    cancellation policies, which are designed and reasonably
                    expected to be understood by the average Consumer, including
                    explanation of any restocking or similar fees, and that any
                    return policy that excludes reimbursement under any
                    circumstances for services not rendered is deemed
                    unreasonable.
                  </li>

                  <li>
                    Any return or refund policy will be clearly and
                    conspicuously disclosed to Cardholders and in one or more
                    documents signed by the Cardholder.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Page break divider */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 2</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Page 2 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <ul className="list-disc ml-6 space-y-3">
                <li>
                  Merchant shall not submit a credit card purchase that is
                  illegal under State law, fraudulent or not related to a bona
                  fide transaction in the Merchant's ordinary course of
                  business, or is subject to any claim of illegality,
                  cancellation, rescission, avoidance or offset for any reason
                  whatsoever, including without limitation negligence, fraud, or
                  dishonesty on the part of Merchant or any of its agents or
                  employees or Affiliates.
                </li>

                <li>
                  Merchant will not process a credit card purchase when an item
                  is to be shipped to an address other than the address on file
                  with Joint Venture Card for the Cardholder.
                </li>

                <li>
                  Merchant will only display or use Applications, Charge Slips,
                  Credit Slips, Program marketing, Account Agreements, and other
                  documents that describe the cost, and availability, or
                  features of Cards and Accounts, contained in current, approved
                  materials that have been prepared or expressly approved by
                  Joint Venture Card. Any oral representations regarding Joint
                  Venture Card shall be limited to: 1) stating the same
                  information contained in these written materials orally; 2)
                  directing Consumers to the written materials or the Joint
                  Venture Card website; and/or 3) directing Consumers to contact
                  Joint Venture Card with any unanswered questions or customer
                  service inquiries.
                </li>

                <li>
                  Merchant will not represent the program using terms such as
                  "0%," "no interest," "interest free," or similar language that
                  would indicate Promotional Offerings that Joint Venture Card
                  does not offer.
                </li>

                <li>
                  Merchant will not process applications for
                  individuals/patients that are incapacitated or under duress,
                  such as sedation, in extreme discomfort, or heavily medicated.
                </li>

                <li>
                  Merchant will not attempt to obtain Authorization on an
                  expired Card.
                </li>
              </ul>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Identity Theft, Customer Identification, and Red Flags
                </h2>
                <p className="mb-3">
                  Merchant must verify the Cardholder's identity prior to
                  submitting any credit card purchase to Joint Venture Card for
                  authorization. Acceptable forms of identity verification
                  include (provided they contain the customer's photo):
                </p>

                <ul className="list-disc ml-6 space-y-2">
                  <li>State issued driver's license (preferred)</li>
                  <li>Government issued ID</li>
                  <li>State issued ID</li>
                  <li>Passport</li>
                  <li>Military ID</li>
                  <li>Government issued Green/Resident Alien Cards</li>
                </ul>

                <p className="mt-3">
                  Merchant will not process a credit card purchase when an item
                  is to be shipped to an address other than the address on file
                  with Joint Venture Card for the Cardholder.
                </p>

                <p className="mt-3 font-medium text-gray-900">
                  If the above requirements are not met, Merchant will be
                  subject to chargeback if an account is later identified as
                  fraudulent by Joint Venture Card.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Customer, Applicant, and Cardholder Complaints
                </h2>
                <p>
                  Merchant must notify Joint Venture Card within five (5) days
                  after Merchant receives any dispute or complaint from a
                  Customer, Applicant, or Cardholder that relates in any way to
                  the marketing, origination, use, collection, or servicing of
                  an Account. Merchant must cooperate with and assist Joint
                  Venture Card in the review and investigation of all such
                  disputes or complaints. To the extent Merchant conducts its
                  own review and investigation of any such disputes or
                  complaints, Merchant must fully and promptly inform Joint
                  Venture Card of the results of Merchant's review and
                  investigation.
                </p>

                <p className="mt-3">
                  Notices to Joint Venture Card must be provided in writing and
                  sent to: Joint Venture Card, Attn: Legal Department, (notices
                  sent by regular mail); or Joint Venture Card, Attn: Legal
                  Department, (notices sent by overnight/express courier
                  service).
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Page break divider */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 3</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Page 3 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Charge Slips and Card Sales
                </h2>
                <p className="mb-3">
                  Merchant must not allow any Cardholder to use an Account to
                  make or attempt a purchase of any goods and services from
                  Merchant, other than the Goods and Services that Merchant
                  expressly identified and described in its Merchant Application
                  or another part of the Agreement. The only Card Sale that
                  Merchant may consummate, and the only Charge Slip that
                  Merchant may submit for funding, are those that are expressly
                  covered by the Authorization that Merchant obtained from the
                  Authorization Center.
                </p>

                <p className="mb-3">
                  Before Merchant may allow any Cardholder to use an Account to
                  make or attempt a purchase of any Goods and Services, Merchant
                  must: (i) verify that Cardholder's identity as described above
                  matches the consumer identity shown with the QR code; (ii)
                  scan the QR code presented by the consumer from the Joint
                  Venture Card Merchant Services software application; and (iv)
                  obtain a new and unique Authorization number for that purchase
                  from the Authorization Center. Merchant may obtain an
                  Authorization number from the Authorization Center in any
                  manner mutually acceptable to Merchant and Joint Venture Card,
                  including but not limited to the secured electronic exchange
                  of information through terminals acceptable to both Parties.
                </p>

                <p className="font-bold text-gray-900 mb-3">
                  IDENTIFICATION OF THE CARDHOLDER AND VERIFICATION OF HIS OR HER
                  IDENTITY AND AUTHORIZATION FOR THE CARD SALE IS THE
                  RESPONSIBILITY OF MERCHANT. MERCHANT MUST OBTAIN A UNIQUE QR
                  CODE OR AUTHORIZATION NUMBER FROM THE JOINT VENTURE CARD
                  MERCHANT SERVICES SOFTWARE APPLICATION FOR EACH CARD SALE.
                </p>

                <p className="mb-3">
                  If Joint Venture Card determines, in its sole discretion after
                  conducting a good faith review, that a Charge Slip and Card
                  Sale may be the subject of a future Chargeback for any reason
                  described in the Agreement, then Joint Venture Card may reject
                  and not compensate Merchant for any such Charge Slip, even if
                  Merchant previously obtained an Authorization for the Charge
                  Slip. An Authorization: (i) is not a guarantee of acceptance
                  or payment of any Charge Slip and only provides that the
                  Cardholder account has sufficient credit available to cover
                  the amount of the Purchase; (ii) is not a guarantee that a
                  Card Sale transaction will not become subject to a dispute or
                  Chargeback; and (iii) does not warrant the identity of a
                  Cardholder. An Authorization does not waive any provision of
                  the Agreement. An Authorization does not relieve Merchant of
                  liability for Chargebacks or other obligations under the
                  Agreement, or otherwise validate any fraudulent transaction or
                  a transaction that involves use of an expired or invalid Card.
                  An Authorization means only that the Account has sufficient
                  credit available, as of the date Merchant obtains the
                  Authorization, to cover the amount of the referenced Card
                  Sale.
                </p>

                <p className="mb-3">
                  If Merchant does not obtain an Authorization number for any
                  attempted Card Sale transaction, Merchant may not complete
                  that transaction as a Card Sale made with the Account.
                </p>

                <p className="mb-3">
                  Merchant shall not submit duplicate Transactions. Merchant
                  shall be debited for any duplicate Transaction and shall be
                  liable for any resulting Chargeback.
                </p>

                <p>
                  Merchant acts solely at its own risk with respect to any and
                  all non-imprint Transactions, and waives the right to dispute
                  Chargebacks arising from a failure to provide to Joint Venture
                  Card with an imprinted draft. Merchant further assumes any and
                  all other risks attendant to such non-imprint Transactions.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Payments to Merchant for Cardholder Purchases
                </h2>
                <p>
                  Only Transactions authorized and processed through the JVC
                  Merchant App will be processed for payment to the Merchant.
                  For purposes of making payments to Merchant, Joint Venture
                  Card shall initiate credit entries to the Transaction
                  Processing Account specified by the Deposit Account ACH
                  Authorization in the Merchant Agreement or any subsequent
                  Amendment to the Agreement. The amounts paid to Merchant shall
                  be adjusted as set forth in the Schedule of Fees and Charges
                  (Schedule "B"). Joint Venture Card shall use its best efforts
                  to initiate such credit entries to the Transaction Processing
                  Account on the first Banking Day after Joint Venture Card
                  receives, verifies, and processes all Card Sale information.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Page break divider */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 4</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Page 4 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Returns and Refunds
                </h2>
                <p className="mb-3">
                  If Merchant accepts the return or refund of any Goods and
                  Services covered by a Charge Slip that has been acquired from
                  Merchant under the Agreement, or allows a refund or an
                  adjustment in the price of a Card Sale evidenced by a Charge
                  Slip acquired from Merchant under the Agreement, the only
                  method by which Merchant may make or allow any such return,
                  cancellation, refund, or adjustment is through a Credit to the
                  Cardholder using the JVC Merchant App. For any Card Sale,
                  Merchant may not make a cash refund to any Cardholder or allow
                  use of any method other than a Credit Slip to complete any
                  such return, cancellation, refund, or adjustment. Merchant may
                  not accept payments from a Cardholder to prepare and present a
                  Credit Slip for purposes of effecting a deposit to the
                  Cardholder's Account.
                </p>

                <p>
                  Joint Venture Card shall not, under any circumstances, be
                  responsible or liable for processing returns, refunds, or
                  adjustments related to any transactions other than those Card
                  Sales that are processed through the JVC Merchant App pursuant
                  to the Agreement.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Chargebacks
                </h2>
                <p className="mb-3">
                  The Chargeback of a credit card sale is due from Merchant if
                  Joint Venture Card determines, in its sole discretion after
                  conducting a good faith investigation, that:
                </p>

                <ul className="list-disc ml-6 space-y-3">
                  <li>
                    Merchant has materially breached or has failed to satisfy
                    any term, condition, covenant, warranty, or other provision
                    of the Agreement, including but not limited to this Merchant
                    Operating Guide, in connection with a credit card
                    transaction;
                  </li>

                  <li>
                    A credit card transaction is fraudulent or subject to any
                    claim of illegality, cancellation, rescission, avoidance, or
                    offset for any reason whatsoever, including but not limited
                    to claims of negligence, fraud, misrepresentation, or
                    dishonesty on the part of the Customer, Merchant, or the
                    agents, employees, service providers, licensees, or
                    franchisees, or that the related transaction is not a bona
                    fide transaction in Merchant's ordinary course of business;
                    or
                  </li>

                  <li>
                    A Cardholder has denied or disputed in good faith: (a) a
                    Card Sale or other Card transaction with Merchant (including
                    any requests for credit adjustments issued by Merchant that
                    have not been posted to the Account); (b) Cardholder's
                    execution or acceptance of a credit card sale; (c) the
                    delivery, quality or performance of Goods and Services the
                    Cardholder purchased from Merchant through a credit card
                    Sale; or (d) Cardholder's authorization of a Card Sale or
                    use of the Account.
                  </li>
                </ul>

                <p className="mt-3">
                  Merchant must either: (i) resolve any dispute or other event
                  or circumstance described above to the satisfaction of Joint
                  Venture Card within ten (10) days after Merchant is notified
                  of a Chargeback; or (ii) pay Joint Venture Card the full
                  amount of each purchase, or any portion of a purchase
                  specified by Joint Venture Card, that is the subject of a
                  Chargeback, plus any applicable return fee and any other
                  related amounts due to Joint Venture Card under the Schedule
                  of Fees and Charges attached to the Agreement.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MerchantOperatingGuidePreview;
