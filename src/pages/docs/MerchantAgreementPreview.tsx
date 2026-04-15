// import React from "react";
// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// const MerchantAgreementPreview = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Document Content - Page 1 */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="text-center mb-8">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                 JVC Merchant Agreement
//               </h2>
//             </div>

//             <Separator className="my-6" />

//             <div className="space-y-6 text-sm leading-relaxed">
//               <p>
//                 This JVC Merchant Agreement ("Agreement"), after execution by
//                 the Parties, shall be effective as of the Effective Date shown
//                 below. This Agreement is by and between: (i) the entity
//                 identified below as the Merchant ("Merchant"); and (ii) Joint
//                 Venture Card of [State], LLC. doing business as "JVC" and
//                 "Joint Venture Card". Any reference to a "Party" shall mean
//                 either Merchant or Joint Venture Card, individually. Any
//                 reference to the "Parties" shall mean both Merchant and Joint
//                 Venture Card, collectively. The "Agreement" means and includes
//                 the following, all of which are incorporated in full by this
//                 reference:
//               </p>

//               <ul className="list-disc ml-6 space-y-2">
//                 <li>
//                   the following Terms of Service, including the Glossary of
//                   Terms in Exhibit "A" to the Terms of Service;
//                 </li>
//                 <li>the Designation of Notice Address in Schedule "A";</li>
//                 <li>the Schedule of Fees and Charges in Schedule "B";</li>
//                 <li>
//                   the Deposit Account ACH Authorization in Schedule "C";
//                 </li>
//                 <li>
//                   the Information Privacy and Security Schedule in Schedule "D";
//                 </li>
//                 <li>the Rewards Program Terms in Schedule "E"; and</li>
//                 <li>the Merchant Operating Guide.</li>
//               </ul>

//               <p>
//                 Merchant acknowledges that it received and has agreed to be
//                 bound by all of the documents above, including the referenced
//                 Merchant Operating Guide, as part of its Agreement with Joint
//                 Venture Card. The "Agreement" also means and includes any
//                 amendments and additions that may be made from time to time to
//                 any part of the Agreement, and any Schedules, exhibits, and
//                 addenda, when such amendments and additions are made in
//                 accordance with the terms of the Agreement.
//               </p>

//               <p>
//                 The person signing on behalf of Merchant below represents and
//                 warrants that he or she is duly authorized by Merchant for
//                 purposes of binding Merchant to this Agreement. In consideration
//                 of the mutual promises and agreements set forth in the Agreement
//                 and for other good and valuable consideration, the receipt and
//                 sufficiency of which is hereby acknowledged, the Parties have
//                 entered into the Agreement and have agreed to be bound by its
//                 terms and conditions, as may be amended from time to time.
//               </p>

//               <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
//                 Terms of Service
//               </h3>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 1. Definitions
//               </h4>
//               <p>
//                 Capitalized terms used in the Agreement that are not defined
//                 above are generally defined by the Glossary of Terms in Exhibit
//                 "A" to the Terms of Service or in the context of their first use
//                 in the Agreement. Any reference to a "Section" of any part of
//                 the Agreement includes all sub-sections in the referenced
//                 section, except when only a particular sub-section is specified.
//                 The word "day" means a calendar day, unless the Agreement uses a
//                 defined term, such as Business Day, or specifically states
//                 otherwise.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 2. Scope and Purpose of Agreement
//               </h4>
//               <p>
//                 Merchant understands that Joint Venture Card provides Accounts
//                 and issues Cards for the Program. Merchant has requested that
//                 Joint Venture Card make Program financing and features available
//                 to Customers who want to purchase goods and services from
//                 Merchant, if those Customers request and qualify for an Account
//                 based on the Program criteria, including the credit criteria
//                 established from time to time by Joint Venture Card. Merchant
//                 shall not assume Account credit and default risks on behalf of
//                 any Cardholder, but Merchant shall remain subject to all terms,
//                 conditions, representations, warranties, covenants, and duties
//                 that apply to Merchant pursuant to the Agreement, including the
//                 Merchant Operating Guide. Joint Venture Card has agreed to make
//                 the Program available to Merchant and its qualifying Customers,
//                 subject to the terms and conditions of the Agreement.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 3. Program Marketing and Account Forms
//               </h4>
//               <p>
//                 During the term of the Agreement, Joint Venture Card will make
//                 available to Merchant the Joint Venture Card Merchant App and
//                 Program marketing, and other Account and Program documents
//                 expressly approved for use by Joint Venture Card. Merchant
//                 understands and agrees that Joint Venture Card may change the
//                 app and marketing from time to time at their sole discretion and
//                 expense, after giving reasonable advance notice of the change to
//                 Merchant. During the term of the Agreement, Merchant may not
//                 display or use any form of Applications, Charge Slips, Credit
//                 Slips, Program marketing, Account Agreements, or any other
//                 documents that describe the cost, availability, or features of
//                 Cards and Accounts, other than the then-current versions that
//                 have been prepared or expressly approved by Joint Venture Card.
//                 Merchant must not display or use any Program, Application and
//                 Account forms after the termination of the Agreement.
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 2</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Page 2 */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed">
//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 4. Applications, Account Origination, and Account Use
//               </h4>
//               <p>
//                 The only credit applications that Joint Venture Card will accept
//                 from Merchant are the Applications submitted using forms and
//                 channels approved for use in connection with the Program, which
//                 allow Applicants to request the open-end, consumer-purpose
//                 Accounts available through the Program. Merchant must comply
//                 with all provisions in the Merchant Operating Guide that relate
//                 to the acceptance, submission and transmission of Applications,
//                 Charge Slips, Credit Slips, and other Program documents and
//                 information. Merchant may not participate in any way in the
//                 credit decisions made with respect to any Application or
//                 Account. Nothing in this Agreement requires that Joint Venture
//                 Card take any particular action at Merchant's request with
//                 respect to approving any Application, authorizing use of any
//                 Account, making Account credit available to any Cardholder, or
//                 servicing and collecting amounts due in connection with the
//                 Accounts.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 5. Rights, Title, and Ownership of Accounts
//               </h4>
//               <p>
//                 Joint Venture Card shall establish and initially own the
//                 Accounts and the associated Account credit risks, and any
//                 Account Confidential Information, subject to its right to retain
//                 service providers and transfer any part of its ownership,
//                 rights, and title in such Accounts to others. Merchant
//                 understands and agrees that it shall not hold any ownership,
//                 rights, title, or interest in the Accounts, or any Customer
//                 receivable evidenced by a Charge Slip acquired from Merchant
//                 pursuant to the Agreement, except to the extent Merchant
//                 acquires such rights in a Customer receivable back after
//                 processing of a Chargeback in accordance with the Agreement.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 6. Promotional Terms, Additional Services, Program Enhancements
//               </h4>
//               <p>
//                 From time to time, the Parties may agree on certain Promotional
//                 Offerings intended to promote the use and availability of
//                 Accounts and related Program services and enhancements to
//                 Customers, Applicants, and Cardholders. Schedule "X" to the
//                 Agreement describes the Promotional Offerings that the Parties
//                 have agreed to make available as of the Effective Date,
//                 including any compensation that may be due from Merchant or
//                 unique terms that Joint Venture Card may require as a condition
//                 of providing certain Promotional Offerings.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 7. Chargebacks
//               </h4>
//               <p>
//                 Contemporaneously with each Cardholder Purchase, a contingent
//                 and un-matured claim for Chargeback accrues against Merchant and
//                 in favor of Joint Venture Card to the extent Joint Venture Card
//                 is required, or exercises its right, to pay any fees, discounts,
//                 customer credits and adjustments, charges, fines, assessments,
//                 penalties or other items, as more fully described and
//                 incorporated herein by the Merchant Operating Guide which may in
//                 turn be charged back to Merchant or Joint Venture Card. Merchant
//                 agrees that it is fully liable to Joint Venture Card. Merchant
//                 agrees to accept for Chargeback, and agrees to be liable to
//                 Joint Venture Card, for any such Chargeback. The Merchant
//                 Operating Guide describes the time and manner in which Merchant
//                 must respond to any Chargeback notice it receives from Joint
//                 Venture Card.
//               </p>

//               <p>
//                 For payment of any Chargeback, Merchant agrees that Joint
//                 Venture Card is authorized to offset from incoming transactions
//                 and to debit via transfer or to debit Merchant's Transaction
//                 Processing Account for any such amount. Merchant understands and
//                 agrees that Joint Venture Card may terminate the Agreement,
//                 require establishment of a Reserve Account, or pursue other
//                 rights and remedies in the time and manner authorized by the
//                 Agreement or Applicable Law, in the event of Excessive
//                 Chargebacks.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 8. Rewards Program
//               </h4>
//               <p>
//                 Merchant understands and agrees to participate in and support
//                 the Cardholder Rewards Program, as further specified in Schedule
//                 E.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 9. Merchant Representations and Warranties
//               </h4>
//               <p>
//                 Merchant represents and warrants to Joint Venture Card, as of
//                 the Effective Date of the Agreement and throughout its term, the
//                 following:
//               </p>

//               <ul className="list-disc ml-6 space-y-2">
//                 <li>
//                   That each Application that any Applicant makes through
//                   Merchant shall be valid, authorized and made by the persons
//                   identified as Applicants by any such Application;
//                 </li>
//                 <li>
//                   That each Card Sale, Charge Slip, and each use of a Card and
//                   Account, shall arise only from a bona fide sale of Goods and
//                   Services by Merchant to a Cardholder in only the amount
//                   authorized by the Cardholder;
//                 </li>
//                 <li>
//                   That each Card Sale shall be made to a Cardholder only for his
//                   or her personal, family or household purposes, and not any
//                   business or commercial purposes;
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 3</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Page 3 */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed">
//               <ul className="list-disc ml-6 space-y-2">
//                 <li>
//                   That Merchant shall obtain an Authorization number from the
//                   Authorization before submitting any Charge Slip or attempting
//                   to complete any Card Sale. If Authorization is denied,
//                   Merchant shall not complete the Transaction;
//                 </li>
//                 <li>
//                   That each Charge Slip, Credit Slip, and other Card Sale and
//                   Account documents shall be prepared and submitted to Joint
//                   Venture Card in the time and manner required by the Agreement,
//                   including the Merchant Operating Guide;
//                 </li>
//                 <li>
//                   That all information provided in or with the Merchant
//                   Application is true, correct, and complete, and properly
//                   reflects the business, financial condition, and ownership of
//                   Merchant;
//                 </li>
//                 <li>
//                   That all information provided by Merchant or its designees
//                   before and after the Effective Date about Merchant's business,
//                   financial condition, and ownership, is true, correct, and
//                   complete as of the date provided; and
//                 </li>
//                 <li>
//                   That Merchant has and shall maintain all required licenses,
//                   registrations, bonds, and insurances needed to conduct its
//                   business and perform its obligations under this Agreement.
//                 </li>
//               </ul>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 10. Merchant Covenants
//               </h4>
//               <p>Merchant agrees:</p>

//               <ul className="list-disc ml-6 space-y-2">
//                 <li>
//                   That Merchant shall comply with all duties and requirements
//                   established by the Agreement, including but not limited to
//                   those established by the Merchant Operating Guide;
//                 </li>
//                 <li>
//                   Joint Venture Card may provide each other, their respective
//                   Affiliates, creditors, financial services providers and
//                   potential investors, with information about the Program,
//                   subject to the limitations and restrictions in the Information
//                   Privacy and Security Schedule attached as Schedule "D" to the
//                   Agreement;
//                 </li>
//                 <li>
//                   Merchant shall honor and accept all valid Cards and Accounts
//                   without discrimination, when properly presented by Cardholders
//                   to pay for Merchant's Goods and Services;
//                 </li>
//                 <li>
//                   Merchant shall not establish any minimum or maximum Credit
//                   card sale amount, unless Merchant has obtained prior written
//                   approval to do so from Joint Venture Card;
//                 </li>
//                 <li>
//                   Merchant shall not require that any Cardholder compensate
//                   Merchant in any manner for any part of the fees, charges,
//                   discounts, expenses, or other amounts assessed to Merchant by
//                   Joint Venture Card associated with the authorization of any
//                   Credit Card Sale, whether through an increase in the cash
//                   price of Goods and Services, a surcharge, convenience fee, or
//                   other additional or different fee or charge, except as
//                   expressly permitted by this Agreement and pursuant to
//                   applicable state law;
//                 </li>
//                 <li>
//                   That Merchant shall not make any oral or written statement to
//                   any Applicant or prospective Applicant that would discourage a
//                   reasonable person from making or pursuing an Application on
//                   the basis of race, color, religion, national origin, sex,
//                   marital status, or age (provided the person has the capacity
//                   to enter into a binding contract), or any other basis
//                   prohibited by Applicable Law;
//                 </li>
//                 <li>
//                   That Merchant shall prominently display in any retail location
//                   area where credit inquiries may occur, Program marketing
//                   materials and all related documents prepared or expressly
//                   approved for use from time to time by Joint Venture Card, for
//                   purposes of marketing the Program and describing the
//                   availability, use, and terms of the Cards and Accounts;
//                 </li>
//                 <li>
//                   That Merchant shall not change the type of business in which
//                   it engages, the types of products and services it provides,
//                   the locations from which it conducts business, or the manner
//                   in which it provides and sells such products and services,
//                   from those Merchant described in its Merchant Application and
//                   Schedule "A" (Designation of Notice Address), unless Merchant
//                   provides thirty (30) days advance notice of any such change to
//                   Joint Venture Card and obtains its express written approval
//                   for any such change; and
//                 </li>
//                 <li>
//                   That Merchant shall comply with all Applicable Laws that
//                   affect the manner in which Merchant conducts its business,
//                   promotes and provides its Goods and Services, and interacts
//                   with Customers, Applicants, and Cardholders.
//                 </li>
//               </ul>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 11. Joint Venture Card Representations and Warranties
//               </h4>
//               <p>
//                 Joint Venture Card represents and warrants to Merchant, as of
//                 the Effective Date of the Agreement and throughout its term, the
//                 following:
//               </p>

//               <ul className="list-disc ml-6 space-y-2">
//                 <li>
//                   That Applications shall be provided and made available to the
//                   public by Joint Venture Card without regard to any person's
//                   race, color, religion, national origin, sex, marital status,
//                   or age (provided the person has the capacity to enter into a
//                   binding contract), or any other basis prohibited by Applicable
//                   Law;
//                 </li>
//                 <li>
//                   That Joint Venture Card shall not make any oral or written
//                   statement to Applicants or prospective Applicants that would
//                   discourage a reasonable person from making or pursuing an
//                   Application, on the basis of race, color, religion, national
//                   origin, sex, marital status, or age, or any other basis
//                   prohibited by Applicable Law;
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 4</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Page 4 */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed">
//               <ul className="list-disc ml-6 space-y-2">
//                 <li>
//                   That Joint Venture Card have and shall retain all required
//                   licenses, registrations, bonds, and insurances needed to
//                   perform their obligations under this Agreement; and
//                 </li>
//                 <li>
//                   That Joint Venture Card shall comply with all Applicable Laws
//                   that affect the manner in which Joint Venture Card conducts
//                   its business, provides Account services, and interacts with
//                   Customers, Applicants, and Cardholders.
//                 </li>
//               </ul>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 12. Mutual Representations and Warranties
//               </h4>
//               <p>
//                 Each Party represents and warrants to the other Party, as of the
//                 Effective Date of the Agreement and throughout its term, the
//                 following:
//               </p>

//               <ul className="list-disc ml-6 space-y-2">
//                 <li>
//                   That such Party has full corporate power and authority to
//                   enter into the Agreement, on its own behalf and on behalf of
//                   any identified Affiliate;
//                 </li>
//                 <li>
//                   That such Party has taken all corporate action required by any
//                   organizational documents to make this Agreement binding and
//                   valid against the Party and any identified Affiliate according
//                   to its terms;
//                 </li>
//                 <li>
//                   That this Agreement is and shall be binding, valid, and
//                   enforceable against such Party and any identified Affiliate
//                   according to its terms;
//                 </li>
//                 <li>
//                   That the execution, delivery, and performance of the
//                   Agreement, and the consummation of the transactions
//                   contemplated by the Agreement, shall not constitute a
//                   violation of Applicable Law or a violation or default by such
//                   Party under its organizational documents or any debt
//                   instruments or other material agreement;
//                 </li>
//                 <li>
//                   That no authorization of any governmental authority is
//                   required in connection with the performance by such Party of
//                   its obligations under the Agreement; and
//                 </li>
//                 <li>
//                   That there are no proceedings or investigations pending, or to
//                   such Party's knowledge threatened, before any court,
//                   regulatory body, or other tribunal asserting the invalidity of
//                   this Agreement or seeking to prevent consummation of the
//                   transactions contemplated by the Agreement.
//                 </li>
//               </ul>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 13. Transaction Processing
//               </h4>

//               <p>
//                 <strong>Transaction Processing Account.</strong> Merchant shall
//                 establish and maintain a Transaction Processing Account with a
//                 depository institution authorized to participate in an automated
//                 clearing house ("ACH") and otherwise acceptable to Joint Venture
//                 Card. Merchant shall maintain sufficient funds in its
//                 Transaction Processing Account at all times to accommodate all
//                 Chargebacks, returns, refunds, adjustments, fees, and other
//                 payments and amounts that may be due from Merchant under the
//                 Agreement. Merchant shall regularly and promptly review all
//                 statements of account related to the Transaction Processing
//                 Account. Merchant agrees to immediately notify Joint Venture
//                 Card of any discrepancy between Merchant's records and those
//                 provided by Joint Venture Card or with respect to any transfer
//                 that Merchant believes was not authorized by Merchant or
//                 customer.
//               </p>

//               <p>
//                 <strong>
//                   Payments To Acquire Charge Slips From Merchant; Provisional
//                   Credit.
//                 </strong>{" "}
//                 Any payment that Joint Venture Card makes to acquire a Charge
//                 Slip from Merchant shall be provisional and not a final payment,
//                 until Joint Venture Card determines that Merchant has complied
//                 with the terms and conditions in the Agreement and that Merchant
//                 is not in violation of any representation, warranty, or covenant
//                 it made in the Agreement. Merchant acknowledges that all credits
//                 for funds provided to it are provisional and subject to reversal
//                 if Joint Venture Card does not receive payment of corresponding
//                 settlement amounts from the Authorized Financial Institution.
//               </p>

//               <p>
//                 <strong>
//                   Collection of Amounts Due From Merchant; Chargebacks.
//                 </strong>{" "}
//                 Merchant authorizes Joint Venture Card, at its sole discretion,
//                 to use either: (i) a "direct debit" payment method to be
//                 compensated for any amounts that Joint Venture Card determines
//                 is owed by Merchant under the Agreement, based on Merchant's
//                 authorization for Joint Venture Card to initiate debit entries
//                 to Merchant's Transaction Processing Account or any Reserve
//                 Account that may be established; or (ii) a "net" payment method
//                 to be compensated for any amounts that Joint Venture Card
//                 determines is owed by Merchant under the Agreement, by deducting
//                 such amounts from any amounts that may otherwise be owed to
//                 Merchant under the Agreement for Charge Slips or otherwise.
//               </p>

//               <p>
//                 <strong>Endorsement.</strong> The processing of Purchases from
//                 Cardholders is Merchant's agreement to sell and assign its
//                 right, title, and interest in each Purchase completed in
//                 conformity with Joint Venture Card's acceptance procedures, and
//                 shall constitute an endorsement by Merchant to Joint Venture
//                 Card of such Purchases.
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 5</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Page 5 */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed">
//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 14. Change in Ownership; Assignments
//               </h4>
//               <p>
//                 This Agreement may not be assigned or transferred by Merchant,
//                 directly or by operation of law, except with the prior express
//                 written consent of Joint Venture Card. If, despite this
//                 prohibition, Merchant assigns this Agreement without the express
//                 consent of Joint Venture Card, then: (a) the Agreement shall be
//                 binding on any such assignee of Merchant; and (b) Merchant and
//                 any guarantors of Merchant shall remain liable for any
//                 nonperformance by any such assignee of Merchant. Merchant must
//                 send Joint Venture Card at least thirty (30) days prior written
//                 notice of any change in the name(s) and location(s) of Merchant
//                 and any identified Merchant Affiliate, any material change in
//                 ownership of Merchant's business, or any change in Charge Slip
//                 information concerning Merchant.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 15. Indemnification
//               </h4>

