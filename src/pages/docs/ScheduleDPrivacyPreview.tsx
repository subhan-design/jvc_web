import React from "react";
import { useMerchantData } from "@/context/MerchantDataContext";

const ScheduleDPrivacyPreview = () => {
  const { merchantData } = useMerchantData();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      {/* Page 1 */}
      <div className="bg-white border border-gray-300 shadow-lg rounded-md max-w-4xl w-full px-8 py-10">
        <h1 className="text-2xl font-bold text-center mb-2">Schedule "D"</h1>
        <h2 className="text-xl font-bold text-center mb-8">
          Information Privacy and Security Schedule
        </h2>

        <div className="text-gray-900 text-base leading-relaxed space-y-6">
          <p>
            Capitalized terms used in, but not defined by, this Schedule to the
            Agreement between Merchant and Joint Venture Card shall have the
            meanings assigned to them by the Agreement.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-4">1. Definitions.</h3>

            <div className="ml-6 space-y-4">
              <div>
                <p className="font-medium">
                  (a) "Confidential Information" means and includes:
                </p>
                <div className="ml-6 space-y-3 mt-2">
                  <p>
                    <span className="font-medium">(i)</span> The Agreement, its
                    Schedules, and any information, other than Nonpublic
                    Personal Information about a Consumer of Discloser, that
                    Recipient receives, obtains, maintains, processes or
                    otherwise is permitted to access from or about Discloser, or
                    that is derived from or associated in any way with the
                    Agreement and its Schedules, and which is generally not
                    known to the public or which has been identified as
                    confidential or proprietary by Discloser, including without
                    limitation any non-public information about marketing plans,
                    financial condition, products, processes, clients, vendors
                    and other confidential and proprietary business information
                    of Discloser ("Proprietary Information"); and
                  </p>
                  <p>
                    <span className="font-medium">(ii)</span> Any information
                    from or about a Consumer of Discloser that is received or
                    made available to Recipient in connection with the Agreement
                    and that: (i) relates to any such Consumer; (ii) relates to
                    or derives from any transaction directly between Discloser
                    and any Consumer; or (iii) is a list, description or other
                    grouping of Discloser's Consumers ("Nonpublic Personal
                    Information").
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium">(b) "Consumer" means:</p>
                <div className="ml-6 space-y-2 mt-2">
                  <p>
                    <span className="font-medium">(i)</span> any Applicant or
                    Cardholder who applies for, who obtains, or who has applied
                    for or obtained a financial product or service from or
                    through Joint Venture Card and/, which is to be used
                    primarily for the personal, family, or household purposes of
                    any such Applicant or Cardholder; and
                  </p>
                  <p>
                    <span className="font-medium">(ii)</span> any Customer of
                    Merchant who requests or obtains any Goods and Services from
                    or through Merchant that it must keep private to comply with
                    Applicable Law or to comply with a disclosed Merchant policy
                    or agreement with such Customer.
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium">(c) "Discloser" means</p>
                <p className="ml-6 mt-1">
                  either Merchant or Joint Venture Card, when any such entity
                  discloses or makes available its own Confidential Information
                  to the other Party or their respective Affiliates in the
                  capacity of a Recipient.
                </p>
              </div>

              <div>
                <p className="font-medium">(d) "Recipient" means</p>
                <p className="ml-6 mt-1">
                  either Merchant, Joint Venture Card (for itself and on behalf
                  of the Authorized Financial Institution), or their respective
                  Affiliates, when any such entity receives or is given access
                  to the Confidential Information of the other Party, the
                  Authorized Financial Institution, or their respective
                  Affiliates in the capacity of a Discloser.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              2. Rights, Title, and Interest in Nonpublic Personal Information
              about Consumers.
            </h3>

            <div className="ml-6 space-y-4">
              <p>
                <span className="font-medium">(a)</span> The Parties understand
                and agree that an individual can, at the same time, be a
                Consumer of each Party.
              </p>

              <p>
                <span className="font-medium">(b)</span> If Joint Venture Card
                receives Nonpublic Personal Information from Merchant about a
                Consumer who is not an Applicant or Cardholder, then Joint
                Venture Card shall consider such Nonpublic Personal Information
                to be exclusively owned and provided by Merchant in its capacity
                as Discloser. Any Nonpublic Personal Information of a Consumer
                who does not become an Applicant or Cardholder shall, if
                received or kept by Joint Venture Card, be treated as Nonpublic
                Personal Information of Merchant in its capacity as Discloser,
                which is subject to the restrictions on use and disclosure below
                that apply to Joint Venture Card in its capacity as a Recipient
                of such Nonpublic Personal Information.
              </p>

              <p>
                <span className="font-medium">(c)</span> For any Consumer of
                Merchant who becomes an Applicant or Cardholder, Merchant
                understands that Joint Venture Card must use, disclose and keep
                Nonpublic Personal Information about such Consumers to provide
                the Program, review Applications, and permit the use and
                servicing of Accounts and Cards. Merchant understands and agrees
                that any Nonpublic Personal Information about an Applicant or
                Cardholder that Joint Venture Card and/ may receive for purposes
                of providing the Program, or in connection with Applications,
                Charge Slips, Card Sales, Credit Slips, or otherwise as a result
                of the use or servicing of Cards and Accounts, shall be deemed
                Nonpublic Personal Information about a Consumer of Joint Venture
                Card when any such Nonpublic Personal Information is received or
                prepared by Joint Venture Card, and regardless of its source.
                Any Nonpublic Personal Information of an Applicant or Cardholder
                who becomes a Consumer of Joint Venture Card shall, if received
                or kept by Merchant for reasons related to the Program and the
                use, origination or servicing of Accounts, be treated as
                Nonpublic Personal Information of Joint Venture Card in the
                capacity of Discloser, which is subject to the restrictions on
                use below that apply to Merchant in its capacity as a Recipient
                of such Nonpublic Personal Information. Joint Venture Card
                agrees to use and disclose Nonpublic Personal Information of any
                such Applicants and Cardholders only as described to Consumers
                in any applicable privacy notice, and as otherwise required or
                permitted by Applicable Law.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              3. Use and Confidentiality of Confidential Information.
            </h3>

            <p className="ml-6">
              Recipient agrees that it shall use Discloser's Confidential
              Information solely for performing Recipient's obligations under
              the Agreement, including any applicable Schedule to the Agreement.
              Recipient agrees that it shall not sell, rent, lease or otherwise
              directly or indirectly disclose Discloser's Confidential
              Information to any third party, except as expressly authorized by
              the Agreement, any applicable Schedule to the Agreement, or as
              otherwise expressly authorized in advance and in writing by
              Discloser. Recipient agrees that it shall take all reasonable
              steps to protect the confidentiality of Discloser's Confidential
              Information, using the same standard of care that Recipient uses
              to protect its own Confidential Information, and not less than any
              standard of care required by Applicable Law and that is considered
              commercially reasonable under the circumstances. Recipient agrees
              that it shall give access to Discloser's Confidential Information
              only to those employees, officers or agents of Recipient who have
              a need to know in connection with the performance of Recipient's
              obligations under the Agreement or any applicable Schedule to the
              Agreement. Recipient agrees that it shall not copy or duplicate
              Discloser's Confidential Information, except as necessary to
              fulfill Recipient's obligations under the Agreement, any
              applicable Schedule to the Agreement, or as expressly required by
              Applicable Law. Recipient agrees that it shall comply with all
              Applicable Laws related to privacy and information security that
              apply to Discloser's Confidential Information and the respective
              businesses of Recipient and Discloser. Recipient agrees that it
              shall not monitor or edit Discloser's Confidential Information,
              unless Recipient is expressly authorized to do so by the Agreement
              or any applicable Schedule to the Agreement, or unless Recipient
              determines in good faith that it is required to do so by
              Applicable Law. If Recipient is expressly permitted under the
              terms of this Schedule or any part of the Agreement to disclose
              Discloser's Confidential Information to a third party, then
              Recipient shall ensure that any such third party is subject to
              binding confidentiality obligations with respect to such
              Confidential Information that are at least as restrictive as those
              contained in this Schedule.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle page break divider */}
      <div className="w-full max-w-4xl flex items-center my-4">
        <div className="flex-grow border-t border-gray-200" />
        <span className="mx-2 text-gray-400 text-xs">Page 2</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      {/* Page 2 */}
      <div className="bg-white border border-gray-300 shadow-lg rounded-md max-w-4xl w-full px-8 py-10">
        <div className="text-gray-900 text-base leading-relaxed space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              4. Exclusions and Exceptions.
            </h3>

            <p className="ml-6 mb-4">
              The confidentiality obligations in this Schedule do not apply to
              Proprietary Information that:
            </p>

            <div className="ml-6 space-y-3">
              <p>
                <span className="font-medium">(a)</span> is a part of the public
                domain when disclosed to Recipient, or that subsequently becomes
                a part of the public domain through no act or omission of
                Recipient;
              </p>
              <p>
                <span className="font-medium">(b)</span> was in Recipient's
                lawful possession without an accompanying secrecy obligation
                prior to disclosure by Discloser, as documented in Recipient's
                written records;
              </p>
              <p>
                <span className="font-medium">(c)</span> is lawfully disclosed
                to Recipient by a third party without an accompanying secrecy
                obligation or breach of any duty or agreement by which such
                third party is bound; or
              </p>
              <p>
                <span className="font-medium">(d)</span> is independently
                developed by Recipient for purposes and uses that are unrelated
                to the Agreement and its Schedules, with written verifiable
                proof thereof provided to Discloser upon its request.
              </p>
            </div>

            <p className="ml-6 mt-4">
              This Schedule shall not be deemed to prohibit disclosures:
            </p>

            <div className="ml-6 space-y-3">
              <p>
                <span className="font-medium">(i)</span> required by Applicable
                Law, provided that prior notice of any such disclosure not
                prohibited by Applicable Law has been given to Discloser, in a
                time and manner that would permit Discloser to take legal action
                at its own costs and expenses to prevent the disclosure or seek
                an appropriate protective order;
              </p>
              <p>
                <span className="font-medium">(ii)</span> required to protect
                and defend Recipient's rights or property or protect under
                exigent circumstances the personal safety of the public or
                Recipient's clients or customers;
              </p>
              <p>
                <span className="font-medium">(iii)</span> as required in the
                course of an examination by a governmental authority with
                supervisory or enforcement jurisdiction over Recipient; or
              </p>
              <p>
                <span className="font-medium">(iv)</span> to Recipient's
                professional auditors and counsel, provided that such advisors
                are obligated to maintain the confidentiality of the information
                they receive.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              5. Confidentiality of the Agreement.
            </h3>

            <p className="ml-6 mb-4">
              The terms and conditions of the Agreement shall be treated as
              Confidential Information. A Party may not refer to or disclose the
              terms and conditions of the Agreement or activities pertaining to
              the Agreement in any form without the prior written consent of the
              other Party, except as expressly authorized by this Schedule or
              the Agreement. The general existence of this Agreement shall not
              be treated as Confidential Information. Either Party may disclose
              the terms and conditions of this Agreement:
            </p>

            <div className="ml-6 space-y-3">
              <p>
                <span className="font-medium">(i)</span> as required by any
                court or other governmental authority;
              </p>
              <p>
                <span className="font-medium">(ii)</span> as otherwise required
                by Applicable Law, including a party's obligations under
                applicable securities laws;
              </p>
              <p>
                <span className="font-medium">(iii)</span> to legal counsel of a
                Party;
              </p>
              <p>
                <span className="font-medium">(iv)</span> in confidence to
                accountants, proposed investors, and financing sources and their
                advisors;
              </p>
              <p>
                <span className="font-medium">(v)</span> to enforce the
                Agreement or rights under the Agreement; or
              </p>
              <p>
                <span className="font-medium">(vi)</span> in confidence in
                connection with a merger or acquisition or proposed merger or
                acquisition, or the like.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              6. Retransmission, Return, and Destruction of Discloser's
              Confidential Information.
            </h3>

            <p className="ml-6">
              If Recipient is permitted to retransmit any Confidential
              Information of Discloser under the terms of the Agreement or any
              applicable Schedule, Recipient's mode of retransmission must be at
              least as secure as the mode by which Discloser transmitted such
              Confidential Information to Recipient. Upon Discloser's request,
              Recipient shall promptly return Discloser's Confidential
              Information to Discloser in the same format as provided by
              Discloser or destroy Discloser's Confidential Information, except
              to the limited extent that Recipient is required to maintain
              copies of Discloser's Confidential Information for legal,
              regulatory, or accounting reasons. Any copies of Discloser's
              Confidential Information that Recipient maintains for legal,
              regulatory, or accounting reasons shall remain subject to the
              duties of confidentiality, privacy, and security set forth in this
              Schedule. Nothing in this Schedule or the Agreement shall be
              construed to grant Recipient any rights, title or interest in or
              to any of Discloser's Confidential Information, except as
              otherwise provided by the express terms of any applicable Schedule
              to the Agreement.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              7. Information Security and Disposal Standards.
            </h3>

            <p className="ml-6 mb-4">
              Recipient agrees to implement and maintain a comprehensive written
              information security program that complies with all applicable
              laws and includes appropriate administrative, technical and
              physical safeguards to:
            </p>

            <div className="ml-6 space-y-3">
              <p>
                <span className="font-medium">(a)</span> ensure the safety and
                confidentiality of Discloser's Confidential Information;
              </p>
              <p>
                <span className="font-medium">(b)</span> protect against
                unauthorized access to and use of Discloser's Confidential
                Information;
              </p>
              <p>
                <span className="font-medium">(c)</span> protect against
                anticipated threats or hazards to the security or integrity of
                Discloser's Confidential Information; and
              </p>
              <p>
                <span className="font-medium">(d)</span> properly dispose of
                Discloser's Confidential Information.
              </p>
            </div>

            <p className="ml-6 mt-4">
              Recipient agrees that such measures shall comply with and meet the
              objectives of all applicable laws, including without limitation
              the federal Gramm-Leach-Bliley Act, the administrative rules and
              regulations implementing the Gramm-Leach-Bliley Act (including but
              not limited to 16 C.F.R. Part 314), and the Interagency Guidelines
              Establishing Information Security Standards. Recipient shall
              implement a written security and disaster recovery plan consistent
              with the standards and practices of the respective industries of
              Recipient and Discloser, and all applicable laws. Recipient
              further agrees to cooperate the monitoring by Discloser of
              Recipient's compliance with the foregoing obligations as
              reasonably requested by Discloser from time to time, including,
              without limitation, by providing Discloser with an opportunity to
              review and obtain copies of relevant audits, test results, reports
              and similar materials that Recipient might prepare or have
              prepared for it from time to time.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle page break divider for Page 3 */}
      <div className="w-full max-w-4xl flex items-center my-4">
        <div className="flex-grow border-t border-gray-200" />
        <span className="mx-2 text-gray-400 text-xs">Page 3</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      {/* Page 3 */}
      <div className="bg-white border border-gray-300 shadow-lg rounded-md max-w-4xl w-full px-8 py-10">
        <div className="text-gray-900 text-base leading-relaxed space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              8. Notification of Security Breach.
            </h3>

            <p className="ml-6">
              Recipient agrees to comply with all Applicable Laws and take
              appropriate actions to address incidents of unauthorized access to
              Discloser's Confidential Information, including by notifying
              Discloser as soon as possible of any unauthorized access to or
              disclosure of Discloser's Confidential Information, any breach of
              this Schedule, or any breach or attempted breach of Recipient's
              security related to areas, locations or computer systems that
              contain any Confidential Information of Discloser (including
              without limitation any instance of theft, unauthorized access by
              fraud, deception or other malfeasance or inadvertent access). In
              the event of any such breach of this Schedule, unauthorized
              access, disclosure or breach or attempted breach of security,
              Recipient shall further provide to Discloser, in writing, such
              details concerning the incident in question as Discloser may
              request. Recipient shall obtain Discloser's express written
              approval for the form, content and timing of any communication
              that Discloser may allow Recipient to provide Consumers about any
              breach or potential breach of information security related to any
              such Consumers. In the event of any known breach or suspected
              potential breach of security related to a Consumer, Recipient
              shall:
            </p>

            <div className="ml-6 space-y-3 mt-4">
              <p>
                <span className="font-medium">(a)</span> conduct an
                investigation of the security breach and collect and preserve
                all data and evidence concerning the security breach;
              </p>
              <p>
                <span className="font-medium">(b)</span> take all steps
                appropriate and necessary to contain, prevent and mitigate any
                further security breach;
              </p>
              <p>
                <span className="font-medium">(c)</span> provide immediate
                notice to Discloser of any such known or suspected security
                breach, which shall not be later than twenty-four (24) hours
                after Discloser learns about or discovers any breach or
                potential breach of information security;
              </p>
              <p>
                <span className="font-medium">(d)</span> provide Discloser with
                a written report concerning any such known or suspected security
                breach within three (3) Business Days;
              </p>
              <p>
                <span className="font-medium">(e)</span> document and detail the
                remedial action taken by Recipient, and planned to be taken by
                Recipient, to remediate any such known or suspected breach of
                information security;
              </p>
              <p>
                <span className="font-medium">(f)</span> permit a post-breach
                security assessment or audit to be performed by Discloser, upon
                its request; and
              </p>
              <p>
                <span className="font-medium">(g)</span> allow Discloser to
                perform its own on-site forensic examination of any such known
                or suspected security breach, upon Discloser's request.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              9. Remedies; Indemnification.
            </h3>

            <p className="ml-6">
              Recipient agrees that breach of this Schedule shall give rise to
              irreparable injury to Discloser that is inadequately compensable
              in damages. Recipient agrees that Discloser is authorized to seek
              injunctive relief against the breach or threatened breach by
              Recipient of this Schedule, in addition to such legal remedies as
              may be available to Discloser, including the recovery of damages.
              Recipient also agrees to indemnify, defend, and hold Discloser
              harmless from and against any and all claims, demands,
              liabilities, actions, disputes, controversies, losses, damages,
              and expenses, including but not limited to reasonable attorney
              fees and costs, asserted by any person or entity other than
              Discloser that may result from or are related to any breach by the
              Recipient of any duty or obligation assigned to it by this
              Schedule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDPrivacyPreview;