//               <p>
//                 <strong>Indemnification by Merchant.</strong> Merchant shall be
//                 liable to and shall indemnify and hold harmless Joint Venture
//                 Card, the Authorized Financial Institution, their respective
//                 Affiliates associated with the Program, and their respective
//                 officers, employees, agents and directors from any losses,
//                 damages, claims or complaints incurred arising out of: (i)
//                 Merchant's failure to comply with this Agreement, including the
//                 Merchant Operating Guide and any Schedule to the Agreement; (ii)
//                 any claim, dispute, complaint or setoff made by a Cardholder in
//                 good faith with respect to anything done or not done by Merchant
//                 in connection with Card Sales or Credit Slips that constitutes a
//                 violation of a duty or promise by Merchant; (iii) anything done
//                 or not done by Merchant in connection with the furnishing of any
//                 Goods and Services purchased by Cardholders that constitutes a
//                 violation of a duty or promise by Merchant; (iv) the death or
//                 injury to any person or the loss, destruction or damage to any
//                 property arising out of the design, manufacture or furnishing by
//                 Merchant of any Goods and Services purchased by Cardholders; (v)
//                 any claim or complaint of a third party in connection with
//                 Merchant's advertisements and promotions relating to the Card
//                 which have not been reviewed or approved by Joint Venture Card;
//                 (vi) any illegal or improper conduct of Merchant or its
//                 employees or agents; and (vii) any claim or complaint by a
//                 consumer that Merchant has violated any Applicable Law,
//                 including but not limited to the Equal Credit Opportunity Act
//                 and the Truth in Lending Act.
//               </p>

//               <p>
//                 <strong>Indemnification by Joint Venture Card.</strong> Joint
//                 Venture Card shall be liable to and shall indemnify and hold
//                 harmless Merchant and its identified Affiliates and their
//                 respective officers, employees, agents and directors from any
//                 losses, damages, claims or complaints incurred arising out of:
//                 (i) Joint Venture Card's failure to comply with this Agreement;
//                 (ii) any claim, dispute or complaint by a Cardholder made in
//                 good faith resulting from anything done or not done by Joint
//                 Venture Card in connection with such Cardholder's Account; (iii)
//                 any illegal or improper conduct of Joint Venture Card, its
//                 Affiliates, or their respective employees or agents with respect
//                 to the Card, a Card Sale, an Account or any other matters
//                 relating to the Program; (iv) any claim, dispute, complaint or
//                 setoff by a consumer made in good faith resulting from a
//                 violation by Joint Venture Card of the Equal Credit Opportunity
//                 Act, Truth in Lending Act or any other related Applicable Laws;
//                 and (v) any claim, dispute or complaint of any third party made
//                 in good faith in connection with advertisements and promotions
//                 prepared by Joint Venture Card relating to the Card.
//               </p>

//               <p>
//                 <strong>Notice of Claim and Survival.</strong> In the event
//                 that Joint Venture Card or Merchant shall receive any claim or
//                 demand or be subject to any suit or proceeding of which a claim
//                 may be made against the other under this Section, the Party
//                 seeking indemnification shall give prompt written notice thereof
//                 to the indemnifying Party, and the indemnifying Party will be
//                 entitled to participate in the settlement or defense thereof
//                 with counsel satisfactory to indemnified Party at the
//                 indemnifying Party's expense. The terms of this Section shall
//                 survive the termination of this Agreement.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 16. Term and Termination
//               </h4>

//               <p>
//                 <strong>Term.</strong> This Agreement shall be effective as of
//                 the Effective Date and shall remain in effect for one (1) year
//                 ("Initial Term"), subject to earlier termination as set forth
//                 below. After that, this Agreement shall be automatically renewed
//                 for successive one year terms (each, a "Renewal Term") unless
//                 and until terminated as provided in the Agreement.
//               </p>

//               <p>
//                 <strong>Termination of Agreement.</strong> This Agreement shall
//                 continue until terminated by either Party by giving the other
//                 Party not less than thirty (30) days advance written notice as
//                 required by the Agreement. Each Party's obligations on Charge
//                 Slips and Card Sales that Joint Venture Card authorizes or funds
//                 before the effective date of the termination shall survive such
//                 termination. Joint Venture Card also reserves the right to
//                 terminate this Agreement immediately in the event of substantive
//                 non-performance or conflict.
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 6</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Page 6 */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed">
//               <p>
//                 Reasons for immediate termination include but are not limited
//                 to: (i) Excessive Chargebacks; (ii) Merchant's failure to pay
//                 Joint Venture Card any undisputed amount Merchant owes under the
//                 Agreement; (iii) Merchant's failure to communicate with Joint
//                 Venture Card in the time and manner required by the Agreement;
//                 (iv) Merchant's misrepresentation to Joint Venture Card of the
//                 goods and services provided and performed by Merchant; (v)
//                 fraud, bankruptcy, sale or significant changes to the Merchant's
//                 organizational structure; (vi) Merchant's failure to maintain
//                 sufficient funds in the Transaction Processing Account; (vii)
//                 Merchant's closure of the Transaction Processing Account; or
//                 (viii) Merchant's cancellation of the authority for Joint
//                 Venture Card to initiate debit and credit entries to the
//                 Transaction Processing Account as provided in the Agreement.
//               </p>

//               <p>
//                 <strong>Duties and Rights Upon Termination.</strong> All rights
//                 and duties of a Party related to Card Sales and Charge Slips
//                 processed before termination, including related Rewards Program
//                 liabilities, shall survive termination. Joint Venture Card may
//                 place funds for Card Sales and Charge Slips processed before
//                 termination in a Reserve Account, until Merchant pays all
//                 amounts it owes Joint Venture Card or for which Merchant is
//                 liable under the Agreement. Merchant must maintain sufficient
//                 funds in the Transaction Processing Account after termination to
//                 cover all Chargebacks, returns, adjustments, fees, charges, and
//                 other amounts due under the Agreement for a reasonable time, but
//                 in any event, not less than one hundred eighty (180) days after
//                 termination.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 17. Miscellaneous Provisions
//               </h4>

//               <p>
//                 <strong>
//                   Limitation of Liability; Disclaimer of Warranties.
//                 </strong>{" "}
//                 In no event shall either Party, or its agents, officers,
//                 directors, or employees be liable to the other Party, for
//                 indirect, exemplary, punitive, special, or consequential
//                 damages. EXCEPT AS OTHERWISE EXPRESSLY PROVIDED IN THE
//                 AGREEMENT, JOINT VENTURE CARD MAKES NO WARRANTIES, EXPRESS OR
//                 IMPLIED, REGARDING THE TRANSACTION PROCESSING SERVICES AND
//                 NOTHING CONTAINED IN THE AGREEMENT SHALL CONSTITUTE SUCH A
//                 WARRANTY. JOINT VENTURE CARD EXPRESSLY DISCLAIM ALL IMPLIED
//                 WARRANTIES, INCLUDING THOSE OF MERCHANTABILITY AND FITNESS FOR A
//                 PARTICULAR PURPOSE, TO THE EXTENT ALLOWED BY APPLICABLE LAW.
//               </p>

//               <p>
//                 <strong>Fraud Monitoring.</strong> Merchant is solely
//                 responsible for monitoring its own Card Sales and Account
//                 transactions for purposes of detecting fraudulent or suspicious
//                 activity. Joint Venture Card are under no duty to monitor
//                 Merchant's Card Sales and Account transactions for such
//                 fraudulent or suspicious activity.
//               </p>

//               <p>
//                 <strong>Audit Rights.</strong> If Joint Venture Card reasonably
//                 suspect that they may be subject to a financial or reputational
//                 risk due to Merchant's actions or omissions, Merchant authorizes
//                 Joint Venture Card to perform an audit or inspection of
//                 Merchant's operations and records to confirm compliance with the
//                 Agreement, upon reasonable advance notice to Merchant and at the
//                 expense of Joint Venture Card. Merchant agrees to cooperate, in
//                 good faith, with any such audit conducted by Joint Venture Card.
//               </p>

//               <p>
//                 <strong>Taxes.</strong> Merchant must pay all taxes and other
//                 charges imposed by any governmental authority on the Goods and
//                 Services provided by Merchant, excluding income taxes
//                 attributable to Joint Venture Card. If Merchant is a tax-exempt
//                 entity, Merchant agrees to provide Joint Venture Card with an
//                 appropriate certificate of tax exemption.
//               </p>

//               <p>
//                 <strong>Relationship of Parties.</strong> In performing their
//                 respective duties pursuant to the Agreement, Joint Venture Card
//                 and Merchant are in the position of independent contractors. In
//                 no circumstances shall either Party be deemed to be the agent or
//                 employee of the other Party. This Agreement is not intended to
//                 create, does not create, and shall not be construed to create, a
//                 relationship of partner or joint venturer or an association for
//                 profit between Joint Venture Card and Merchant.
//               </p>

//               <p>
//                 <strong>Force Majeure.</strong> Neither Party shall be liable to
//                 the other Party by reason of any failure in performance of this
//                 Agreement in accordance with its terms, if such failure arises
//                 out of a cause beyond the control and without the fault or
//                 negligence of such Party. Such causes may include but are not
//                 limited to acts of God, a public enemy, or of civil or military
//                 authority, unavailability of energy resources, system or
//                 communication failure, delay in transportation, fires, strikes,
//                 riots or war.
//               </p>

//               <p>
//                 <strong>Limited License; Marks.</strong> Merchant may not
//                 display or use any name, logo, service mark or trade mark of
//                 Joint Venture Card or its Affiliates, including but not limited
//                 to "The Joint Venture Card" in any manner without the prior
//                 express written consent of Joint Venture Card. Merchant
//                 authorizes Joint Venture Card, for purposes of this Agreement,
//                 to use and display Merchant's name, logo, trademarks, service
//                 marks, and any other proprietary designations ("Merchant
//                 Proprietary Materials") on Cards, Applications, periodic
//                 statements, collection letters or documents, promotional or
//                 advertising materials and otherwise in connection with the
//                 Program.
//               </p>

//               <p>
//                 <strong>Additional Products and Services.</strong> Except as may
//                 be restricted by Applicable Law or a binding contract between
//                 Joint Venture Card and a person or entity other than Merchant,
//                 Merchant understands and agrees that Joint Venture Card, the
//                 Authorized Financial Institution, and/or any of their respective
//                 Affiliates may solicit Cardholders at any time for other
//                 financial products and services available through Joint Venture
//                 Card.
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 7</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Page 7 */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed">
//               <p>
//                 <strong>Notices.</strong> All notices required or permitted by
//                 this Agreement must be in writing and sent to the respective
//                 Parties at the addresses set forth in the Agreement. Notices to
//                 Merchant and any identified Merchant Affiliate may be sent to
//                 the address shown in the Designation of Merchant, Merchant
//                 Affiliates, and Notice Addresses, attached as Schedule "A," as
//                 may be amended from time to time in accordance with its terms.
//                 Said notices, when sent to the referenced addresses, shall be
//                 deemed to be received: (i) three (3) Business Days after deposit
//                 in the U.S. first class mail with postage prepaid; (ii) as of
//                 the date of any personal delivery; or (iii) as of any confirmed
//                 receipt by telex, facsimile, or overnight/express courier
//                 service or certified mail.
//               </p>

//               <p>
//                 <strong>Amendments.</strong> Any amendment or modification to
//                 the Agreement must be in writing and signed by a duly authorized
//                 officer of Joint Venture Card and Merchant to be effective and
//                 binding on the Parties, except as otherwise provided in the
//                 Agreement, including any applicable Schedule to the Agreement.
//                 No oral amendments or modifications shall be binding upon the
//                 Parties. Any alteration or strike-through in the text of the
//                 preprinted Terms of Service or any preprinted part of the
//                 Agreement will have no binding effect and will not be deemed an
//                 amendment of the Agreement.
//               </p>

//               <p>
//                 <strong>Counterparts.</strong> The Agreement may be signed in
//                 one or more counterparts, each of which shall constitute an
//                 original and all of which, taken together, shall constitute one
//                 and the same agreement.
//               </p>

//               <p>
//                 <strong>Nonwaiver and Extensions.</strong> Neither Party shall
//                 be deemed to have waived any rights or remedies under the
//                 Agreement by any act, delay, omission, or otherwise, unless any
//                 such waiver is in a writing signed by a duly authorized officer
//                 of the waiving Party. Each Party agrees that the other Party's
//                 failure to enforce any of its rights under this Agreement shall
//                 not amend the Agreement or affect any other right of such Party,
//                 or the same right in any other instance.
//               </p>

//               <p>
//                 <strong>Third-Party Beneficiaries.</strong> The Authorized
//                 Financial Institution is a third party beneficiary of the rights
//                 held by Joint Venture Card pursuant to the Agreement. This
//                 Agreement shall not create any rights on the part of any person
//                 or entity other than the Parties, whether as a third party
//                 beneficiary or otherwise.
//               </p>

//               <p>
//                 <strong>Rules of Construction.</strong> All terms using the
//                 singular form in the Agreement shall also include their plural
//                 form and vice versa. The terms of a Schedule shall be superior
//                 to and control over any conflicting or inconsistent terms that
//                 may be contained in the Terms of Service. The Section headings
//                 in the Agreement are for reference only. The Section headings
//                 are not a substantive part of the Agreement, and are not to be
//                 used to affect the validity, construction or interpretation of
//                 this Agreement or any of its provisions.
//               </p>

//               <p>
//                 <strong>Integration; Entire Agreement.</strong> This Agreement
//                 contains the entire agreement between the Parties. There are
//                 merged in the Agreement all prior oral or written agreements,
//                 amendments, representations, promises and conditions in
//                 connection with the subject matter of the Agreement. Any
//                 representations, warranties, promises or conditions not
//                 expressly incorporated in the Agreement shall not be binding on
//                 Joint Venture Card or Merchant.
//               </p>

//               <p>
//                 <strong>Governing Law; Severability.</strong> This Agreement
//                 shall be governed by and construed in accordance with the laws
//                 of the State of Nevada. If any provision of this Agreement is
//                 determined by a court or arbitrator of competent jurisdiction to
//                 be invalid, unenforceable, or contrary to Applicable Law, then
//                 any such determination shall not affect any of the remaining
//                 provisions of the Agreement and the Agreement shall be construed
//                 as if the offending provision is not contained in the Agreement.
//               </p>

//               <p>
//                 <strong>Bankruptcy.</strong> Merchant must notify Joint Venture
//                 Card of any bankruptcy, receivership, insolvency or similar
//                 action or proceeding initiated by or against Merchant or any of
//                 its guarantors. Merchant must include Joint Venture Card on the
//                 list and matrix of creditors as filed with the Bankruptcy Court,
//                 regardless of whether Merchant has verified the existence and/or
//                 final amount of any such claim at the time of filing. Merchant's
//                 failure to do so will be cause for immediate termination of the
//                 Agreement and any other action available to Joint Venture Card
//                 under the Agreement or Applicable Law.
//               </p>

//               <p>
//                 <strong>Survival.</strong> The following Sections of the Terms
//                 of Service and the following Schedules shall survive termination
//                 of the Agreement: Terms of Service Sections 3; 5; 6; 7; 8; 9;
//                 10; 11; 12; 14; 15(d); and 18; Schedules "A," "C," "D," "E," and
//                 "F"; and, if checked and made applicable by page 1 of the
//                 Agreement, Schedules "G" and "H."
//               </p>

//               <p>
//                 <strong>Responsibility For Employees and Agents.</strong>{" "}
//                 Merchant agrees that it is fully responsible and liable to Joint
//                 Venture Card under the Agreement for any action, omission,
//                 violation, or failure to comply by any person or entity that is
//                 an employee or agent of Merchant or its Affiliates.
//               </p>

//               <p>
//                 <strong>JURISDICTION AND VENUE.</strong> ANY SUIT, COUNTERCLAIM,
//                 ACTION OR PROCEEDING ARISING OUT OF OR RELATING TO THIS
//                 AGREEMENT MUST BE BROUGHT BY EITHER PARTY IN THE COURTS OF THE
//                 STATE OF NEVADA. MERCHANT HEREBY IRREVOCABLY SUBMITS TO THE
//                 EXCLUSIVE JURISDICTION OF SUCH COURTS AND ANY APPELLATE COURTS
//                 THEREOF FOR THE PURPOSE OF ANY SUCH SUIT, COUNTERCLAIM, ACTION,
//                 PROCEEDING OR JUDGMENT.
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 8</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Page 8 */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed">
//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 18. Arbitration
//               </h4>

//               <p>
//                 <strong>Mandatory Arbitration.</strong> Any Dispute of any kind
//                 shall, at the election of either Party, be resolved by a
//                 neutral, binding arbitration and not by a court of law, except
//                 as otherwise stated in the Agreement. This procedure includes
//                 any Dispute of any kind over the interpretation, scope, or
//                 validity of the Agreement, this arbitration provision, or the
//                 arbitrability of any issue, with the sole exception of the
//                 Parties' waiver of any right to bring a class action or
//                 participate in a class action as provided for in this Section,
//                 which shall be solely determined by the appropriate court, if
//                 necessary.
//               </p>

//               <p>
//                 <strong>Rules; Fee and Costs.</strong> Except as otherwise
//                 provided in this Section, any arbitration must be administered
//                 by the Commercial Arbitration Rules of the American Arbitration
//                 Association ("AAA"). The AAA Rules may be obtained by mail from
//                 1633 Broadway, 10th Floor, New York, NY 10019; by telephone at
//                 #800-778-7879; or on the Internet at{" "}
//                 <span className="text-blue-600 underline">www.adr.org</span>. If
//                 the AAA is unable or unwilling to serve as an arbitration
//                 administrator and the Parties cannot agree on a substitute, then
//                 a substitute administrator and/or arbitrator will be appointed
//                 in accordance with the Federal Arbitration Act (9 U.S.C. § 1 et
//                 seq.).
//               </p>

//               <p>
//                 The arbitration hearing shall be conducted in the federal
//                 judicial district where Joint Venture Card accepted and executed
//                 this Agreement (the U.S. District Court for the Western District
//                 of Nevada, Las Vegas, NV). Fees and costs shall be paid and
//                 allocated in accordance with the procedures and rules of the
//                 applicable arbitration administrator.
//               </p>

//               <p>
//                 <strong>Standards and Law.</strong> The Parties agree that the
//                 Agreement involves interstate commerce and that the arbitration
//                 provisions of the Agreement shall be governed by the Federal
//                 Arbitration Act, 9 U.S.C. § 1 et seq., as may be amended
//                 ("FAA"). The arbitrator shall strictly apply all applicable
//                 substantive law and applicable statutes of limitation that are
//                 consistent with the FAA and shall honor claims of privilege
//                 recognized at law. Judgment on any arbitrator's award may be
//                 entered by any court having competent jurisdiction.
//               </p>

//               <p>
//                 <strong>
//                   Waiver of Jury Trials, Class Actions, and Punitive Damages.
//                 </strong>{" "}
//                 The Parties agree to give up their respective rights to a trial
//                 by jury. The Parties also agree to give up any right they may
//                 have to bring a class action lawsuit or class arbitration or to
//                 participate in either as a claimant. The Parties agree to give
//                 up any right to consolidate or join any arbitration proceeding
//                 with the arbitration of others. The Parties give up the right to
//                 serve as a private attorney general in any jurisdiction in which
//                 such procedure may be permitted. The Parties waive any right to
//                 seek or recover punitive damages in any Dispute. No arbitrator
//                 shall have the power or authority to award punitive damages.
//               </p>

//               <p>
//                 <strong>Self-Help.</strong> Notwithstanding the arbitration
//                 provisions in this Section, the Parties retain the right to
//                 exercise self-help remedies and to seek provisional remedies
//                 from a court, pending final determination of the Dispute by the
//                 arbitrator. No Party waives the right to elect arbitration of a
//                 Dispute by exercising self-help remedies, filing suit, or
//                 seeking or obtaining provisional remedies from a court.
//               </p>

//               <p>
//                 <strong>Survival of Arbitration Agreement.</strong> The
//                 arbitration provisions in this Section shall survive and
//                 continue in full force and effect, regardless of any
//                 cancellation, termination, amendment, payment in full, discharge
//                 in bankruptcy, or other expiration or conclusion of the
//                 Agreement or any other contract or transaction between the
//                 Parties, unless otherwise agreed in writing.
//               </p>

//               <div className="bg-gray-100 p-4 rounded-md mt-6">
//                 <p className="font-semibold">
//                   FOR ALL DISPUTES COVERED BY THE ARBITRATION PROVISIONS IN THIS
//                   SECTION OF THE AGREEMENT, THE PARTIES HAVE AGREED TO WAIVE
//                   THEIR RIGHT TO A TRIAL BY JURY, THEIR RIGHT TO PARTICIPATE IN
//                   CLASS ACTIONS, AND THEIR RIGHT TO SEEK PUNITIVE DAMAGES.
//                   EXCEPT FOR DISPUTES AND CLAIMS NOT SUBJECT TO THIS ARBITRATION
//                   AGREEMENT, ARBITRATION SHALL BE IN PLACE OF ANY CIVIL
//                   LITIGATION IN ANY COURT AND IN PLACE OF ANY TRIAL BY JURY. THE
//                   TERMS OF THIS ARBITRATION AGREEMENT AFFECT YOUR LEGAL RIGHTS.
//                   IF YOU DO NOT UNDERSTAND ANY TERMS OF THIS PROVISION OR THE
//                   COST, ADVANTAGES OR DISADVANTAGES OF ARBITRATION, SEEK
//                   INDEPENDENT ADVICE AND/OR CONTACT THE AMERICAN ARBITRATION
//                   ASSOCIATION AT (800) 778-7879 BEFORE SIGNING THIS AGREEMENT.
//                   BY SIGNING THIS AGREEMENT, YOU ACKNOWLEDGE THAT YOU READ,
//                   UNDERSTOOD AND AGREED TO BE BOUND BY EACH OF THE PROVISIONS,
//                   COVENANTS, STIPULATIONS AND AGREEMENTS SET FORTH IN THIS
//                   SECTION.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 9</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Page 9 - Glossary */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Exhibit "A" to Terms of Service
//               </h3>
//               <h4 className="text-base font-semibold text-gray-900 mb-3">
//                 Glossary of Terms
//               </h4>

//               <p>
//                 <strong>"Account"</strong> means any open-end line of credit
//                 account initially established by Joint Venture Card and serviced
//                 by Joint Venture Card, that Cardholders may use from time to
//                 time to purchase goods or services from the Merchant or
//                 otherwise pay amounts due to Merchant, and that is accessible by
//                 a Card or other access methods approved by Joint Venture Card.
//               </p>

//               <p>
//                 <strong>"Account Agreement"</strong> means the agreement between
//                 a Cardholder, as may be amended from time to time, that
//                 establishes the rates, fees, terms and conditions of the
//                 Cardholder's Account and makes disclosures about the cost and
//                 availability of Account credit.
//               </p>

//               <p>
//                 <strong>"Affiliate"</strong> means any entity that Controls, is
//                 Controlled by, or is under common Control with Joint Venture
//                 Card, the Authorized Financial Institution, or Merchant, as
//                 applicable.
//               </p>

//               <p>
//                 <strong>"Applicable Law"</strong> means any federal, state, or
//                 local law, rule, regulation, or regulatory guidance, and any
//                 binding determination of an arbitrator, court, or other
//                 governmental authority, each as amended or otherwise in effect
//                 from time to time, that applies to or is binding on a Party, its
//                 property, or the transaction of its business.
//               </p>

//               <p>
//                 <strong>"Applicant"</strong> means a customer whose principal
//                 residence and billing address is in the United States, and who
//                 applies for a Joint Venture Credit Card Account.
//               </p>

//               <p>
//                 <strong>"Application"</strong> means a request for credit using
//                 the Joint Venture Card website or other mechanism provided by
//                 the Joint Venture Card.
//               </p>

//               <p>
//                 <strong>"Authorization"</strong> means the permission that Joint
//                 Venture Card expressly grants for Merchant to make a Card Sale.
//               </p>

//               <p>
//                 <strong>"Business Day"</strong> means all calendar days, except
//                 Saturday, Sunday, and any legal public holiday on which banking
//                 institutions are closed for business.
//               </p>

//               <p>
//                 <strong>"Rewards Program"</strong> is the merchant incentive
//                 program offered as a feature of the Account and detailed in
//                 Schedule E.
//               </p>

//               <p>
//                 <strong>"Card"</strong> means any card, plate, digital account
//                 number, QC Code or other single credit device displaying the
//                 names and logos of Joint Venture Card (including but not limited
//                 to "Joint Venture Card"), and its associated Account number,
//                 which Cardholders may use from time to time to obtain Account
//                 credit for purchasing Goods and Services from Merchant or
//                 otherwise paying an amount due to Merchant.
//               </p>

//               <p>
//                 <strong>"Card Sale"</strong> means any purchase of Goods and
//                 Services that a Cardholder is allowed to make from Merchant
//                 using a Card code pursuant to the Agreement.
//               </p>

//               <p>
//                 <strong>"Cardholder"</strong> means an individual in whose name
//                 a Card has been issued, or any individual who possesses or uses
//                 a Card and who purports to be the person in whose name the Card
//                 was issued, or who purports to be an authorized user of the
//                 Card.
//               </p>

//               <p>
//                 <strong>"Chargeback"</strong> means the reimbursement due from
//                 Merchant, or made by Merchant, for an amount it previously
//                 received from Joint Venture Card in connection with a Charge
//                 Slip and/or Card Sale. The reasons for which a Chargeback is or
//                 may be due are set forth in the Merchant Operating Guide.
//               </p>

//               <p>
//                 <strong>"Charge Slip"</strong> means the electronic record of
//                 the purchase of Goods and Services made by a Cardholder from the
//                 Merchant using a Card pursuant to the Agreement.
//               </p>

//               <p>
//                 <strong>"Confidential Information"</strong> has the meaning set
//                 forth in the Information Privacy and Security Schedule attached
//                 as Schedule "F" to the Agreement.
//               </p>

//               <p>
//                 <strong>"Consumer"</strong> has the meaning set forth in the
//                 Information Privacy and Security Schedule attached as Schedule
//                 "F" to the Agreement.
//               </p>

//               <p>
//                 <strong>"Control" and "Controlled"</strong> means having the
//                 ability, directly or indirectly, to direct the management and
//                 policies of the entity in question.
//               </p>

//               <p>
//                 <strong>"Customer"</strong> means a current or prospective
//                 customer, client, or patient of Merchant who may also apply for
//                 and use a Card and Account as a Cardholder to pay for purchases
//                 from Merchant, subject to the terms and conditions established
//                 by the Application and Account agreement.
//               </p>

//               <p>
//                 <strong>"Dispute"</strong> means any action, dispute, claim, or
//                 controversy of any kind arising out of, in connection with or in
//                 any way related to: the Agreement; the provision of services and
//                 the processing, transfer, acquisition of Charge Slips and
//                 Chargebacks before, on, or after the Effective Date of the
//                 Agreement; or any other aspect whatsoever of the past, present,
//                 or future relationship or conduct of the Merchant, Joint Venture
//                 Card, their respective Affiliates.
//               </p>

//               <p>
//                 <strong>"Excessive Chargebacks"</strong> shall occur if: (i) the
//                 aggregate number of Charge Slips subject to Chargeback exceeds
//                 three percent (3.0%) of the total number of all Charge Slips
//                 submitted by Merchant, with respect to an individual Merchant
//                 location or all Merchant locations, in any calendar quarter; or
//                 (ii) the aggregate dollar amount of all Charge Slips subject to
//                 Chargeback in any monthly billing cycle exceeds five percent
//                 (5.0%) of the total unpaid balances of all Accounts at the end
//                 of such monthly billing cycle.
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 10</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Page 10 - Glossary Continued */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed">
//               <p>
//                 <strong>"Goods and Services"</strong> means the products or
//                 services that Merchant provides to its Customers, as described
//                 in the Merchant Application or any other part of the Agreement,
//                 certain warranties expressly authorized by Joint Venture Card,
//                 and related services sold by Merchant in the ordinary course of
//                 its business to Customers for their personal, family, or
//                 household purposes.
//               </p>

//               <p>
//                 <strong>"Merchant"</strong> means the entity identified on the
//                 first page of the Agreement.
//               </p>

//               <p>
//                 <strong>"Merchant Application"</strong> means and includes the
//                 document attached as Schedule "B" to the Agreement and any
//                 additional documents containing information about Merchant's
//                 business that is submitted to Joint Venture Card in connection
//                 with Merchant's application for services and transactions set
//                 forth in the Agreement.
//               </p>

//               <p>
//                 <strong>"Merchant Operating Guide"</strong> means the operating
//                 manual of Joint Venture Card that sets forth the rules and
//                 procedures that govern Applications, Charge Slips, Chargebacks,
//                 and other processing requirements and services related to the
//                 Program. The Merchant Operating Guide may be amended from time
//                 to time by Joint Venture Card in their sole discretion, and any
//                 such amendments shall be effective as of the date specified by
//                 Joint Venture Card in its notice to the Merchant.
//               </p>

//               <p>
//                 <strong>"Nonpublic Personal Information"</strong> has the
//                 meaning set forth in the Information Privacy and Security
//                 Schedule attached as Schedule "D" to the Agreement.
//               </p>

//               <p>
//                 <strong>"POS Provider"</strong> means a point of sale system
//                 provider that is used by Merchant and integrated with the Joint
//                 Venture Card. The POS Provider may also be referred to as a
//                 "Distribution Partner."
//               </p>

//               <p>
//                 <strong>"Program"</strong> means the products, services,
//                 information and support that Joint Venture Card provide that
//                 allows certain Customers to finance their purchase of goods and
//                 services from Merchant, if such Customers request and qualify
//                 for an Account based on the criteria established and implemented
//                 from time to time by Joint Venture Card. The Program includes
//                 the Rewards Program.
//               </p>

//               <p>
//                 <strong>"Promotional Offerings"</strong> means the marketing,
//                 services, terms, and enhancements associated with the Program
//                 and Accounts that are mutually acceptable to the Parties from
//                 time to time, for purposes of promoting the use and availability
//                 of Accounts and any related services, features, and enhancements
//                 to Customers, Applicants, and Cardholders.
//               </p>

//               <p>
//                 <strong>"Proprietary Information"</strong> has the meaning set
//                 forth in the Information Privacy and Security Schedule attached
//                 as Schedule "D" to the Agreement.
//               </p>

//               <p>
//                 <strong>"Purchase"</strong> means the exchange of goods or
//                 services from the Merchant to a customer in exchange for
//                 payment. Customer makes payment to Merchant with a Card through
//                 the use of Joint Venture Card for collection. Payments to
//                 Merchant for Cardholder Purchases are completed as described in
//                 the Merchant Operating Guide.
//               </p>

//               <p>
//                 <strong>"Recipient"</strong> has the meaning set forth in the
//                 Information Privacy and Security Schedule attached as Schedule
//                 "D" to the Agreement.
//               </p>

//               <p>
//                 <strong>"Referral Partner"</strong> means an independent sales
//                 person who introduces a merchant to Joint Venture Card and
//                 assists introduced merchants with their application to become a
//                 Merchant, along with the implementation and roll-out of the
//                 Joint Venture Card service at the Merchant location(s).
//               </p>

//               <p>
//                 <strong>"Rules"</strong> means all rules, regulations, and laws
//                 as respectfully amended from time to time, including the
//                 Merchant Operating Guide; any applicable national, federal,
//                 state, or local jurisdiction in which the Merchant operates;
//                 NACHA; and the Electronic Transactions Association.
//               </p>

//               <p>
//                 <strong>"Transaction"</strong> shall mean a Purchase.
//               </p>

//               <p>
//                 <strong>"Transaction Processing Account"</strong> means the
//                 commercial purpose demand deposit account at a depository
//                 institution designated by Merchant, and acceptable to Joint
//                 Venture Card, for purposes of either Party making a payment due
//                 to the other Party in connection with Credit Sales and
//                 Chargebacks, or other amounts a Party owes the other Party as
//                 provided in the Agreement.
//               </p>

//               <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
//                 Schedule "E" - Rewards Program Terms
//               </h3>

//               <p>
//                 The Rewards Program entitles each cardholder to earn points that
//                 can be accumulated and redeemed for credits on future Purchases.
//                 Points are generally earned, accumulated, and redeemable with
//                 each individual merchant where Purchases are made. Points expire
//                 180 days after they are earned and rewards credits expire 90
//                 days after being earned.
//               </p>

//               <p>
//                 <strong>1. Earning Rewards Points: from Purchases.</strong>{" "}
//                 Cardholders will earn one point for each Purchase dollar on the
//                 Joint Venture Card, net of returns, with any merchant that
//                 accepts the Card. Rewards on Purchases are liabilities of the
//                 Merchant, payable in connection with Rewards Redemptions, as
//                 described below.
//               </p>

//               <p>
//                 <strong>2. Earning Rewards Points: from Bonuses.</strong>{" "}
//                 Cardholders may be given the opportunity to earn bonus rewards
//                 points. For example, Cardholders may earn 50 bonus rewards
//                 points upon the approval of their credit application and first
//                 Purchase with any merchant that accepts the Card, or bonus
//                 rewards points equal to a percentage of their Purchase amount
//                 for choosing a certain repayment method.
//               </p>

//               <p>
//                 <strong>3. Transferring Rewards Points.</strong> Joint Venture
//                 Card may, in its sole discretion, permit Cardholders to elect to
//                 transfer rewards points earned with one merchant to another
//                 merchant ("Transferred Points"). If a Cardholder elects to
//                 transfer rewards points from another merchant to be used with
//                 Merchant, such Transferred Points will be liabilities of JVC
//                 payable to Merchant when they are allocated to Merchant at a
//                 rate of $0.005 per point, regardless of whether such points are
//                 redeemed.
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 11</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Page 11 - Rewards Program Continued */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed">
//               <p>
//                 <strong>
//                   4. Rewards Redemptions and the Application of Rewards Credits.
//                 </strong>{" "}
//                 With each 500 points a Cardholder accumulates with any single
//                 merchant, including Merchant, JVC shall cause 500 points to be
//                 automatically redeemed as a $25 reward credit. Cardholders may
//                 load reward credits in the JVC consumer app for use with
//                 Merchant. Merchant shall apply any loaded and unused reward
//                 credits to the Cardholder's next Purchase with the Merchant. For
//                 example, assume a Cardholder earns 600 points with a merchant.
//                 500 points will be automatically redeemed as a $25 reward credit
//                 and 100 points will remain. When the Cardholder loads the $25
//                 reward credit in the JVC consumer app for use with the merchant,
//                 the $25 reward credit must be applied by the merchant to the
//                 Cardholder's next Purchase. If the next Purchase is $100, the
//                 $25 reward credit will reduce the total Purchase amount to $75.
//                 The consumer purchase amount must exceed the amount of the
//                 reward credit applied. There is no cash back to the consumer.
//               </p>

//               <p>
//                 <strong>5. Merchant Liability for Rewards Redemptions.</strong>{" "}
//                 Each time a Cardholder makes a Purchase with Merchant that
//                 triggers a reward credit to be applied towards the Purchase
//                 amount, Merchant shall be liable to JVC for the amount of each
//                 $25 reward credit provided to Cardholders, less $2.50 per $25
//                 reward credit. To satisfy this liability, Joint Venture Card
//                 will deduct the total amount of all such reward credits on a
//                 business day from the payment amount due to Merchant in
//                 connection with this Agreement for that day. Joint Venture Card
//                 will maintain and share with Merchant its records of
//                 Cardholders' Reward Program Merchant point balances and
//                 redemption activity.
//               </p>

//               <p>
//                 <strong>6. Termination.</strong> In the event of termination of
//                 this Agreement or Merchant's decision to stop accepting Cards
//                 for Purchases, for any reason, which thereby eliminates the
//                 ability of a Cardholder to redeem accumulated rewards, Merchant
//                 shall pay Joint Venture Card $0.005 for each outstanding point.
//               </p>

//               <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">
//                 Rewards Liability Schedule
//               </h4>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full border-collapse border border-gray-300">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="border border-gray-300 px-4 py-2 text-left">
//                         Event
//                       </th>
//                       <th className="border border-gray-300 px-4 py-2 text-left">
//                         Liability of
//                       </th>
//                       <th className="border border-gray-300 px-4 py-2 text-left">
//                         Amount
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="border border-gray-300 px-4 py-2">
//                         Transfer of Rewards to Merchant
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">JVC</td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         $0.005 per transferred point
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 px-4 py-2">
//                         Transfer of Rewards from Merchant
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         Merchant
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         $0.005 per transferred point
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 px-4 py-2">
//                         Reward credit applied to Purchase
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         Merchant
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         $22.50 per $25 reward credit applied
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 px-4 py-2">
//                         Reward credit applied to Purchase
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">JVC</td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         $2.50 per $25 reward credit applied
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 px-4 py-2">
//                         Termination of JVC Agreement
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         Merchant
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         $0.005 per outstanding point
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="mt-8 pt-6 border-t border-gray-300">
//                 <p className="text-xs text-gray-600 italic">
//                   This document is a preview of the JVC Merchant Agreement. For
//                   questions or additional information, please contact Joint
//                   Venture Card at support@jointventurecard.com.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default MerchantAgreementPreview;

import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "react-router-dom";
import { useMerchantData } from "@/context/MerchantDataContext";
import { getActiveMerchantPaymentConfiguration, getPaymentConfigurationBySession } from "@/lib/api";
import jvcLogo from '@/assets/icons/jvc-logo-2.png';

type PartySignature = {
  signatureImageUrl?: string; // optional e-sign image
  signedBy?: string;
  printedName?: string;
  title?: string;
  date?: string; // ISO or display
};

type ScheduleA = {
  merchantName: string;
  merchantNoticeAddressLines: string[]; // e.g. ["123 Main St", "Suite 4", "Las Vegas, NV 89109"]
  jvcNoticeAddressLines?: string[]; // fallback to default shown below if not provided
  merchantSigner?: PartySignature;
  jvcSigner?: PartySignature;
  effectiveDate?: string;
};

type FeesRow = { label: string; payer: "Merchant" | "JVC" | "Consumer"; amountOrRule: string };
type ScheduleB = {
  notes?: string[];
  feeRows?: FeesRow[];
  transactionProcessingFeeRule?: string; // e.g. "4.75% of the Gross Sale amount ($3.00 minimum)"
  enrollmentFee?: string; // e.g. "$150 one-time"
  surchargeRule?: string; // e.g. "Up to processing fee; state caps apply"
};

type ScheduleC = {
  bankName: string;
  nameOnAccount: string;
  routingNumberMasked: string; // mask in UI; keep raw server-side
  accountNumberMasked: string; // mask in UI
  // Raw routing/account numbers - included so the generated agreement document can
  // display unmasked values while the UI elsewhere may show masked variants.
  routingNumber?: string;
  accountNumber?: string;
  merchantSigner?: PartySignature;
};

type ScheduleD = {
  // You likely only need acknowledgements or links, the legal text is static.
  // Add checkboxes/flags if you want an “I acknowledge” preview.
  showAcknowledgement?: boolean;
  acknowledgementText?: string;
};

type RewardsLiabilityRow = { event: string; liableParty: "Merchant" | "JVC"; amount: string };
type ScheduleE = {
  pointsEarnRate?: string; // "1 point per $1"
  pointExpiryDays?: number; // 180
  creditExpiryDays?: number; // 90
  autoRedeemThreshold?: number; // 500
  autoRedeemValue?: string; // "$25"
  examples?: string[];
  liabilityRows?: RewardsLiabilityRow[];
};

type AgreementParties = {
  merchantLegalName: string;
  merchantEntityDescriptor?: string; // e.g., "a Nevada LLC"
  jvcLegalName?: string; // default provided
  jvcDba?: string; // default provided
  merchantSignature?: PartySignature;
  jvcSignature?: PartySignature;
  effectiveDate?: string;
  stateOfGoverningLaw?: string; // default "Nevada"
  federalDistrictForArb?: string; // default "U.S. District Court for the Western District of Nevada, Las Vegas, NV"
};

type AgreementData = {
  parties: AgreementParties;
  scheduleA?: ScheduleA;
  scheduleB?: ScheduleB;
  scheduleC?: ScheduleC;
  scheduleD?: ScheduleD;
  scheduleE?: ScheduleE;
};

const Line = ({ children }: React.PropsWithChildren) => (
  <p className="text-sm leading-relaxed">{children}</p>
);

const PageBreak = ({ label }: { label: string }) => (
  <div className="w-full max-w-4xl flex items-center my-8">
    <div className="flex-grow border-t border-gray-200" />
    <span className="mx-2 text-gray-400 text-xs">{label}</span>
    <div className="flex-grow border-t border-gray-200" />
  </div>
);

const SigBlock = ({ heading, sig }: { heading: string; sig?: PartySignature }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">{heading}</p>
      <div className="mt-2 space-y-2">
        {sig?.signatureImageUrl ? (
          <img src={sig.signatureImageUrl} alt="Signature" className="h-10 object-contain" />
        ) : (
          <div className="h-10 border border-dashed rounded-md flex items-center justify-center text-xs text-gray-400">
            Signature
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-gray-500 text-xs">Signed By</div>
            <div className="font-medium">{sig?.signedBy || "—"}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Date</div>
            <div className="font-medium">{sig?.date || "—"}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Printed Name</div>
            <div className="font-medium">{sig?.printedName || "—"}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Title</div>
            <div className="font-medium">{sig?.title || "—"}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ children }: React.PropsWithChildren) => (
  <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">{children}</h4>
);

//---merchant related data is replaced dynamically later below
const exampleData: AgreementData = {
  parties: {
    merchantLegalName: "Acme Dental LLC",
    merchantEntityDescriptor: "a Nevada LLC",
    effectiveDate: "Oct 13, 2025",
    merchantSignature: {
      signedBy: "Bushra",
      printedName: "Bushra",
      title: "Owner",
      date: "10/14/2025",
    },
    jvcSignature: {
      signatureImageUrl: jvcLogo,
      signedBy: "Richard Snelling",
      printedName: "Richard Snelling",
      title: "COO",
      date: new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    }
  },
    scheduleA: {
    merchantName: "Acme Dental LLC",
    merchantNoticeAddressLines: ["123 Main St", "Las Vegas, NV 89109"],
    effectiveDate: "Oct 13, 2025",
    merchantSigner: { signedBy: "Bushra", printedName: "Bushra", title: "Owner", date: "10/14/2025" },
    jvcSigner: { signedBy: "Richard Snelling", printedName: "Richard Snelling", title: "COO", date: "Oct 13, 2025" },
  },
  scheduleB: {
    transactionProcessingFeeRule: "4.75% of the Gross Sale amount ($3.00 minimum)",
    enrollmentFee: "$150 one-time (waived)",
    surchargeRule: "Up to the Transaction Processing Fee amount, subject to State law (e.g., 2% maximum in Colorado)",
    feeRows: [
      { label: "Credit Card Surcharge", payer: "Consumer", amountOrRule: "Up to 4.75% (state caps apply)" },
      { label: "Transaction Processing Fee", payer: "Merchant", amountOrRule: "4.75% ($3.00 minimum)" },
    ],
  },
    scheduleC: {
    bankName: "ABC Bank",
    nameOnAccount: "Acme Dental LLC",
    routingNumberMasked: "1234",
    accountNumberMasked: "6789",
    merchantSigner: { signedBy: "Bushra", printedName: "Bushra", title: "Owner", date: "10/14/2025" },
  },
  scheduleD: { showAcknowledgement: true },
  scheduleE: {
    pointsEarnRate: "1 point per $1",
    pointExpiryDays: 180,
    creditExpiryDays: 90,
    autoRedeemThreshold: 500,
    autoRedeemValue: "$25",
    examples: [
      "Earn 600 points → 500 auto-redeemed ($25 credit), 100 points remain.",
      "Reward credits are applied to the next eligible Purchase (no cash back).",
    ],
    liabilityRows: [
      { event: "Reward credit applied to Purchase", liableParty: "Merchant", amount: "$22.50 per $25 credit" },
      { event: "Transferred points allocated to Merchant", liableParty: "JVC", amount: "$0.005 per point" },
    ],
  },
};

const MerchantAgreementPreview = ({ agreement }: { agreement?: AgreementData }) => {
  // Pull current merchant onboarding data from context and map into the agreement preview
  const { merchantData: contextMerchantData, sessionId: contextSessionId } = useMerchantData();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId') || contextSessionId;
  const [loadedData, setLoadedData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [paymentConfig, setPaymentConfig] = React.useState<{ feePercentage: number; minimumFee: number } | null>(null);

  //----fetch merchant session data if context is empty but session ID exists
  React.useEffect(() => {
    const loadSessionData = async () => {
      
      if (contextMerchantData && Object.keys(contextMerchantData).length > 0) {
        console.log("checking context merchant data---", contextMerchantData);
        setLoadedData(contextMerchantData);
        setIsLoading(false);
        return;
      }

      if (!sessionId) {
        console.log("agreement preview session id inside if----");
        setIsLoading(false);
        return;
      }
      //---load from server session
      try {
        const { getOnboardingSession } = await import('@/lib/api');
        const sessionData = await getOnboardingSession(sessionId);
        console.log("agreement preview---------", sessionId);
        if (sessionData?.data) {
          setLoadedData(sessionData.data);
          console.log("agreement preview-------", sessionData.data);
        }

        // Fetch payment configuration — try by sessionId first, then by businessId
        let configLoaded = false;
        if (sessionId) {
          try {
            const config = await getPaymentConfigurationBySession(sessionId);
            setPaymentConfig({ feePercentage: config.feePercentage, minimumFee: config.minimumFee });
            console.log('[AgreementPreview] Payment config loaded by sessionId:', config);
            configLoaded = true;
          } catch (err) {
            console.warn('[AgreementPreview] No payment config found for sessionId:', sessionId, err);
          }
        }
        if (!configLoaded) {
          const businessId = sessionData?.businessId || sessionData?.data?.businessId;
          if (businessId) {
            try {
              const config = await getActiveMerchantPaymentConfiguration(businessId);
              setPaymentConfig({ feePercentage: config.feePercentage, minimumFee: config.minimumFee });
              console.log('[AgreementPreview] Payment config loaded by businessId:', config);
            } catch (err) {
              console.warn('[AgreementPreview] No active payment config found for businessId:', businessId, err);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load session data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSessionData();
  }, [contextMerchantData, sessionId]);

  //--use loaded data (from context or fetched from server)
  let merchantData = loadedData || contextMerchantData;

  // Debug logging
  console.log("MerchantAgreementPreview - merchantData:", merchantData);
  console.log("MerchantAgreementPreview - isLoading:", isLoading);

  // Cheap helpers to map fields from merchant data into the agreement structure
  const personal = merchantData?.personalDetails || {} as any;
  const business = merchantData?.businessInformation || {} as any;
  const locations = merchantData?.locations || {} as any;
  const bank = merchantData?.bankInformation || {} as any;
  let ag = merchantData?.agreement || {} as any;

  try {
    const signatureFromStorage = localStorage.getItem('merchant_agreement_signature');
    if (signatureFromStorage) {
      ag = { ...ag, signature: signatureFromStorage };
      console.log('[MerchantAgreementPreview] Using signature from localStorage');
    }
  } catch (err) {
    console.warn('[MerchantAgreementPreview] Failed to read signature from localStorage:', err);
  }

  merchantData = {
    ...merchantData,
    agreement: ag,
  };

  // Debug individual sections
  console.log("MerchantAgreementPreview - personal:", personal);
  console.log("MerchantAgreementPreview - business:", business);
  console.log("MerchantAgreementPreview - locations:", locations);
  console.log("MerchantAgreementPreview - bank:", bank);
  console.log("MerchantAgreementPreview - agreement:", ag);

  // Helper function to mask routing and account numbers (show last 4 digits)
  const maskNumber = (num: string | undefined) => {
    if (!num || num.length < 4) return num || '';
    return '****' + num.slice(-4);
  };

  // Helper to get full name from personal details or agreement (NO example data fallback)
  const getFullName = () => {
    if (personal.firstName || personal.lastName) {
      return `${personal.firstName || ""} ${personal.lastName || ""}`.trim();
    }
    return ag?.fullName || "[Not Provided]";
  };

  // Helper to get title from personal details or agreement (NO example data fallback)
  const getTitle = () => {
    return personal.title || ag?.title || "[Not Provided]";
  };

  // Helper to get date from agreement or today
  const getSignatureDate = () => {
    const date = ag?.date ||new Date();
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Merge provided agreement prop and merchant data (NO example data fallback)
  const computedParties: Partial<AgreementParties> = {
    merchantLegalName:
      agreement?.parties?.merchantLegalName || business.legalNameOfBusiness || "[Business Name Not Provided]",
    merchantEntityDescriptor:
      agreement?.parties?.merchantEntityDescriptor || business.legalEntity || "[Entity Type Not Provided]",
    effectiveDate: agreement?.parties?.effectiveDate || getSignatureDate(),
    merchantSignature:
      agreement?.parties?.merchantSignature || {
        signedBy: getFullName(),
        printedName: getFullName(),
        title: getTitle(),
        date: getSignatureDate(),
        signatureImageUrl: ag?.signature || undefined, 
      },
  };

  const computedScheduleA: Partial<ScheduleA> = {
    merchantName: agreement?.scheduleA?.merchantName || business.legalNameOfBusiness || "[Business Name Not Provided]",
    merchantNoticeAddressLines:
      agreement?.scheduleA?.merchantNoticeAddressLines ||
      //|| business.address || "[Address Not Provided]",
      // (locations.addressLine1
      //   ? [
      //       locations.addressLine1,
      //       ...(locations.addressLine2 ? [locations.addressLine2] : []),
      //       [locations.city, locations.state, locations.zipCode].filter(Boolean).join(", "),
      //     ].filter(Boolean)
      //   : ["[Address Not Provided]"]),
       (business.address
        ? [
            business.address,
            // ...(locations.addressLine2 ? [locations.addressLine2] : []),
            [business.city, business.state, business.zipCode].filter(Boolean).join(", "),
          ].filter(Boolean)
        : ["[Address Not Provided]"]),
    effectiveDate: agreement?.scheduleA?.effectiveDate || getSignatureDate(),
    merchantSigner:
      agreement?.scheduleA?.merchantSigner || {
        signedBy: getFullName(),
        printedName: getFullName(),
        title: getTitle(),
        date: getSignatureDate(),
        signatureImageUrl: ag?.signature || undefined, 
      },
  };

  const computedScheduleC: Partial<ScheduleC> = {
    bankName: agreement?.scheduleC?.bankName || bank.financialInstitution || "[Bank Not Provided]",
    nameOnAccount: agreement?.scheduleC?.nameOnAccount || bank.nameOnAccount || business.legalNameOfBusiness || "[Account Name Not Provided]",
    // Keep the masked fields for UI or other uses, but also surface raw values for the
    // generated agreement PDF/preview per product requirement (do not mask in document).
    routingNumber: agreement?.scheduleC?.routingNumber || bank.routingNumber || "[Routing Number Not Provided]",
    accountNumber: agreement?.scheduleC?.accountNumber || bank.accountNumber || "[Account Number Not Provided]",
    routingNumberMasked: agreement?.scheduleC?.routingNumberMasked || maskNumber(bank.routingNumber) || "[Routing Number Not Provided]",
    accountNumberMasked: agreement?.scheduleC?.accountNumberMasked || maskNumber(bank.accountNumber) || "[Account Number Not Provided]",
    merchantSigner: agreement?.scheduleC?.merchantSigner || {
      signedBy: getFullName(),
      printedName: getFullName(),
      title: getTitle(),
      date: getSignatureDate(),
      signatureImageUrl: ag?.signature || undefined, 
    },
  };

  // Build scheduleB from active payment configuration (if available)
  const computedScheduleB: Partial<ScheduleB> = (paymentConfig?.feePercentage != null && paymentConfig?.minimumFee != null)
    ? {
        transactionProcessingFeeRule: `${paymentConfig.feePercentage}% of the Gross Sale amount ($${paymentConfig.minimumFee.toFixed(2)} minimum)`,
        surchargeRule: `Up to the Transaction Processing Fee amount, subject to State law (e.g., 2% maximum in Colorado)`,
        feeRows: [
          { label: "Credit Card Surcharge", payer: "Consumer", amountOrRule: `Up to ${paymentConfig.feePercentage}% (state caps apply)` },
          { label: "Transaction Processing Fee", payer: "Merchant", amountOrRule: `${paymentConfig.feePercentage}% ($${paymentConfig.minimumFee.toFixed(2)} minimum)` },
        ],
      }
    : {};

  // Build the final agreement data object used by the template. Priority: explicit prop -> merchant context -> example data
  const agreementData: AgreementData = {
    ...exampleData,
    ...(agreement || {}),
    parties: {
      ...exampleData.parties,
      ...(agreement?.parties || {}),
      ...computedParties,
      jvcSignature: {
        signatureImageUrl: jvcLogo,
        signedBy: "Richard Snelling",
        printedName: "Richard Snelling",
        title: "COO",
        date: new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(new Date()),
      },
    },
    scheduleA: {
      ...exampleData.scheduleA,
      ...(agreement?.scheduleA || {}),
      ...computedScheduleA,
      jvcSigner: {
        signedBy: "Richard Snelling",
        printedName: "Richard Snelling",
        title: "COO",
        date: new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(new Date()),
      },
    },
    scheduleB: {
      ...exampleData.scheduleB,
      ...(agreement?.scheduleB || {}),
      ...computedScheduleB,
    },
    scheduleC: {
      ...exampleData.scheduleC,
      ...(agreement?.scheduleC || {}),
      ...computedScheduleC,
    },
  };

  const parties = agreementData.parties;
  const jvcName = `Joint Venture Card of ${business?.state}, LLC.`;
  const jvcDba = 'd/b/a "JVC" and "Joint Venture Card"';
  const governingLaw = "Nevada";
  const arbVenue =
    "U.S. District Court for the Western District of Nevada, Las Vegas, NV";

  React.useEffect(() => {
    if (!isLoading) {
      document.body.dataset.pdfReady = 'true';
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agreement preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* PAGE 1 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">JVC Merchant Agreement</h2>
              <p className="text-xs text-gray-500">
                Effective Date: {parties.effectiveDate || "—"}
              </p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6 text-sm leading-relaxed">
              <Line>
                This JVC Merchant Agreement (“Agreement”), after execution by the Parties, shall be
                effective as of the Effective Date shown above. This Agreement is by and between:
                (i) the entity identified below as the Merchant (“Merchant”); and (ii) {jvcName}{" "}
                {jvcDba}. Any reference to a “Party” shall mean either Merchant or Joint Venture
                Card, individually. Any reference to the “Parties” shall mean both Merchant and
                Joint Venture Card, collectively.
              </Line>

              <ul className="list-disc ml-6 space-y-2">
                <li>the following Terms of Service, including the Glossary of Terms in Exhibit “A”;</li>
                <li>the Designation of Notice Address in Schedule "A”;</li>
                <li>the Schedule of Fees and Charges in Schedule "B”;</li>
                <li>the Deposit Account ACH Authorization in Schedule "C”;</li>
                <li>the Information Privacy and Security Schedule in Schedule "D”;</li>
                <li>the Rewards Program Terms in Schedule "E”;</li>
                <li>the Merchant Operating Guide.</li>
              </ul>

              <Line>
                The person signing on behalf of Merchant below represents and warrants that he or
                she is duly authorized by Merchant to bind Merchant to this Agreement.
              </Line>

              {/* Signature summary block */}
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Merchant</p>
                    <p className="font-medium">
                      {parties.merchantLegalName}
                      {parties.merchantEntityDescriptor ? `, ${parties.merchantEntityDescriptor}` : ""}
                    </p>
                    <SigBlock heading="Merchant Authorized Signer" sig={parties.merchantSignature} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Joint Venture Card</p>
                    <p className="font-medium">
                      {jvcName} {jvcDba}
                    </p>
                    <SigBlock heading="JVC Authorized Signer" sig={parties.jvcSignature} />
                  </div>
                </div>
              </div>
</div>
</div></Card>
     <PageBreak label="Page 2" />

<Card className="bg-white p-8">
  <div className="prose prose-lg max-w-none">
    <div className="space-y-6 text-sm leading-relaxed">
      <h3 className="text-lg font-semibold text-gray-900 mt-0 mb-4">Terms of Service</h3>

      <SectionHeader>1. Definitions</SectionHeader>
      <Line>
        Capitalized terms used in the Agreement that are not defined above are generally defined by
        the Glossary of Terms in Exhibit "A" to the Terms of Service or in the context of their first
        use in the Agreement. Any reference to a "Section" of any part of the Agreement includes all
        sub-sections in the referenced section, except when only a particular sub-section is
        specified. The word "day" means a calendar day, unless the Agreement uses a defined term,
        such as Business Day, or specifically states otherwise.
      </Line>

      <SectionHeader>2. Scope and Purpose of Agreement</SectionHeader>
      <Line>
        Merchant understands that Joint Venture Card provides Accounts and issues Cards for the
        Program. Merchant has requested that Joint Venture Card make Program financing and features
        available to Customers who want to purchase goods and services from Merchant, if those
        Customers request and qualify for an Account based on the Program criteria, including the
        credit criteria established from time to time by Joint Venture Card. Merchant shall not
        assume Account credit and default risks on behalf of any Cardholder, but Merchant shall
        remain subject to all terms, conditions, representations, warranties, covenants, and duties
        that apply to Merchant pursuant to the Agreement, including the Merchant Operating Guide.
        Joint Venture Card has agreed to make the Program available to Merchant and its qualifying
        Customers, subject to the terms and conditions of the Agreement.
      </Line>

      <SectionHeader>3. Program Marketing and Account Forms</SectionHeader>
      <Line>
        During the term of the Agreement, Joint Venture Card will make available to Merchant the
        Joint Venture Card Merchant App and Program marketing, and other Account and Program
        documents expressly approved for use by Joint Venture Card. Merchant understands and agrees
        that Joint Venture Card may change the app and marketing from time to time at their sole
        discretion and expense, after giving reasonable advance notice of the change to Merchant.
        During the term of the Agreement, Merchant may not display or use any form of Applications,
        Charge Slips, Credit Slips, Program marketing, Account Agreements, or any other documents
        that describe the cost, availability, or features of Cards and Accounts, other than the
        then-current versions that have been prepared or expressly approved by Joint Venture Card.
        Merchant must not display or use any Program, Application and Account forms after the
        termination of the Agreement. Merchant agrees to pay Joint Venture Card for any additional
        costs it requires to: (a) prepare or approve any non-standard or customized form of any such
        documents at Merchant's request, including any materials intended to advertise or promote the
        Program and Account use; and (b) provide any such Program or Account documents in any
        non-standard or customized manner or amount at Merchant's express request.
      </Line>
    </div>
  </div>
</Card>


        <PageBreak label="Page 3" />

        {/* PAGE 2 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <SectionHeader>4. Applications, Account Origination, and Account Use</SectionHeader>
              <Line>
                The only credit applications that Joint Venture Card will accept from Merchant are the
                Applications submitted using forms and channels approved for use in connection with the
                Program, which allow Applicants to request the open-end, consumer-purpose Accounts
                available through the Program. Merchant must comply with all provisions in the Merchant
                Operating Guide that relate to the acceptance, submission and transmission of
                Applications, Charge Slips, Credit Slips, and other Program documents and information.
                Merchant may not participate in any way in the credit decisions made with respect to any
                Application or Account. Nothing in this Agreement requires that Joint Venture Card take
                any particular action at Merchant's request with respect to approving any Application,
                authorizing use of any Account, making Account credit available to any Cardholder, or
                servicing and collecting amounts due in connection with the Accounts.
              </Line>

              <SectionHeader>5. Rights, Title, and Ownership of Accounts</SectionHeader>
              <Line>
                Joint Venture Card shall establish and initially own the Accounts and the associated
                Account credit risks, and any Account Confidential Information, subject to its right to
                retain service providers and transfer any part of its ownership, rights, and title in
                such Accounts to others. Merchant understands and agrees that it shall not hold any
                ownership, rights, title, or interest in the Accounts, or any Customer receivable
                evidenced by a Charge Slip acquired from Merchant pursuant to the Agreement, except to
                the extent Merchant acquires such rights in a Customer receivable back after processing
                of a Chargeback in accordance with the Agreement.
              </Line>

              <SectionHeader>6. Promotional Terms, Additional Services, Program Enhancements</SectionHeader>
              <Line>
                From time to time, the Parties may agree on certain Promotional Offerings intended to
                promote the use and availability of Accounts and related Program services and
                enhancements to Customers, Applicants, and Cardholders. Schedule "X" to the Agreement
                describes the Promotional Offerings that the Parties have agreed to make available as of
                the Effective Date, including any compensation that may be due from Merchant or unique
                terms that Joint Venture Card may require as a condition of providing certain Promotional
                Offerings.
              </Line>

              <SectionHeader>7. Chargebacks</SectionHeader>
              <Line>
                Contemporaneously with each Cardholder Purchase, a contingent and un-matured claim for
                Chargeback accrues against Merchant and in favor of Joint Venture Card to the extent
                Joint Venture Card is required, or exercises its right, to pay any fees, discounts,
                customer credits and adjustments, charges, fines, assessments, penalties or other items,
                as more fully described and incorporated herein by the Merchant Operating Guide which may
                in turn be charged back to Merchant or Joint Venture Card. Merchant agrees that it is
                fully liable to Joint Venture Card. Merchant agrees to accept for Chargeback, and agrees
                to be liable to Joint Venture Card, for any such Chargeback. The Merchant Operating Guide
                describes the time and manner in which Merchant must respond to any Chargeback notice it
                receives from Joint Venture Card.
              </Line>
              <Line>
                For payment of any Chargeback, Merchant agrees that Joint Venture Card is authorized to
                offset from incoming transactions and to debit via transfer or to debit Merchant's
                Transaction Processing Account for any such amount. Merchant understands and agrees that
                Joint Venture Card may terminate the Agreement, require establishment of a Reserve
                Account, or pursue other rights and remedies in the time and manner authorized by the
                Agreement or Applicable Law, in the event of Excessive Chargebacks. Merchant agrees to
                accept any Chargeback where the Cardholder disputes the validity of the Transaction
                according to the Rules.
              </Line>

              <SectionHeader>8. Rewards Program</SectionHeader>
              <Line>
                Merchant understands and agrees to participate in and support the Cardholder Rewards
                Program, as further specified in Schedule E.
              </Line>

              <SectionHeader>9. Merchant Representations and Warranties</SectionHeader>
              <Line>
                Merchant represents and warrants to Joint Venture Card, as of the Effective Date of the
                Agreement and throughout its term, the following:
              </Line>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  That each Application that any Applicant makes through Merchant shall be valid,
                  authorized and made by the persons identified as Applicants by any such Application;
                </li>
                <li>
                  That each Card Sale, Charge Slip, and each use of a Card and Account, shall arise only
                  from a bona fide sale of Goods and Services by Merchant to a Cardholder in only the
                  amount authorized by the Cardholder;
                </li>
                <li>
                  That each Card Sale shall be made to a Cardholder only for his or her personal, family
                  or household purposes, and not any business or commercial purposes;
                </li>
                <li>
                  That Merchant shall obtain an Authorization number from the Authorization before
                  submitting any Charge Slip or attempting to complete any Card Sale. If Authorization is
                  denied, Merchant shall not complete the Transaction;
                </li>
                <li>
                  That each Charge Slip, Credit Slip, and other Card Sale and Account documents shall be
                  prepared and submitted to Joint Venture Card in the time and manner required by the
                  Agreement, including the Merchant Operating Guide;
                </li>
                <li>
                  That all information provided in or with the Merchant Application is true, correct, and
                  complete, and properly reflects the business, financial condition, and ownership of
                  Merchant;
                </li>
                <li>
                  That all information provided by Merchant or its designees before and after the
                  Effective Date about Merchant's business, financial condition, and ownership, is true,
                  correct, and complete as of the date provided; and
                </li>
                <li>
                  That Merchant has and shall maintain all required licenses, registrations, bonds, and
                  insurances needed to conduct its business and perform its obligations under this
                  Agreement.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <PageBreak label="Page 4" />

        {/* PAGE 3 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <SectionHeader>10. Merchant Covenants</SectionHeader>
              <Line>Merchant agrees:</Line>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  That Merchant shall comply with all duties and requirements established by the
                  Agreement, including but not limited to those established by the Merchant Operating
                  Guide;
                </li>
                <li>
                  Joint Venture Card may provide each other, their respective Affiliates, creditors,
                  financial services providers and potential investors, with information about the
                  Program, subject to the limitations and restrictions in the Information Privacy and
                  Security Schedule attached as Schedule "D" to the Agreement;
                </li>
                <li>
                  Merchant shall honor and accept all valid Cards and Accounts without discrimination,
                  when properly presented by Cardholders to pay for Merchant's Goods and Services;
                </li>
                <li>
                  Merchant shall not establish any minimum or maximum Credit card sale amount, unless
                  Merchant has obtained prior written approval to do so from Joint Venture Card;
                </li>
                <li>
                  Merchant shall not require that any Cardholder compensate Merchant in any manner for
                  any part of the fees, charges, discounts, expenses, or other amounts assessed to
                  Merchant by Joint Venture Card associated with the authorization of any Credit Card
                  Sale, whether through an increase in the cash price of Goods and Services, a surcharge,
                  convenience fee, or other additional or different fee or charge that causes an increase
                  to the cash price of the Goods and Services that Merchant assesses at the time of a
                  Card Sale as a result of any Cardholder's use or request to use a Card or Account,
                  except as expressly permitted by this Agreement and pursuant to applicable state law
                  governing the imposition of such charges;
                </li>
                <li>
                  That Merchant shall not make any oral or written statement to any Applicant or
                  prospective Applicant that would discourage a reasonable person from making or pursuing
                  an Application on the basis of race, color, religion, national origin, sex, marital
                  status, or age (provided the person has the capacity to enter into a binding contract),
                  or any other basis prohibited by Applicable Law;
                </li>
                <li>
                  That Merchant shall prominently display in any retail location area where credit
                  inquiries may occur, Program marketing materials and all related documents prepared or
                  expressly approved for use from time to time by Joint Venture Card, for purposes of
                  marketing the Program and describing the availability, use, and terms of the Cards and
                  Accounts;
                </li>
                <li>
                  That Merchant shall not change the type of business in which it engages, the types of
                  products and services it provides, the locations from which it conducts business, or
                  the manner in which it provides and sells such products and services, from those
                  Merchant described in its Merchant Application and Schedule "A" (Designation of Notice
                  Address), unless Merchant provides thirty (30) days advance notice of any such change
                  to Joint Venture Card and obtains its express written approval for any such change; and
                </li>
                <li>
                  That Merchant shall comply with all Applicable Laws that affect the manner in which
                  Merchant conducts its business, promotes and provides its Goods and Services, and
                  interacts with Customers, Applicants, and Cardholders.
                </li>
              </ul>

              <SectionHeader>11. Joint Venture Card Representations and Warranties</SectionHeader>
              <Line>
                Joint Venture Card represents and warrants to Merchant, as of the Effective Date of the
                Agreement and throughout its term, the following:
              </Line>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  That Applications shall be provided and made available to the public by Joint Venture
                  Card without regard to any person's race, color, religion, national origin, sex,
                  marital status, or age (provided the person has the capacity to enter into a binding
                  contract), or any other basis prohibited by Applicable Law;
                </li>
                <li>
                  That Joint Venture Card shall not make any oral or written statement to Applicants or
                  prospective Applicants that would discourage a reasonable person from making or
                  pursuing an Application, on the basis of race, color, religion, national origin, sex,
                  marital status, or age (provided the person has the capacity to enter into a binding
                  contract), or any other basis prohibited by Applicable Law;
                </li>
                <li>
                  That Joint Venture Card have and shall retain all required licenses, registrations,
                  bonds, and insurances needed to perform their obligations under this Agreement; and
                </li>
                <li>
                  That Joint Venture Card shall comply with all Applicable Laws that affect the manner in
                  which Joint Venture Card conducts its business, provides Account services, and
                  interacts with Customers, Applicants, and Cardholders.
                </li>
              </ul>

              <SectionHeader>12. Mutual Representations and Warranties</SectionHeader>
              <Line>
                Each Party represents and warrants to the other Party, as of the Effective Date of the
                Agreement and throughout its term, the following:
              </Line>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  That such Party has full corporate power and authority to enter into the Agreement, on
                  its own behalf and on behalf of any identified Affiliate;
                </li>
                <li>
                  That such Party has taken all corporate action required by any organizational documents
                  to make this Agreement binding and valid against the Party and any identified Affiliate
                  according to its terms;
                </li>
                <li>
                  That this Agreement is and shall be binding, valid, and enforceable against such Party
                  and any identified Affiliate according to its terms;
                </li>
                <li>
                  That the execution, delivery, and performance of the Agreement, and the consummation of
                  the transactions contemplated by the Agreement, shall not constitute a violation of
                  Applicable Law or a violation or default by such Party under its articles of
                  organization, articles of incorporation, by-laws or any other applicable formation or
                  governance documents, or under any debt instruments or other material agreement or
                  contract between such Party and any other entity or person;
                </li>
                <li>
                  That no authorization of any governmental authority is required in connection with the
                  performance by such Party of its obligations under the Agreement; and
                </li>
                <li>
                  That there are no proceedings or investigations pending, or to such Party's knowledge
                  threatened, before any court, regulatory body, administrative agency, or other tribunal
                  or governmental instrumentality having jurisdiction over such Party or its properties,
                  asserting the invalidity of this Agreement, seeking to prevent consummation of the
                  transactions contemplated by the Agreement, or which, individually or in the aggregate,
                  could reasonably be expected to have a material adverse effect on the such Party's
                  ability to perform its obligations under the Agreement.
                </li>
              </ul>

              <SectionHeader>13. Transaction Processing</SectionHeader>
              <Line>
                <strong>(a) Transaction Processing Account.</strong> Merchant shall establish and
                maintain a Transaction Processing Account with a depository institution authorized to
                participate in an automated clearing house ("ACH") and otherwise acceptable to Joint
                Venture Card. Merchant shall maintain sufficient funds in its Transaction Processing
                Account at all times to accommodate all Chargebacks, returns, refunds, adjustments, fees,
                and other payments and amounts that may be due from Merchant under the Agreement.
                Merchant shall regularly and promptly review all statements of account related to the
                Transaction Processing Account. Merchant agrees to immediately notify Joint Venture Card
                of any discrepancy between Merchant's records and those provide by Joint Venture Card or
                with respect to any transfer that Merchant believes was not authorized by Merchant or
                customer. If Merchant fails to notify Joint Venture Card in writing within 30 calendar
                dates after the date that Joint Venture Card mails (electronic deliver or paper) or
                provides a statement of account or other report to Merchant, Merchant will be solely
                responsibility for all losses or other costs associated with any erroneous or
                unauthorized transfer.
              </Line>
              <Line>
                <strong>(b) Payments To Acquire Charge Slips From Merchant; Provisional Credit.</strong>{" "}
                Any payment that Joint Venture Card makes to acquire a Charge Slip from Merchant shall be
                provisional and not a final payment, until Joint Venture Card determines that Merchant
                has complied with the terms and conditions in the Agreement and that Merchant is not in
                violation of any representation, warranty, or covenant it made in the Agreement. Merchant
                acknowledges that all credits for funds provided to it are provisional and subject to
                reversal if Joint Venture Card does not receive payment of corresponding settlement
                amounts from the Authorized Financial Institution. Merchant also acknowledges that all
                credits are subject to adjustments for inaccuracies and errors (including rejects) and
                Chargebacks in accordance with the Agreement, regardless of whether the Chargeback is
                initiated by Joint Venture Card, a Cardholder, or a Customer. Merchant authorizes Joint
                Venture Card to initiate reversal or adjustment (debit or credit) entries and to initiate
                or suspend such entries in accordance with the Agreement as may be necessary to grant or
                reverse provisional credit given for any transaction.
              </Line>
              <Line>
                <strong>(c) Collection of Amounts Due From Merchant; Chargebacks.</strong> Merchant
                authorizes Joint Venture Card, at its sole discretion, to use either: (i) a "direct
                debit" payment method to be compensated for any amounts that Joint Venture Card
                determines is owed by Merchant under the Agreement, based on Merchant's authorization for
                Joint Venture Card to initiate debit entries to Merchant's Transaction Processing Account
                or any Reserve Account that may be established; or (ii) a "net" payment method to be
                compensated for any amounts that Joint Venture Card determines is owed by Merchant under
                the Agreement, by deducting such amounts from any amounts that may otherwise be owed to
                Merchant under the Agreement for Charge Slips or otherwise. The amounts that Merchant
                owes pursuant to the Agreement include, but are not limited to, amounts due for
                Chargebacks and amounts due for fees, charges, and other amounts specified in the
                Schedule of Fees and Charges (Schedule "C"), the Promotional Offerings Schedule (Schedule
                "F"), and other applicable provisions of the Agreement.
              </Line>
              <Line>
                <strong>(d) Endorsement.</strong> The processing of Purchases from Cardholders is
                Merchant's agreement to sell and assign its right, title, and interest in each Purchase
                completed in conformity with Joint Venture Card's acceptance procedures, and shall
                constitute an endorsement by Merchant to Joint Venture Card of such Purchases. Merchant
                hereby authorizes Joint Venture Card to supply such endorsement on Merchant's behalf.
                Merchant agrees that this Agreement is a contract of financial accommodation within the
                meaning of the Bankruptcy Code, 11 USC Sec. 365, as amended from time to time.
              </Line>
            </div>
          </div>
        </Card>

        <PageBreak label="Page 5" />

        {/* PAGE 4 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <SectionHeader>14. Change in Ownership; Assignments</SectionHeader>
              <Line>
                This Agreement may not be assigned or transferred by Merchant, directly or by operation
                of law, except with the prior express written consent of Joint Venture Card. If, despite
                this prohibition, Merchant assigns this Agreement without the express consent of Joint
                Venture Card, then: (a) the Agreement shall be binding on any such assignee of Merchant;
                and (b) Merchant and any guarantors of Merchant shall remain liable for any nonperformance
                by any such assignee of Merchant. Merchant must send Joint Venture Card at least thirty
                (30) days prior written notice of any change in the name(s) and location(s) of Merchant
                and any identified Merchant Affiliate, any material change in ownership of Merchant's
                business, or any change in Charge Slip information concerning Merchant and any identified
                Merchant Affiliate. Merchant understands that Joint Venture Card has contracted with, or
                may contract with, more than one Authorized Financial Institution, and that an Authorized
                Financial Institution may succeed or otherwise take the place of another Authorized
                Financial Institution during and after the term of the Agreement. This Agreement shall
                cover all Accounts issued by any Authorized Financial Institution for the Program and the
                receivables generated by all such Accounts. Merchant understands and agrees that Joint
                Venture Card and any Authorized Financial Institution may assign their rights and/or
                delegate their duties under this Agreement at any time and without advance notice to
                Merchant.
              </Line>

              <SectionHeader>15. Indemnification</SectionHeader>
              <Line>
                <strong>(a) Indemnification by Merchant.</strong> Merchant shall be liable to and shall
                indemnify and hold harmless Joint Venture Card, the Authorized Financial Institution,
                their respective Affiliates associated with the Program, and their respective officers,
                employees, agents and directors from any losses, damages, claims or complaints incurred
                by Joint Venture Card, the Authorized Financial Institution, any of their respective
                Affiliates, or their respective officers, employees, agents and directors arising out of:
                (i) Merchant's failure to comply with this Agreement, including the Merchant Operating
                Guide and any Schedule to the Agreement; (ii) any claim, dispute, complaint or setoff
                made by a Cardholder in good faith with respect to anything done or not done by Merchant
                in connection with Card Sales or Credit Slips that constitutes a violation of a duty or
                promise by Merchant; (iii) anything done or not done by Merchant in connection with the
                furnishing of any Goods and Services purchased by Cardholders that constitutes a
                violation of a duty or promise by Merchant; (iv) the death or injury to any person or the
                loss, destruction or damage to any property arising out of the design, manufacture or
                furnishing by Merchant of any Goods and Services purchased by Cardholders; (v) any claim
                or complaint of a third party in connection with Merchant's advertisements and promotions
                relating to the Card which have not been reviewed or approved by Joint Venture Card; (vi)
                any illegal or improper conduct of Merchant or its employees or agents; and (vii) any
                claim or complaint by a consumer that Merchant has violated any Applicable Law, including
                but not limited to the Equal Credit Opportunity Act and the Truth in Lending Act.
              </Line>
              <Line>
                <strong>(b) Indemnification by Joint Venture Card.</strong> Joint Venture Card shall be
                liable to and shall indemnify and hold harmless Merchant and its identified Affiliates
                and their respective officers, employees, agents and directors from any losses, damages,
                claims or complaints incurred by Merchant or any of its Affiliates or their respective
                officers, employees, agents and directors, arising out of: (i) Joint Venture Card's
                failure to comply with this Agreement; (ii) any claim, dispute or complaint by a
                Cardholder made in good faith resulting from anything done or not done by Joint Venture
                Card in connection with such Cardholder's Account; (iii) any illegal or improper conduct
                of Joint Venture Card, its Affiliates, or their respective employees or agents with
                respect to the Card, a Card Sale, an Account or any other matters relating to the
                Program; (iv) any claim, dispute, complaint or setoff by a consumer made in good faith
                resulting from a violation by Joint Venture Card, with respect to the Application or
                Account agreement, of the Equal Credit Opportunity Act, Truth in Lending Act or any other
                related Applicable Laws; and (v) any claim, dispute or complaint of any thirty party made
                in good faith in connection with advertisements and promotions prepared by Joint Venture
                Card relating to the Card.
              </Line>
              <Line>
                <strong>(c) Notice of Claim & Survival.</strong> In the event that Joint Venture Card or
                Merchant shall receive any claim or demand or be subject to any suit or proceeding of
                which a claim may be made against the other under this Section, the Party seeking
                indemnification shall give prompt written notice thereof to the indemnifying Party, and
                the indemnifying Party will be entitled to participate in the settlement or defense
                thereof with counsel satisfactory to indemnified Party at the indemnifying Party's
                expense. In any case, the indemnifying Party and the indemnified Party shall cooperate
                (at no cost to the indemnified Party) in the settlement or defense of any such claim,
                demand, suit, or proceeding. The terms of this Section shall survive the termination of
                this Agreement.
              </Line>

              <SectionHeader>16. Term and Termination</SectionHeader>
              <Line>
                <strong>(a) Term.</strong> This Agreement shall be effective as of the Effective Date and
                shall remain in effect for one (1) year ("Initial Term"), subject to earlier termination
                as set forth below. After that, this Agreement shall be automatically renewed for
                successive one year terms (each, a "Renewal Term") unless and until terminated as
                provided in the Agreement.
              </Line>
              <Line>
                <strong>(b) Termination of Agreement.</strong> This Agreement shall continue until
                terminated by either Party by giving the other Party not less than thirty (30) days
                advance written notice as required by the Agreement. Each Party's obligations on Charge
                Slips and Card Sales that Joint Venture Card authorizes or funds before the effective
                date of the termination shall survive such termination. The acceptance of Charge Slips
                and Card Sales after such notice shall be at the sole discretion of Joint Venture Card on
                a case by case basis. Termination of this Agreement by either Party does not relieve
                Merchant or Joint Venture Card from obligations that either Party incurred by Joint
                Venture Card's acceptance of Charge Slips before receipt of notice.
              </Line>
            </div>
          </div>
        </Card>

        <PageBreak label="Page 6" />

        {/* PAGE 5 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <Line>
                Joint Venture Card also reserves the right to terminate this Agreement immediately in the
                event of substantive non-performance or conflict. Reasons for immediate termination
                include but are not limited to: (i) Excessive Chargebacks; (ii) Merchant's failure to pay
                Joint Venture Card any undisputed amount Merchant owes under the Agreement; (iii)
                Merchant's failure to communicate with Joint Venture Card in the time and manner required
                by the Agreement; (iv) Merchant's misrepresentation to Joint Venture Card of the goods
                and services provided and performed by Merchant; (v) fraud, bankruptcy, sale or
                significant changes to the Merchant's organizational structure; (vi) Merchant's failure
                to maintain sufficient funds in the Transaction Processing Account; (vii) Merchant's
                closure of the Transaction Processing Account; or (vii) Merchant's cancellation of the
                authority for Joint Venture Card to initiate debit and credit entries to the Transaction
                Processing Account as provided in the Agreement.
              </Line>
              <Line>
                <strong>(c) Termination of Card Acceptance and/or Agreement.</strong> Joint Venture Card,
                upon notice to Merchant, may elect to terminate the acceptance of Cards and/or Accounts
                at one or more Merchant locations, if Joint Venture Card determines there are Excessive
                Chargebacks or high fraudulent activity levels at such locations, or other business
                conduct that may be injurious to the Program or the business relationship between the
                Parties. In addition, Joint Venture Card may terminate this Agreement upon fifteen (15)
                days prior notice to Merchant if the termination of a particular Merchant location
                materially affect(s) the volume of Card Sales generated by Merchant.
              </Line>
              <Line>
                <strong>(d) Duties and Rights Upon Termination.</strong> All rights and duties of a Party
                related to Card Sales and Charge Slips processed before termination, including related
                Rewards Program liabilities, shall survive termination. Joint Venture Card may place
                funds for Card Sales and Charge Slips processed before termination in a Reserve Account,
                until Merchant pays all amounts it owes Joint Venture Card or for which Merchant is
                liable under the Agreement. Merchant must maintain sufficient funds in the Transaction
                Processing Account after termination to cover all Chargebacks, returns, adjustments,
                fees, charges, and other amounts due under the Agreement for a reasonable time, but in
                any event, not less than one hundred eighty (180) days after termination. Upon
                termination of this Agreement, Merchant will promptly submit to Joint Venture Card all
                Card Sales, Charge Slips, credits and other data made through the date of termination.
                Neither Party shall be liable to the other Party for any direct or indirect damages that
                either Party may suffer as a result of any rightful termination of this Agreement in
                accordance with the terms of this Agreement.
              </Line>

              <SectionHeader>17. Miscellaneous Provisions</SectionHeader>
              <Line>
                <strong>(a) Limitation of Liability; Disclaimer of Warranties.</strong> In no event shall
                either Party, or its agents, officers, directors, or employees be liable to the other
                Party, for indirect, exemplary, punitive, special, or consequential damages. EXCEPT AS
                OTHERWISE EXPRESSLY PROVIDED IN THE AGREEMENT, JOINT VENTURE CARD MAKES NO WARRANTIES,
                EXPRESS OR IMPLIED, REGARDING THE TRANSACTION PROCESSING SERVICES AND NOTHING CONTAINED
                IN THE AGREEMENT SHALL CONSTITUTE SUCH A WARRANTY. JOINT VENTURE CARD EXPRESSLY DISCLAIM
                ALL IMPLIED WARRANTIES, INCLUDING THOSE OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
                PURPOSE, TO THE EXTENT ALLOWED BY APPLICABLE LAW.
              </Line>
              <Line>
                <strong>(b) Fraud Monitoring.</strong> Merchant is solely responsible for monitoring its
                own Card Sales and Account transactions for purposes of detecting fraudulent or
                suspicious activity. Joint Venture Card are under no duty to monitor Merchant's Card
                Sales and Account transactions for such fraudulent or suspicious activity.
              </Line>
              <Line>
                <strong>(c) Audit Rights.</strong> If Joint Venture Card reasonably suspect that they may
                be subject to a financial or reputational risk due to Merchant's actions or omissions,
                Merchant authorizes Joint Venture Card and/ to perform an audit or inspection of
                Merchant's operations and records to confirm compliance with the Agreement, upon
                reasonable advance notice to Merchant and at the expense of Joint Venture Card. Merchant
                agrees to cooperate, in good faith, with any such audit conducted by Joint Venture Card.
              </Line>
              <Line>
                <strong>(d) Taxes.</strong> Merchant must pay all taxes and other charges imposed by any
                governmental authority on the Goods and Services provided by Merchant, excluding income
                taxes attributable to Joint Venture Card and/. If Merchant is a tax-exempt entity,
                Merchant agrees to provide Joint Venture Card with an appropriate certificate of tax
                exemption.
              </Line>
              <Line>
                <strong>(e) Relationship of Parties.</strong> In performing their respective duties
                pursuant to the Agreement, Joint Venture Card and Merchant are in the position of
                independent contractors. In no circumstances shall either Party be deemed to be the agent
                or employee of the other Party. This Agreement is not intended to create, does not
                create, and shall not be construed to create, a relationship of partner or joint venturer
                or an association for profit between Joint Venture Card and Merchant. Any amounts ever
                owing by Merchant pursuant to this Agreement represent contractual obligations only and
                are not a loan or debt.
              </Line>
              <Line>
                <strong>(f) Force Majeure.</strong> Neither Party shall be liable to the other Party by
                reason of any failure in performance of this Agreement in accordance with its terms, if
                such failure arises out of a cause beyond the control and without the fault or negligence
                of such Party. Such causes may include but are not limited to acts of God, a public
                enemy, or of civil or military authority, unavailability of energy resources, system or
                communication failure, delay in transportation, fires, strikes, riots or war. In the
                event of any force majeure event, the disabled Party shall use its best efforts to meet
                its obligations as set forth in this Agreement.
              </Line>
            </div>
          </div>
        </Card>

        <PageBreak label="Page 7" />

        {/* PAGE 6 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <Line>
                <strong>(g) Limited License; Marks.</strong> Merchant may not display or use any name,
                logo, service mark or trade mark of Joint Venture Card or its Affiliates, including but
                not limited to "The Joint Venture Card" in any manner without the prior express written
                consent of Joint Venture Card. Merchant may display and use, during the term of the
                Agreement, the form of Applications, Credit Sales, Program marketing, documents that
                describe the cost and availability of Cards and Accounts, and other Account and Program
                documents that have been expressly approved for use by Joint Venture Card, without
                violating the limitations in this Section. Merchant authorizes Joint Venture Card, for
                purposes of this Agreement, to use and display Merchant's name, logo, trademarks, service
                marks, and any other proprietary designations ("Merchant Proprietary Materials") on
                Cards, Applications, periodic statements, collection letters or documents, promotional or
                advertising materials and otherwise in connection with the Program, subject to Merchant's
                periodic reasonable review of such use and reasonable specifications of Merchant.
                Merchant represents and warrants that it maintains all appropriate federal and/or state
                registrations of trademarks and service marks needed to protect its interest in the use
                and ownership of the Merchant Proprietary Materials. Merchant shall, indemnify, defend
                and hold Joint Venture Card harmless from any loss, damage, expense or liability arising
                from any claims of alleged infringement of the Merchant Proprietary Materials (including
                attorneys' fees and costs).
              </Line>
              <Line>
                <strong>(h) Additional Products and Services.</strong> Except as may be restricted by
                Applicable Law or a binding contract between Joint Venture Card and a person or entity
                other than Merchant, Merchant understands and agrees that Joint Venture Card, the
                Authorized Financial Institution, and/or any of their respective Affiliates may solicit
                Cardholders at any time for other financial products and services available through Joint
                Venture Card, the Authorized Financial Institution, or their respective Affiliates
                (including but not limited to financial accounts, payment cards, insurance), during and
                after the term of this Agreement and regardless of whether Accounts are owned and/or
                serviced by Joint Venture Card.
              </Line>
              <Line>
                <strong>(i) Notices.</strong> All notices required or permitted by this Agreement must be
                in writing and sent to the respective Parties at the addresses set forth in the
                Agreement. Notices to Merchant and any identified Merchant Affiliate may be sent to the
                address shown in the Designation of Merchant, Merchant Affiliates, and Notice Addresses,
                attached as Schedule "A," as may be amended from time to time in accordance with its
                terms. Said notices, when sent to the referenced addresses, shall be deemed to be
                received: (i) three (3) Business Days after deposit in the U.S. first class mail with
                postage prepaid; (ii) as of the date of any personal delivery; or (iii) as of any
                confirmed receipt by telex, facsimile, or overnight/express courier service or certified
                mail.
              </Line>
              <Line>
                <strong>(j) Amendments.</strong> Any amendment or modification to the Agreement must be
                in writing and signed by a duly authorized officer of Joint Venture Card and Merchant to
                be effective and binding on the Parties, except as otherwise provided in the Agreement,
                including any applicable Schedule to the Agreement. No oral amendments or modifications
                shall be binding upon the Parties. Any alteration or strike-through in the text of the
                preprinted Terms of Service or any preprinted part of the Agreement will have no binding
                effect and will not be deemed an amendment of the Agreement.
              </Line>
              <Line>
                <strong>(k) Counterparts.</strong> The Agreement may be signed in one or more
                counterparts, each of which shall constitute an original and all of which, taken
                together, shall constitute one and the same agreement.
              </Line>
              <Line>
                <strong>(l) Nonwaiver and Extensions.</strong> Neither Party shall be deemed to have
                waived any rights or remedies under the Agreement by any act, delay, omission, or
                otherwise, unless any such waiver is in a writing signed by a duly authorized officer of
                the waiving Party. Each Party agrees that the other Party's failure to enforce any of its
                rights under this Agreement shall not amend the Agreement or affect any other right of
                such Party, or the same right in any other instance.
              </Line>
              <Line>
                <strong>(m) Third-Party Beneficiaries.</strong> The Authorized Financial Institution is a
                third party beneficiary of the rights held by Joint Venture Card pursuant to the
                Agreement. This Agreement shall not create any rights on the part of any person or entity
                other than the Parties, whether as a third party beneficiary or otherwise.
              </Line>
              <Line>
                <strong>(n) Rules of Construction.</strong> All terms using the singular form in the
                Agreement shall also include their plural form and vice versa. The terms of a Schedule
                shall be superior to and control over any conflicting or inconsistent terms that may be
                contained in the Terms of Service. The Section headings in the Agreement are for
                reference only. The Section headings are not a substantive part of the Agreement, and are
                not to be used to affect the validity, construction or interpretation of this Agreement
                or any of its provisions. The language used in the Agreement shall be deemed to be
                language chosen by both Parties to express their mutual intent and no rule of strict
                construction may be applied against any Party.
              </Line>
              <Line>
                <strong>(o) Integration; Entire Agreement.</strong> This Agreement contains the entire
                agreement between the Parties. There are merged in the Agreement all prior oral or
                written agreements, amendments, representations, promises and conditions in connection
                with the subject matter of the Agreement. Any representations, warranties, promises or
                conditions not expressly incorporated in the Agreement shall not be binding on Joint
                Venture Card or Merchant.
              </Line>
              <Line>
                <strong>(p) Governing Law; Severability.</strong> This Agreement shall be governed by and
                construed in accordance with the laws of the State of {governingLaw}. If any provision of
                this Agreement is determined by a court or arbitrator of competent jurisdiction to be
                invalid, unenforceable, or contrary to Applicable Law, then any such determination shall
                not affect any of the remaining provisions of the Agreement and the Agreement shall be
                construed as if the offending provision is not contained in the Agreement.
              </Line>
            </div>
          </div>
        </Card>

        <PageBreak label="Page 8" />

        {/* PAGE 7 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <Line>
                <strong>(q) Bankruptcy.</strong> Merchant must notify Joint Venture Card of any
                bankruptcy, receivership, insolvency or similar action or proceeding initiated by or
                against Merchant or any of its guarantors. Merchant must include Joint Venture Card on
                the list and matrix of creditors as filed with the Bankruptcy Court, regardless of
                whether Merchant has verified the existence and/or final amount of any such claim at the
                time of filing. Merchant's failure to do so will be cause for immediate termination of
                the Agreement and any other action available to Joint Venture Card under the Agreement or
                Applicable Law.
              </Line>
              <Line>
                <strong>(r) Survival.</strong> The following Sections of the Terms of Service and the
                following Schedules shall survive termination of the Agreement: Terms of Service Sections
                3; 5; 6; 7; 8; 9; 10; 11; 12; 14; 15(d); and 18; Schedules "A," "C," "D," "E," and "F";
                and, if checked and made applicable by page 1 of the Agreement, Schedules "G" and "H."
              </Line>
              <Line>
                <strong>(s) Responsibility For Employees and Agents.</strong> Merchant agrees that it is
                fully responsible and liable to Joint Venture Card under the Agreement for any action,
                omission, violation, or failure to comply by any person or entity that is an employee or
                agent of Merchant or its Affiliates.
              </Line>
              <Line>
                <strong>(t) JURISDICTION AND VENUE.</strong> ANY SUIT, COUNTERCLAIM, ACTION OR PROCEEDING
                ARISING OUT OF OR RELATING TO THIS AGREEMENT MUST BE BROUGHT BY EITHER PARTY IN THE
                COURTS OF THE STATE OF {governingLaw.toUpperCase()}. MERCHANT HEREBY IRREVOCABLY SUBMITS
                TO THE EXCLUSIVE JURISDICTION OF SUCH COURTS AND ANY APPELLATE COURTS THEREOF FOR THE
                PURPOSE OF ANY SUCH SUIT, COUNTERCLAIM, ACTION, PROCEEDING OR JUDGMENT, IT BEING
                UNDERSTOOD THAT SUCH CONSENT TO THE EXCLUSIVE JURISDICTION OF SUCH COURTS WAIVES ANY
                RIGHT TO SUBMIT ANY DISPUTES HEREUNDER TO ANY COURTS OTHER THAN THOSE ABOVE.
              </Line>

              <SectionHeader>18. Arbitration</SectionHeader>
              <Line>
                <strong>(a) Mandatory Arbitration.</strong> Any Dispute of any kind shall, at the
                election of either Party, be resolved by a neutral, binding arbitration and not by a
                court of law, except as otherwise stated in the Agreement. This procedure includes any
                Dispute of any kind over the interpretation, scope, or validity of the Agreement, this
                arbitration provision, or the arbitrability of any issue, with the sole exception of the
                Parties' waiver of any right to bring a class action or participate in a class action as
                provided for in this Section, which shall be solely determined by the appropriate court,
                if necessary.
              </Line>
              <Line>
                <strong>(b) Rules; Fee and Costs.</strong> Except as otherwise provided in this Section,
                any arbitration must be administered by the Commercial Arbitration Rules of the American
                Arbitration Association ("AAA"). The AAA Rules may be obtained by mail from 1633
                Broadway, 10th Floor, New York, NY 10019; by telephone at #800-778-7879; or on the
                Internet at www.adr.org. If the AAA is unable or unwilling to serve as an arbitration
                administrator and the Parties cannot agree on a substitute, then a substitute
                administrator and/or arbitrator will be appointed in accordance with the Federal
                Arbitration Act (9 U.S.C. § 1 et seq.). The arbitration will be conducted under the
                applicable AAA Rules or the applicable rules of any substitute administrator in effect on
                the date the arbitration begins, unless those rules are inconsistent with the arbitration
                provisions of this Agreement, in which case the arbitration provisions in this Section
                shall govern. In any arbitration, the arbitrator must apply all applicable laws and the
                arbitration provisions in this Section in deciding any Dispute. Unless the applicable
                arbitration rules require otherwise, the arbitration award shall be issued without a
                written opinion.
              </Line>
              <Line>
                The arbitration hearing shall be conducted in the federal judicial district where Joint
                Venture Card accepted and executed this Agreement ({arbVenue}). Fees and costs shall be
                paid and allocated in accordance with the procedures and rules of the applicable
                arbitration administrator.
              </Line>
              <Line>
                <strong>(c) Standards and Law.</strong> The Parties agree that the Agreement involves
                interstate commerce and that the arbitration provisions of the Agreement shall be
                governed by the Federal Arbitration Act, 9 U.S.C. § 1 et seq., as may be amended ("FAA").
                The arbitrator shall strictly apply all applicable substantive law and applicable
                statutes of limitation that are consistent with the FAA and shall honor claims of
                privilege recognized at law. Judgment on any arbitrator's award may be entered by any
                court having competent jurisdiction.
              </Line>
              <Line>
                <strong>(d) Waiver of Jury Trials, Class Actions, and Punitive Damages.</strong> The
                Parties agree to give up their respective rights to a trial by jury. The Parties also
                agree to give up any right they may have to bring a class action lawsuit or class
                arbitration or to participate in either as a claimant. The Parties agree to give up any
                right to consolidate or join any arbitration proceeding with the arbitration of others.
                The Parties give up the right to serve as a private attorney general in any jurisdiction
                in which such procedure may be permitted. The Parties waive any right to seek or recover
                punitive damages in any Dispute. No arbitrator shall have the power or authority to award
                punitive damages.
              </Line>
              <Line>
                <strong>(e) Self-Help.</strong> Notwithstanding the arbitration provisions in this
                Section, the Parties retain the right to exercise self-help remedies and to seek
                provisional remedies from a court, pending final determination of the Dispute by the
                arbitrator. No Party waives the right to elect arbitration of a Dispute by exercising
                self-help remedies, filing suit, or seeking or obtaining provisional remedies from a
                court.
              </Line>
              <Line>
                <strong>(f) Survival of Arbitration Agreement.</strong> The arbitration provisions in
                this Section shall survive and continue in full force and effect, regardless of any
                cancellation, termination, amendment, payment in full, discharge in bankruptcy, or other
                expiration or conclusion of the Agreement or any other contract or transaction between
                the Parties, unless otherwise agreed in writing. In addition, Merchant understands and
                agrees that the rights and responsibilities afforded to Joint Venture Card under the
                arbitration provisions in this Section shall survive any assignment of the Agreement by
                Joint Venture Card and that Joint Venture Card can enforce these arbitration provisions
                in the event a Dispute arises after any assignment of the Agreement.
              </Line>

              <div className="bg-gray-100 p-4 rounded-md mt-6">
                <Line>
                  <strong>
                    FOR ALL DISPUTES COVERED BY THE ARBITRATION PROVISIONS IN THIS SECTION OF THE
                    AGREEMENT, THE PARTIES HAVE AGREED TO WAIVE THEIR RIGHT TO A TRIAL BY JURY, THEIR
                    RIGHT TO PARTICIPATE IN CLASS ACTIONS, AND THEIR RIGHT TO SEEK PUNITIVE DAMAGES.
                    EXCEPT FOR DISPUTES AND CLAIMS NOT SUBJECT TO THIS ARBITRATION AGREEMENT, ARBITRATION
                    SHALL BE IN PLACE OF ANY CIVIL LITIGATION IN ANY COURT AND IN PLACE OF ANY TRIAL BY
                    JURY. THE TERMS OF THIS ARBITRATION AGREEMENT AFFECT YOUR LEGAL RIGHTS. IF YOU DO NOT
                    UNDERSTAND ANY TERMS OF THIS PROVISION OR THE COST, ADVANTAGES OR DISADVANTAGES OF
                    ARBITRATION, SEEK INDEPENDENT ADVICE AND/OR CONTACT THE AMERICAN ARBITRATION
                    ASSOCIATION AT (800) 778-7879 BEFORE SIGNING THIS AGREEMENT. BY SIGNING THIS
                    AGREEMENT, YOU ACKNOWLEDGE THAT YOU READ, UNDERSTOOD AND AGREED TO BE BOUND BY EACH
                    OF THE PROVISIONS, COVENANTS, STIPULATIONS AND AGREEMENTS SET FORTH IN THIS SECTION.
                  </strong>
                </Line>
              </div>
            </div>
          </div>
        </Card>

        <PageBreak label="Exhibit A - Glossary of Terms" />

        {/* EXHIBIT A - GLOSSARY */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Exhibit "A" to Terms of Service
            </h3>
            <h4 className="text-base font-semibold text-gray-900 mb-3">Glossary of Terms</h4>
            <div className="space-y-4 text-sm leading-relaxed">
              <Line>
                <strong>"Account"</strong> means any open-end line of credit account initially
                established by Joint Venture Card and serviced by Joint Venture Card, that Cardholders
                may use from time to time to purchase goods or services from the Merchant or otherwise
                pay amounts due to Merchant, and that is accessible by a Card or other access methods
                approved by Joint Venture Card.
              </Line>
              <Line>
                <strong>"Account Agreement"</strong> means the agreement between a Cardholder, as may be
                amended from time to time, that establishes the rates, fees, terms and conditions of the
                Cardholder's Account and makes disclosures about the cost and availability of Account
                credit.
              </Line>
              <Line>
                <strong>"Affiliate"</strong> means any entity that Controls, is Controlled by, or is
                under common Control with Joint Venture Card, the Authorized Financial Institution, or
                Merchant, as applicable. Schedule "B" to the Agreement identifies any "Affiliates" of
                Merchant covered by and subject to the Agreement.
              </Line>
              <Line>
                <strong>"Applicable Law"</strong> means any federal, state, or local law, rule,
                regulation, or regulatory guidance, and any binding determination of an arbitrator, court,
                or other governmental authority, each as amended or otherwise in effect from time to time,
                that applies to or is binding on a Party, its property, or the transaction of its
                business, or to which a Party, its property, or its business is subject.
              </Line>
              <Line>
                <strong>"Applicant"</strong> means a customer whose principal residence and billing
                address is in the United States, and who applies for a Joint Venture Credit Card Account.
              </Line>
              <Line>
                <strong>"Application"</strong> means a request for credit using the Joint Venture Card
                website or other mechanism provided by the Joint Venture Card.
              </Line>
              <Line>
                <strong>"Authorization"</strong> means the permission that Joint Venture Card expressly
                grants for Merchant to make a Card Sale.
              </Line>
              <Line>
                <strong>"Business Day"</strong> means all calendar days, except Saturday, Sunday, and any
                legal public holiday on which banking institutions are closed for business.
              </Line>
              <Line>
                <strong>"Rewards Program"</strong> is the merchant incentive program offered as a feature
                of the Account and detailed in Scheduled E.
              </Line>
              <Line>
                <strong>"Card"</strong> means any card, plate, digital account number, QC Code or other
                single credit device displaying the names and logos of Joint Venture Card (including but
                not limited to "Joint Venture Card"), and its associated Account number, which
                Cardholders may use from time to time to obtain Account credit for purchasing Goods and
                Services from Merchant or otherwise paying an amount due to Merchant.
              </Line>
              <Line>
                <strong>"Card Sale"</strong> means any purchase of Goods and Services that a Cardholder
                is allowed to make from Merchant using a Card code pursuant to the Agreement.
              </Line>
              <Line>
                <strong>"Cardholder"</strong> means an individual in whose name a Card has been issued,
                or any individual who possesses or uses a Card and who purports to be the person in whose
                name the Card was issued, or who purports to be an authorized user of the Card.
              </Line>
              <Line>
                <strong>"Chargeback"</strong> means the reimbursement due from Merchant, or made by
                Merchant, for an amount it previously received from Joint Venture Card and/ in connection
                with a Charge Slip and/or Card Sale. The reasons for which a Chargeback is or may be due
                are set forth in the Merchant Operating Guide.
              </Line>
              <Line>
                <strong>"Charge Slip"</strong> means the electronic record of the purchase of Goods and
                Services made by a Cardholder from the Merchant using a Card pursuant to the Agreement.
              </Line>
              <Line>
                <strong>"Confidential Information"</strong> has the meaning set forth in the Information
                Privacy and Security Schedule attached as Schedule "F" to the Agreement.
              </Line>
              <Line>
                <strong>"Consumer"</strong> has the meaning set forth in the Information Privacy and
                Security Schedule attached as Schedule "F" to the Agreement.
              </Line>
              <Line>
                <strong>"Control" and "Controlled"</strong> means having the ability, directly or
                indirectly, to direct the management and policies of the entity in question.
              </Line>
              <Line>
                <strong>"Customer"</strong> means a current or prospective customer, client, or patient
                of Merchant who may also apply for and use a Card and Account as a Cardholder to pay for
                purchases from Merchant, subject to the terms and conditions established by the
                Application and Account agreement.
              </Line>
              <Line>
                <strong>"Discloser"</strong> has the meaning set forth in the Information Privacy and
                Security Schedule attached as Schedule "F" to the Agreement.
              </Line>
              <Line>
                <strong>"Dispute"</strong> means any action, dispute, claim, or controversy of any kind
                arising out of, in connection with or in any way related to: the Agreement; the provision
                of services and the processing, transfer, acquisition of Charge Slips and Chargebacks
                before, on, or after the Effective Date of the Agreement; or any other aspect whatsoever
                of the past, present, or future relationship or conduct of the Merchant, Joint Venture
                Card, their respective Affiliates, and/.
              </Line>
              <Line>
                <strong>"Excessive Chargebacks"</strong> shall occur if: (i) the aggregate number of
                Charge Slips subject to Chargeback exceeds three percent (3.0%) of the total number of
                all Charge Slips submitted by Merchant, with respect to an individual Merchant location
                or all Merchant locations, in any calendar quarter; or (ii) the aggregate dollar amount
                of all Charge Slips subject to Chargeback in any monthly billing cycle exceeds five
                percent (5.0%) of the total unpaid balances of all Accounts at the end of such monthly
                billing cycle.
              </Line>
              <Line>
                <strong>"Goods and Services"</strong> means the products or services that Merchant
                provides to its Customers, as described in the Merchant Application or any other part of
                the Agreement, certain warranties expressly authorized by Joint Venture Card, and related
                services sold by Merchant in the ordinary course of its business to Customers for their
                personal, family, or household purposes.
              </Line>
              <Line>
                <strong>"Merchant"</strong> means the entity identified on the first page of the
                Agreement.
              </Line>
              <Line>
                <strong>"Merchant Application"</strong> means and includes the document attached as
                Schedule "B" to the Agreement and any additional documents containing information about
                Merchant's business that is submitted to Joint Venture Card in connection with Merchant's
                application for services and transactions set forth in the Agreement.
              </Line>
              <Line>
                <strong>"Merchant Operating Guide"</strong> means the operating manual of Joint Venture
                Card that sets forth the rules and procedures that govern Applications, Charge Slips,
                Chargebacks, and other processing requirements and services related to the Program. The
                Merchant Operating Guide may be amended from time to time by Joint Venture Card in their
                sole discretion, and any such amendments shall be effective as of the date specified by
                Joint Venture Card in its notice to the Merchant.
              </Line>
              <Line>
                <strong>"Nonpublic Personal Information"</strong> has the meaning set forth in the
                Information Privacy and Security Schedule attached as Schedule "D" to the Agreement.
              </Line>
              <Line>
                <strong>"POS Provider"</strong> means a point of sale system provider that is used by
                Merchant and integrated with the Joint Venture Card. The POS Provider may also be
                referred to as a "Distribution Partner."
              </Line>
              <Line>
                <strong>"Program"</strong> means the products, services, information and support that
                Joint Venture Card provide that allows certain Customers to finance their purchase of
                goods and services from Merchant, if such Customers request and qualify for an Account
                based on the criteria established and implemented from time to time by Joint Venture
                Card. The Program includes the Rewards Program.
              </Line>
              <Line>
                <strong>"Promotional Offerings"</strong> means the marketing, services, terms, and
                enhancements associated with the Program and Accounts that are mutually acceptable to the
                Parties from time to time, for purposes of promoting the use and availability of Accounts
                and any related services, features, and enhancements to Customers, Applicants, and
                Cardholders.
              </Line>
              <Line>
                <strong>"Proprietary Information"</strong> has the meaning set forth in the Information
                Privacy and Security Schedule attached as Schedule "D" to the Agreement.
              </Line>
              <Line>
                <strong>"Purchase"</strong> means the exchange of goods or services from the Merchant to
                a customer in exchange for payment. Customer makes payment to Merchant with a Card
                through the use of Joint Venture Card for collection. Payments to Merchant for Cardholder
                Purchases are completed as described in the Merchant Operating Guide.
              </Line>
              <Line>
                <strong>"Recipient"</strong> has the meaning set forth in the Information Privacy and
                Security Schedule attached as Schedule "D" to the Agreement.
              </Line>
              <Line>
                <strong>"Referral Partner"</strong> means an independent sales person who introduces a
                merchant to Joint Venture Card and assists introduced merchants with their application to
                become a Merchant, along with the implementation and roll-out of the Joint Venture Card
                service at the Merchant location(s).
              </Line>
              <Line>
                <strong>"Rules"</strong> means all rules, regulations, and laws as respectfully amended
                from time to time, including the Merchant Operating Guide; any applicable national,
                federal, state, or local jurisdiction in which the Merchant operates; NACHA; and the
                Electronic Transactions Association.
              </Line>
              <Line>
                <strong>"Transaction"</strong> shall mean a Purchase.
              </Line>
              <Line>
                <strong>"Transaction Processing Account"</strong> means the commercial purpose demand
                deposit account at a depository institution designated by Merchant, and acceptable to
                Joint Venture Card, for purposes of either Party making a payment due to the other Party
                in connection with Credit Sales and Chargebacks, or other amounts a Party owes the other
                Party as provided in the Agreement.
              </Line>
            </div>
          </div>
        </Card>

        {/* ===================== NEW: Schedule "A” ===================== */}
      <PageBreak label='Schedule "A"' />
<Card className="bg-white p-8">
  <div className="prose prose-lg max-w-none">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Schedule "A" - Designation of Notice Address
    </h3>

    {agreementData.scheduleA ? (
      <div className="space-y-6 text-sm leading-relaxed">
        {/* Change notice */}
        <Line>
          Any change to the Notice Address for the Merchant after the Effective Date of the Agreement
          must be in writing and signed by a duly authorized officer of Joint Venture Card and
          Merchant to be effective and binding on the Parties.
        </Line>

        {/* Merchant name line */}
        <Line>
          As of the Schedule “A” Effective Date shown below, the entity principally operating as
          “Merchant” under the Agreement is{" "}
          <strong>
            {agreementData.scheduleA.merchantName ||
              agreementData.parties?.merchantLegalName ||
              "—"}
          </strong>.
        </Line>

        {/* Merchant address from application */}
        <SectionHeader>Merchant Notice Address</SectionHeader>
        <div className="border rounded-md p-4 bg-gray-50">
          {(agreementData.scheduleA.merchantNoticeAddressLines || []).length > 0 ? (
            agreementData.scheduleA.merchantNoticeAddressLines!.map((l, i) => <div key={i}>{l}</div>)
          ) : (
            <div className="text-gray-500 italic">[Address from Application]</div>
          )}
        </div>

        {/* JVC default notice address */}
        <SectionHeader>Notices to Joint Venture Card</SectionHeader>
        <div className="border rounded-md p-4 bg-gray-50">
          {[
            "Joint Venture Card",
            "Attn: Legal Department",
            "PO Box 1365",
            "Monterey, CA 93942",
          ].map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>

        <Line>
          Merchant and the person signing below represent and warrant that such person is duly
          authorized by Merchant to sign on its behalf to the Agreement and this Designation of
          Notice Address.
        </Line>

        {/* Signature section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Merchant side */}
          <div>
            <p className="font-medium">
              {agreementData.scheduleA.merchantName ||
                agreementData.parties?.merchantLegalName ||
                "Merchant"}
            </p>
            <div className="mt-2">
              <SigBlock heading="Authorized Signature" sig={agreementData.scheduleA.merchantSigner} />
            </div>
          </div>

          {/* JVC side */}
          <div>
            <p className="font-medium">
              {jvcName} {jvcDba}
            </p>
            <p className="font-medium">
              (“Joint Venture Card”)
            </p>
            <div className="mt-2">
              <SigBlock heading="Authorized Signature" sig={parties.jvcSignature} />
            </div>
          </div>
        </div>

        {/* Effective date */}
        <div className="text-xs text-gray-500 mt-4">
          Schedule “A” Effective Date: {agreementData.scheduleA.effectiveDate || "—"}
        </div>
      </div>
    ) : (
      <p className="text-sm text-gray-500 italic">No Schedule “A” data provided.</p>
    )}
  </div>
</Card>


        {/* ===================== NEW: Schedule "B” ===================== */}
        <PageBreak label='Schedule "B"' />
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Schedule "B" - Schedule of Fees and Charges
            </h3>

            <div className="space-y-6 text-sm leading-relaxed">
              <SectionHeader>1. Promotional Offerings</SectionHeader>
              <Line>See terms as provided for each offering.</Line>

              <SectionHeader>2. Schedule Amendments</SectionHeader>
              <Line>
                Merchant understands and agrees that Joint Venture Card may impose a change to the
                terms of this Schedule of Fees and Charges from time to time at their sole discretion,
                after Joint Venture Card gives reasonable advance notice of any such change to Merchant.
                Merchant understands and agrees that notice of a change to the Schedule of Fees and
                Charges shall be considered reasonable if Joint Venture Card sends it in the manner and
                to the location Merchant specified in its most recent Designation of Notice Address
                (Schedule "A" to the Agreement), at least ten (10) Business Days before the effective
                date of any such change. Merchant shall be deemed to have accepted and agreed to any
                such changes if it accepts purchases for new Card Sales to Joint Venture Card on or
                after the effective date for the change that Joint Venture Card specified in its notice.
              </Line>

              <SectionHeader>3. Credit Sale Acceptance and Payment</SectionHeader>
              <Line>
                Joint Venture Card agrees to pay Merchant the amounts due for the Credit Sales for
                acceptance during the term of the Agreement, subject to all terms, conditions,
                representations, and warranties made by Merchant in the Agreement, the compliance by
                Merchant with all duties assigned to it by the Agreement, and the satisfaction by
                Merchant of all conditions related to the authorization, acceptance and processing of
                Charge Slips established by the Agreement, including those described in the Merchant
                Operating Guide.
              </Line>

              <SectionHeader>4. Returns and Refunds</SectionHeader>
              <Line>
                Joint Venture Card may deduct from any amount due to the Merchant in connection with
                this Agreement, the amounts that become due from Merchant for Chargebacks, returns,
                credits, or other reasons authorized by the Agreement.
              </Line>

              <SectionHeader>5. Transaction Processing Fee</SectionHeader>
              <Line>
                Merchant agrees to pay Joint Venture Card a Transaction Processing Fee, as described
                in the Schedule of Fees and Charges below, for each Credit Sale. Joint Venture Card
                may deduct from any amount due to the Merchant in connection with this Agreement, the
                amounts that become due from Merchant for the Transaction Processing Fees.
              </Line>

              <SectionHeader>6. Merchant Enrollment and Due Diligence Fee</SectionHeader>
              <Line>
                Merchant agrees to pay Joint Venture Card a Merchant Enrollment and Due Diligence Fee
                for its investigation and evaluation of the merchant and its owners during the account
                opening process.
              </Line>

              <SectionHeader>7. Credit Card Surcharge</SectionHeader>
              <Line>
                The Credit Card Surcharge, as described in the Schedule of Fees and Charges below, is
                a fee for each credit card transaction that Merchant may choose to include in the
                Transaction amount payable by the Cardholder. Merchant agrees that the amount of the
                Surcharge shall not exceed the lesser of the amount of the Transaction Processing Fee
                or any surcharge limits under applicable state law.
              </Line>

              <SectionHeader>8. Compensation of POS Provider and/or Referral Partner</SectionHeader>
              <Line>
                To the extent Merchant has engaged a POS Provider and/or Referral Partner, Joint
                Venture Card may remit to funds to these parties as set forth in a separate agreement
                between Merchant and the POS Provider and/or Referral Partner, provided such agreement
                is consistent with this Agreement and given to Joint Venture Card with sufficient time
                to implement proper payments.
              </Line>

              <SectionHeader>9. Liability for Amounts Not Timely Paid by Merchant</SectionHeader>
              <Line>
                If Merchant has not made payment in full of any amounts due for credits, return fees,
                and Cardholder interest, fees, and charges in the time and manner described above,
                Merchant must pay such amounts to Joint Venture Card within ten (10) days after
                Merchant receives a written notice from Joint Venture Card requiring payment of these
                amounts. If Merchant does not pay Joint Venture Card the full amount due within ten
                (10) days after Merchant receives this notice from Joint Venture Card, Merchant agrees
                that it is also liable to Joint Venture Card for an amount equal to the lesser of:
                (i) seventeen percent (17%) per year on the amount specified in Joint Venture Card's
                written notice from the date such amount became due until it is paid in full; or
                (ii) the maximum daily rate of interest that may be permitted by Applicable Law on the
                amount specified in Joint Venture Card's written notice from the date such amount
                became due until it is paid in full.
              </Line>

              <SectionHeader>10. Merchant Employee Referral Bonus</SectionHeader>
              <Line>
                Joint Venture Card will pay a reward directly to any Merchant's employee for each new
                credit card account opened as the result of a customer referral by the Merchant's
                employee and upon first purchase by the consumer, provided evidence of such referral
                is included in the credit card application. Merchant acknowledges and agrees that the
                referral bonus payments are to be made directly to the employee. Merchant shall not be
                entitled to any portion of the referral bonus and may not subtract the amount of the
                bonus paid from any compensation due from Merchant to employee or otherwise require
                employee to reimburse Merchant for the amount of the bonus.
              </Line>

              <SectionHeader>Fees and Charges</SectionHeader>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Fee Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Credit Card Surcharge (paid by consumer to merchant)
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {agreementData.scheduleB?.surchargeRule ||
                          "Up to the Transaction Processing Fee amount, subject to State law (e.g., 2% maximum in Colorado)"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Transaction Processing Fee
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {agreementData.scheduleB?.transactionProcessingFeeRule ||
                          "4.75% of the Gross Sale amount ($3 minimum) plus any Distribution/Referral partner fee amount."}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Merchant Enrollment and Due Diligence
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {agreementData.scheduleB?.enrollmentFee || "$150 one-time (waived)"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>

        {/* ===================== NEW: Schedule "C” ===================== */}
       <PageBreak label='Schedule "C"' />
<Card className="bg-white p-8">
  <div className="prose prose-lg max-w-none">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Schedule "C" - Deposit Account ACH Authorization
    </h3>

    {agreementData.scheduleC ? (
      <div className="space-y-6 text-sm leading-relaxed">
        {/* Authorization paragraph */}
        <p>
          The person signing below (“I,” “me,” and “my”) authorizes Joint Venture Card, Inc.
          d/b/a The Joint Venture Card and Joint Venture Card (“Joint Venture Card”) to
          initiate credit entries by automated clearing house (ACH) to the deposit account
          that <strong>{agreementData?.parties?.merchantLegalName ?? parties?.merchantLegalName ?? "Merchant"}</strong>
          {" "}(“Merchant”) maintains in its name with the depository institution named below (the “Bank”),
          for purposes of making payments that Joint Venture Card determines are due to Merchant in
          connection with the JVC Merchant Agreement (“Agreement”) between Joint Venture Card and Merchant.
          I also authorize Joint Venture Card to initiate debit entries to this same deposit account for
          obtaining payment of amounts that Joint Venture Card determines are due from Merchant in connection
          with the Agreement, whether as a result of amounts deposited in error, amounts resulting from
          credits issued on charges submitted from a Merchant location, or other reasons authorized by the
          Agreement. I authorize the Bank named below to honor and process these credits and debits to the
          designated deposit account. I certify that Merchant owns and maintains the designated deposit
          account with the Bank. I also certify that I am duly authorized to act for and on behalf of
          the Merchant in signing this authorization. I acknowledge and agree that the origination of ACH
          transactions to this deposit account with the Bank must comply with applicable law and NACHA
          Operating Rules.
        </p>

        {/* Bank / account fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-3 bg-gray-50">
            <div className="text-xs text-gray-500">Name of Financial Institution</div>
            <div className="font-medium">
              {agreementData.scheduleC.bankName /* <doc_data_83> */}
            </div>
          </div>
          <div className="border rounded-md p-3 bg-gray-50">
            <div className="text-xs text-gray-500">Name on Account</div>
            <div className="font-medium">
              {agreementData.scheduleC.nameOnAccount /* <doc_data_117> */}
            </div>
          </div>
          <div className="border rounded-md p-3 bg-gray-50">
            <div className="text-xs text-gray-500">Transit/ABA No.</div>
            <div className="font-medium">
              {/* Show unmasked routing number in the generated agreement per product requirement. */}
              {agreementData.scheduleC.routingNumber ?? agreementData.scheduleC.routingNumberMasked}
            </div>
          </div>
          <div className="border rounded-md p-3 bg-gray-50">
            <div className="text-xs text-gray-500">Depository Account No.</div>
            <div className="font-medium">
              {/* Show unmasked account number in the generated agreement per product requirement. */}
              {agreementData.scheduleC.accountNumber ?? agreementData.scheduleC.accountNumberMasked}
            </div>
          </div>
        </div>

        {/* Acceptance footer */}
        <div className="pt-2">
          <p className="font-medium">Accepted and agreed,</p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Signature block (image or placeholder) */}
              <SigBlock heading="Authorized Signature" sig={agreementData.scheduleC.merchantSigner} />
            </div>
            {/* Keep signature block only; printed name/title/date are shown in the SigBlock */}
          </div>
        </div>
      </div>
    ) : (
      <p className="text-sm text-gray-500 italic">No Schedule "C" data provided.</p>
    )}
  </div>
</Card>


        {/* ===================== NEW: Schedule "D” ===================== */}
      <PageBreak label='Schedule "D"' />
<Card className="bg-white p-8">
  <div className="prose prose-lg max-w-none">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Schedule "D" - Information Privacy and Security Schedule
    </h3>

    {agreementData.scheduleD ? (
      <div className="space-y-6 text-sm leading-relaxed">
        {/* Optional acknowledgement banner */}
        {agreementData.scheduleD.showAcknowledgement && (
          <div className="bg-gray-50 border rounded-md p-3">
            <p className="text-sm">
              {agreementData.scheduleD.acknowledgementText ||
                "Merchant acknowledges and agrees to comply with the Information Privacy and Security Schedule."}
            </p>
          </div>
        )}

        {/* 1. Definitions */}
        <SectionHeader>1. Definitions.</SectionHeader>
        <Line>
          Capitalized terms used in, but not defined by, this Schedule to the Agreement between
          Merchant and Joint Venture Card shall have the meanings assigned to them by the Agreement.
        </Line>

        <div className="space-y-4">
          <div>
            <p className="font-medium">(a) “Confidential Information” means and includes:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                The Agreement, its Schedules, and any information, other than Nonpublic Personal
                Information about a Consumer of Discloser, that Recipient receives, obtains, maintains,
                processes or otherwise is permitted to access from or about Discloser, or that is
                derived from or associated in any way with the Agreement and its Schedules, and which
                is generally not known to the public or which has been identified as confidential or
                proprietary by Discloser, including without limitation any non-public information about
                marketing plans, financial condition, products, processes, clients, vendors and other
                confidential and proprietary business information of Discloser (“Proprietary
                Information”); and
              </li>
              <li>
                Any information from or about a Consumer of Discloser that is received or made
                available to Recipient in connection with the Agreement and that: (i) relates to any
                such Consumer; (ii) relates to or derives from any transaction directly between
                Discloser and any Consumer; or (iii) is a list, description or other grouping of
                Discloser’s Consumers (“Nonpublic Personal Information”).
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium">(b) “Consumer” means:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                (i) any Applicant or Cardholder who applies for, who obtains, or who has applied for
                or obtained a financial product or service from or through Joint Venture Card and/,
                which is to be used primarily for the personal, family, or household purposes of any
                such Applicant or Cardholder; and
              </li>
              <li>
                (ii) any Customer of Merchant who requests or obtains any Goods and Services from or
                through Merchant that it must keep private to comply with Applicable Law or to comply
                with a disclosed Merchant policy or agreement with such Customer.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium">
              (c) “Discloser” means either Merchant, Joint Venture Card (for itself and on behalf of
              the Authorized Financial Institution), or their respective Affiliates, when any such
              entity discloses or makes available its own Confidential Information to the other Party,
              the Authorized Financial Institution or their respective Affiliates in the capacity of a
              Recipient.
            </p>
          </div>

          <div>
            <p className="font-medium">
              (d) “Recipient” means either Merchant, Joint Venture Card (for itself and on behalf of
              the Authorized Financial Institution), or their respective Affiliates, when any such
              entity receives or is given access to the Confidential Information of the other Party,
              the Authorized Financial Institution, or their respective Affiliates in the capacity of
              a Discloser.
            </p>
          </div>
        </div>

        {/* 2. Rights, Title, and Interest in NPI */}
        <SectionHeader>2. Rights, Title, and Interest in Nonpublic Personal Information about Consumers.</SectionHeader>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            (a) The Parties understand and agree that an individual can, at the same time, be a
            Consumer of each Party.
          </li>
          <li>
            (b) If Joint Venture Card receives Nonpublic Personal Information from Merchant about a
            Consumer who is not an Applicant or Cardholder, then Joint Venture Card shall consider
            such Nonpublic Personal Information to be exclusively owned and provided by Merchant in
            its capacity as Discloser. Any Nonpublic Personal Information of a Consumer who does not
            become an Applicant or Cardholder shall, if received or kept by Joint Venture Card, be
            treated as Nonpublic Personal Information of Merchant in its capacity as Discloser, which
            is subject to the restrictions on use and disclosure below that apply to Joint Venture Card
            in its capacity as a Recipient of such Nonpublic Personal Information.
          </li>
          <li>
            (c) For any Consumer of Merchant who becomes an Applicant or Cardholder, Merchant
            understands that Joint Venture Card must use, disclose and keep Nonpublic Personal
            Information about such Consumers to provide the Program, review Applications, and permit
            the use and servicing of Accounts and Cards. Merchant understands and agrees that any
            Nonpublic Personal Information about an Applicant or Cardholder that Joint Venture Card and/
            may receive for purposes of providing the Program, or in connection with Applications,
            Charge Slips, Card Sales, Credit Slips, or otherwise as a result of the use or servicing of
            Cards and Accounts, shall be deemed Nonpublic Personal Information about a Consumer of
            Joint Venture Card when any such Nonpublic Personal Information is received or prepared by
            Joint Venture Card, and regardless of its source. Any Nonpublic Personal Information of an
            Applicant or Cardholder who becomes a Consumer of Joint Venture Card shall, if received or
            kept by Merchant for reasons related to the Program and the use, origination or servicing
            of Accounts, be treated as Nonpublic Personal Information of Joint Venture Card in the
            capacity of Discloser, which is subject to the restrictions on use below that apply to
            Merchant in its capacity as a Recipient of such Nonpublic Personal Information. Joint
            Venture Card agrees to use and disclose Nonpublic Personal Information of any such
            Applicants and Cardholders only as described to Consumers in any applicable privacy notice,
            and as otherwise required or permitted by Applicable Law.
          </li>
        </ul>

        {/* 3. Use and Confidentiality */}
        <SectionHeader>3. Use and Confidentiality of Confidential Information.</SectionHeader>
        <Line>
          Recipient agrees that it shall use Discloser’s Confidential Information solely for performing
          Recipient’s obligations under the Agreement, including any applicable Schedule to the
          Agreement. Recipient agrees that it shall not sell, rent, lease or otherwise directly or
          indirectly disclose Discloser’s Confidential Information to any third party, except as
          expressly authorized by the Agreement, any applicable Schedule to the Agreement, or as
          otherwise expressly authorized in advance and in writing by Discloser. Recipient agrees that
          it shall take all reasonable steps to protect the confidentiality of Discloser’s Confidential
          Information, using the same standard of care that Recipient uses to protect its own
          Confidential Information, and not less than any standard of care required by Applicable Law
          and that is considered commercially reasonable under the circumstances. Recipient agrees that
          it shall give access to Discloser’s Confidential Information only to those employees,
          officers or agents of Recipient who have a need to know in connection with the performance
          of Recipient’s obligations under the Agreement or any applicable Schedule to the Agreement.
          Recipient agrees that it shall not copy or duplicate Discloser’s Confidential Information,
          except as necessary to fulfill Recipient’s obligations under the Agreement, any applicable
          Schedule to the Agreement, or as expressly required by Applicable Law. Recipient agrees that
          it shall comply with all Applicable Laws related to privacy and information security that
          apply to Discloser’s Confidential Information and the respective businesses of Recipient and
          Discloser. Recipient agrees that it shall not monitor or edit Discloser’s Confidential
          Information, unless Recipient is expressly authorized to do so by the Agreement or any
          applicable Schedule to the Agreement, or unless Recipient determines in good faith that it is
          required to do so by Applicable Law. If Recipient is expressly permitted under the terms of
          this Schedule or any part of the Agreement to disclose Discloser’s Confidential Information
          to a third party, then Recipient shall ensure that any such third party is subject to binding
          confidentiality obligations with respect to such Confidential Information that are at least
          as restrictive as those contained in this Schedule.
        </Line>

        {/* 4. Exclusions and Exceptions */}
        <SectionHeader>4. Exclusions and Exceptions.</SectionHeader>
        <Line>
          The confidentiality obligations in this Schedule do not apply to Proprietary Information
          that: (a) is a part of the public domain when disclosed to Recipient, or that subsequently
          becomes a part of the public domain through no act or omission of Recipient; (b) was in
          Recipient’s lawful possession without an accompanying secrecy obligation prior to disclosure
          by Discloser, as documented in Recipient’s written records; (c) is lawfully disclosed to
          Recipient by a third party without an accompanying secrecy obligation or breach of any duty
          or agreement by which such third party is bound; or (d) is independently developed by
          Recipient for purposes and uses that are unrelated to the Agreement and its Schedules, with
          written verifiable proof thereof provided to Discloser upon its request. This Schedule shall
          not be deemed to prohibit disclosures: (i) required by Applicable Law, provided that prior
          notice of any such disclosure not prohibited by Applicable Law has been given to Discloser,
          in a time and manner that would permit Discloser to take legal action at its own costs and
          expenses to prevent the disclosure or seek an appropriate protective order; (ii) required to
          protect and defend Recipient’s rights or property or protect under exigent circumstances the
          personal safety of the public or Recipient’s clients or customers; (iii) as required in the
          course of an examination by a governmental authority with supervisory or enforcement
          jurisdiction over Recipient; or (iv) to Recipient’s professional auditors and counsel,
          provided that such advisors are obligated to maintain the confidentiality of the information
          they receive.
        </Line>

        {/* 5. Confidentiality of the Agreement */}
        <SectionHeader>5. Confidentiality of the Agreement.</SectionHeader>
        <Line>
          The terms and conditions of the Agreement shall be treated as Confidential Information. A
          Party may not refer to or disclose the terms and conditions of the Agreement or activities
          pertaining to the Agreement in any form without the prior written consent of the other Party,
          except as expressly authorized by this Schedule or the Agreement. The general existence of
          this Agreement shall not be treated as Confidential Information. Either Party may disclose
          the terms and conditions of this Agreement: (i) as required by any court or other
          governmental authority; (ii) as otherwise required by Applicable Law, including a party’s
          obligations under applicable securities laws; (iii) to legal counsel of a Party; (iv) in
          confidence to accountants, proposed investors, and financing sources and their advisors; (v)
          to enforce the Agreement or rights under the Agreement; or (vi) in confidence in connection
          with a merger or acquisition or proposed merger or acquisition, or the like.
        </Line>

        {/* 6. Retransmission, Return, and Destruction */}
        <SectionHeader>6. Retransmission, Return, and Destruction of Discloser’s Confidential Information.</SectionHeader>
        <Line>
          If Recipient is permitted to retransmit any Confidential Information of Discloser under the
          terms of the Agreement or any applicable Schedule, Recipient’s mode of retransmission must
          be at least as secure as the mode by which Discloser transmitted such Confidential
          Information to Recipient. Upon Discloser’s request, Recipient shall promptly return
          Discloser’s Confidential Information to Discloser in the same format as provided by
          Discloser or destroy Discloser’s Confidential Information, except to the limited extent that
          Recipient is required to maintain copies of Discloser’s Confidential Information for legal,
          regulatory, or accounting reasons. Any copies of Discloser’s Confidential Information that
          Recipient maintains for legal, regulatory, or accounting reasons shall remain subject to the
          duties of confidentiality, privacy, and security set forth in this Schedule. Nothing in this
          Schedule or the Agreement shall be construed to grant Recipient any rights, title or
          interest in or to any of Discloser’s Confidential Information, except as otherwise provided
          by the express terms of any applicable Schedule to the Agreement.
        </Line>

        {/* 7. Information Security and Disposal Standards */}
        <SectionHeader>7. Information Security and Disposal Standards.</SectionHeader>
        <Line>
          Recipient agrees to implement and maintain a comprehensive written information security
          program that complies with all applicable laws and includes appropriate administrative,
          technical and physical safeguards to: (a) ensure the safety and confidentiality of
          Discloser’s Confidential Information; (b) protect against unauthorized access to and use of
          Discloser’s Confidential Information; (c) protect against anticipated threats or hazards to
          the security or integrity of Discloser’s Confidential Information; and (d) properly dispose
          of Discloser’s Confidential Information. Recipient agrees that such measures shall comply
          with and meet the objectives of all applicable laws, including without limitation the
          federal Gramm-Leach-Bliley Act, the administrative rules and regulations implementing the
          Gramm-Leach-Bliley Act (including but not limited to 16 C.F.R. Part 314), and the
          Interagency Guidelines Establishing Information Security Standards. Recipient shall
          implement a written security and disaster recovery plan consistent with the standards and
          practices of the respective industries of Recipient and Discloser, and all applicable laws.
          Recipient further agrees to cooperate the monitoring by Discloser of Recipient’s compliance
          with the foregoing obligations as reasonably requested by Discloser from time to time,
          including, without limitation, by providing Discloser with an opportunity to review and
          obtain copies of relevant audits, test results, reports and similar materials that Recipient
          might prepare or have prepared for it from time to time.
        </Line>

        {/* 8. Notification of Security Breach */}
        <SectionHeader>8. Notification of Security Breach.</SectionHeader>
        <Line>
          Recipient agrees to comply with all Applicable Laws and take appropriate actions to address
          incidents of unauthorized access to Discloser’s Confidential Information, including by
          notifying Discloser as soon as possible of any unauthorized access to or disclosure of
          Discloser’s Confidential Information, any breach of this Schedule, or any breach or
          attempted breach of Recipient’s security related to areas, locations or computer systems
          that contain any Confidential Information of Discloser (including without limitation any
          instance of theft, unauthorized access by fraud, deception or other malfeasance or
          inadvertent access). In the event of any such breach of this Schedule, unauthorized access,
          disclosure or breach or attempted breach of security, Recipient shall further provide to
          Discloser, in writing, such details concerning the incident in question as Discloser may
          request. Recipient shall obtain Discloser’s express written approval for the form, content
          and timing of any communication that Discloser may allow Recipient to provide Consumers about
          any breach or potential breach of information security related to any such Consumers. In the
          event of any known breach or suspected potential breach of security related to a Consumer,
          Recipient shall: (a) conduct an investigation of the security breach and collect and
          preserve all data and evidence concerning the security breach; (b) take all steps
          appropriate and necessary to contain, prevent and mitigate any further security breach; (c)
          provide immediate notice to Discloser of any such known or suspected security breach, which
          shall not be later than twenty-four (24) hours after Discloser learns about or discovers any
          breach or potential breach of information security; (d) provide Discloser with a written
          report concerning any such known or suspected security breach within three (3) Business
          Days; (e) document and detail the remedial action taken by Recipient, and planned to be
          taken by Recipient, to remediate any such known or suspected breach of information security;
          (f) permit a post-breach security assessment or audit to be performed by Discloser, upon its
          request; and (g) allow Discloser to perform its own on-site forensic examination of any such
          known or suspected security breach, upon Discloser’s request.
        </Line>

        {/* 9. Remedies; Indemnification */}
        <SectionHeader>9. Remedies; Indemnification.</SectionHeader>
        <Line>
          Recipient agrees that breach of this Schedule shall give rise to irreparable injury to
          Discloser that is inadequately compensable in damages. Recipient agrees that Discloser is
          authorized to seek injunctive relief against the breach or threatened breach by Recipient of
          this Schedule, in addition to such legal remedies as may be available to Discloser,
          including the recovery of damages. Recipient also agrees to indemnify, defend, and hold
          Discloser harmless from and against any and all claims, demands, liabilities, actions,
          disputes, controversies, losses, damages, and expenses, including but not limited to
          reasonable attorney fees and costs, asserted by any person or entity other than Discloser
          that may result from or are related to any breach by the Recipient of any duty or obligation
          assigned to it by this Schedule.
        </Line>
      </div>
    ) : (
      <p className="text-sm text-gray-500 italic">No Schedule “D” data provided.</p>
    )}
  </div>
</Card>


        {/* ===================== EXISTING: Schedule "E” (Rewards) ===================== */}
       <PageBreak label='Schedule "E"' />
<Card className="bg-white p-8">
  <div className="prose prose-lg max-w-none">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule "E" - Rewards Program Terms</h3>

    {agreementData.scheduleE ? (
      <div className="space-y-6 text-sm leading-relaxed">
        {/* Intro */}
        <Line>
          The Rewards Program entitles each cardholder to earn points that can be accumulated and
          redeemed for credits on future Purchases. Points are generally earned, accumulated, and
          redeemable with each individual merchant where Purchases are made. <strong>Points expire 180
          days</strong> after they are earned and <strong>rewards credits expire 90 days</strong> after being earned.
        </Line>

        {/* 1 */}
        <SectionHeader>1. Earning Rewards Points: from Purchases.</SectionHeader>
        <Line>
          Cardholders will earn one point for each Purchase dollar on the Joint Venture Card, net of
          returns, with any merchant that accepts the Card. Rewards on Purchases are liabilities of the
          Merchant, payable in connection with Rewards Redemptions, as described below.
        </Line>

        {/* 2 */}
        <SectionHeader>2. Earning Rewards Points: from Bonuses.</SectionHeader>
        <Line>
          Cardholders may be given the opportunity to earn bonus rewards points. For example, Cardholders
          may earn 50 bonus rewards points upon the approval of their credit application and first Purchase
          with any merchant that accepts the Card, or bonus rewards points equal to a percentage of their
          Purchase amount for choosing a certain repayment method.
        </Line>

        {/* 3 */}
        <SectionHeader>3. Transferring Rewards Points.</SectionHeader>
        <Line>
          Joint Venture Card may, in its sole discretion, permit Cardholders to elect to transfer rewards
          points earned with one merchant to another merchant (“Transferred Points”). If a Cardholder elects
          to transfer rewards points from another merchant to be used with Merchant, such Transferred Points
          will be liabilities of JVC payable to Merchant when they are allocated to Merchant at a rate of
          <strong> $0.005 per point</strong>, regardless of whether such points are redeemed. If reward points
          earned from Purchases with Merchant are transferred to another merchant, for any reason other than
          Termination subject to Section 6 of this Schedule E, Merchant shall bear the cost of those rewards
          at a rate of <strong>$0.005 per point</strong>.
        </Line>

        {/* 4 */}
        <SectionHeader>4. Rewards Redemptions &amp; the Application of Rewards Credits.</SectionHeader>
        <Line>
          With each <strong>500 points</strong> a Cardholder accumulates with any single merchant, including Merchant,
          JVC shall cause <strong>500 points</strong> to be automatically redeemed as a <strong>$25 reward credit</strong>.
          Cardholders may load reward credits in the JVC consumer app for use with Merchant. Merchant shall
          apply any loaded and unused reward credits to the Cardholder’s next Purchase with the Merchant.
          For example, assume a Cardholder earns 600 points with a merchant. 500 points will be automatically
          redeemed as a $25 reward credit and 100 points will remain. When the Cardholder loads the $25 reward
          credit in the JVC consumer app for use with the merchant, the $25 reward credit must be applied by
          the merchant to the Cardholder’s next Purchase. If the next Purchase is $100, the $25 reward credit
          will reduce the total Purchase amount to $75. The consumer purchase amount must exceed the amount of
          the reward credit applied. There is no cash back to the consumer.
        </Line>

        {/* 5 */}
        <SectionHeader>5. Merchant Liability for Rewards Redemptions.</SectionHeader>
        <Line>
          Each time a Cardholder makes a Purchase with Merchant that triggers a reward credit to be applied
          towards the Purchase amount, Merchant shall be liable to JVC for the amount of each $25 reward
          credit provided to Cardholders, <strong>less $2.50 per $25 reward credit</strong>. To satisfy this liability,
          Joint Venture Card will deduct the total amount of all such reward credits on a business day from
          the payment amount due to Merchant in connection with this Agreement for that day. Joint Venture
          Card will maintain and share with Merchant its records of Cardholders’ Reward Program Merchant point
          balances and redemption activity.
        </Line>

        {/* 6 */}
        <SectionHeader>6. Termination.</SectionHeader>
        <Line>
          In the event of termination of this Agreement or Merchant’s decision to stop accepting Cards for
          Purchases, for any reason, which thereby eliminates the ability of a Cardholder to redeem
          accumulated rewards, Merchant shall pay Joint Venture Card <strong>$0.005 for each outstanding point</strong>.
        </Line>

        {/* Rewards Liability Schedule (fixed) */}
        <SectionHeader>Rewards Liability Schedule</SectionHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Event</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Liability of</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Transfer of Rewards to Merchant</td>
                <td className="border border-gray-300 px-4 py-2">JVC</td>
                <td className="border border-gray-300 px-4 py-2">$0.005 per transferred point</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Transfer of Rewards from Merchant</td>
                <td className="border border-gray-300 px-4 py-2">Merchant</td>
                <td className="border border-gray-300 px-4 py-2">$0.005 per transferred point</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Reward credit applied to Purchase</td>
                <td className="border border-gray-300 px-4 py-2">Merchant</td>
                <td className="border border-gray-300 px-4 py-2">$22.50 per $25 reward credit applied</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Reward credit applied to Purchase</td>
                <td className="border border-gray-300 px-4 py-2">JVC</td>
                <td className="border border-gray-300 px-4 py-2">$2.50 per $25 reward credit applied</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Termination of JVC Agreement</td>
                <td className="border border-gray-300 px-4 py-2">Merchant</td>
                <td className="border border-gray-300 px-4 py-2">$0.005 per outstanding point</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-300">
          <p className="text-xs text-gray-600 italic">
            This document is a preview of the JVC Merchant Agreement. For questions, contact
            Joint Venture Card at support@jointventurecard.com.
          </p>
        </div>
      </div>
    ) : (
      <p className="text-sm text-gray-500 italic">No Schedule “E” data provided.</p>
    )}
  </div>
</Card>

        {/* ===================== LEGAL VENUE / ARBITRATION REMINDERS ===================== */}
        {/* <PageBreak label="Jurisdiction & Arbitration" />
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <SectionHeader>Governing Law; Severability</SectionHeader>
              <Line>
                This Agreement shall be governed by and construed in accordance with the laws of the
                State of <strong>{governingLaw}</strong>.
              </Line>

              <SectionHeader>Jurisdiction and Venue</SectionHeader>
              <Line>
                ANY SUIT, COUNTERCLAIM, ACTION OR PROCEEDING ARISING OUT OF OR RELATING TO THIS
                AGREEMENT MUST BE BROUGHT IN THE COURTS OF THE STATE OF <strong>{governingLaw}</strong>.
              </Line>

              <SectionHeader>Arbitration</SectionHeader>
              <Line>
                Unless otherwise required, the arbitration hearing will be conducted in the federal
                judicial district where JVC accepted and executed the Agreement ({arbVenue}).
              </Line>
            </div>
          </div>
        </Card> */}
      </div>
    </div>
  );
};

export default MerchantAgreementPreview;

