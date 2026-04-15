import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CreditCardAgreementPreview = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* First Page */}
        <Card className="bg-white p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Joint Venture Card - Consumer Credit Card Agreement
              </h2>
              <p className="text-sm text-gray-600">
                Last updated Dec 30, 2025
              </p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4 text-sm leading-relaxed">
              {/* <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Updates To This Policy
              </h3> */}
              <p>
                This Consumer Credit Card Agreement applies to your credit card account with the Joint Venture Card 
                entity shown in the Account Opening Disclosure (the “Account” and “Joint Venture Card”). 
                A “Card” is any credit card or other single credit device, including any virtual credit device, 
                that may be used from time to time to obtain Account credit. The words “we,” “us,” and “our” mean 
                Joint Venture Card, its assigns and successors, and their respective agents and service providers. 
                The words “you” and “your” mean each person who is granted, who accepts, or who uses the Account or 
                Card in any way, as well as any person who guarantees payment of the Account. Other capitalized terms 
                are generally defined below with their first use. When the Consumer Credit Card Agreement says we “may” 
                take an action, this means we are authorized to take that action in our sole discretion, subject only 
                to the restrictions or requirements that are established by law or the express terms of the Agreement.
              </p>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Your Contract With Us; When It Becomes Effective
                </h3>
                <p>
                  Our contract with you for the Account is set forth in and governed by: (1) this document, called the 
                  Consumer Credit Card Agreement; (2) the Account terms and conditions disclosed when you applied for the 
                  Account and through the Account Opening Disclosures and other written materials provided with the Card and 
                  Consumer Credit Card Agreement; and (3) any changes we may make to these documents, disclosures, and terms in 
                  the future in accordance with the Consumer Credit Card Agreement and applicable law, including those we may 
                  disclose from time to time for promotional reasons and non-promotional reasons. Together, these documents, 
                  disclosures, and terms are our “Agreement” with you for the Account and Card. Please read the Agreement 
                  carefully and keep it for future reference. You understand and agree that your Agreement with us becomes 
                  effective the first time you or any Authorized User activates a Card or otherwise uses a Card or the 
                  Account in any way. If we do not exercise or delay in exercising our rights under this Agreement, this 
                  does not mean we are unable to exercise those rights at a later time. If any provision of this Agreement
                  is found to be invalid, the remaining provisions will continue to be effective. 
                  We use section headings (e.g., Balance Categories) to organize this Agreement. The headings are for reference 
                  purposes only.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Changes to the Agreement
                </h3>
                <p>
                  You may not change the Agreement with us, unless one of our authorized officers expressly agrees 
                  to do so in a signed writing. We may add, delete, or change provisions in the Agreement at any time, 
                  after we provide any notice, wait any time period, and give you any opportunity to reject that may be
                  required by applicable law. If we notify you of changes, we will send you a separate notice or inform 
                  you on your Statement. If we notify you about the right to reject a change, and you do so as described 
                  in our change in terms notice, we may terminate your right to receive Account credit and require you 
                  to return all Cards and Account credit devices as a condition of rejecting the change. Our reasons for 
                  amending the Agreement may be based on factors that include:  (i) changes in applicable law or how it 
                  is interpreted and enforced; (ii) changes in how you maintain, use and perform in connection with this
                  Account or with the accounts you maintain with other parties, based on our own servicing records and 
                  information we obtain from consumer reporting agencies and other legitimate information sources, such 
                  as your employer and other financial 
                  institutions; and/or (iii) changes in market conditions, product design, and our own business and risk management needs. 
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Page Break Visual Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-t-2 border-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm font-medium">Page 1 of 9</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div className="flex-grow border-t-2 border-gray-300"></div>
          </div>
        </div>

        {/* Second Page */}
        <Card className="bg-white p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Balance Categories
                </h3>
                <p>
                  “Balance Categories” are the different Account segments we may establish with different interest charges, 
                  fees, grace periods or other terms. The Balance Categories of your Account include Purchases and Promotional Offers. 
                  We reserve the right to decide which Balance Category applies to each Account transaction based 
                  on the information we receive from merchants, other financial institutions, and card networks, and our decision is final. 
                </p>
                <p>
                  A “Purchase” means the property, rights, goods and services you or an Authorized User may purchase, rent, or 
                  otherwise obtain directly from merchants and vendors by using a Card or the Account. The Account transactions 
                  we treat as “Purchases” include Account Fees.  
                </p>
                <p>
                  A “Promotional Offer” means transactions and balances that post to your Account subject to unique interest charges, 
                  fees, repayment and other terms that we may disclose from time to time for promotional and other reasons. 
                  The terms disclosed with the Promotional Offer explain associated interest charges and repayment terms
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Protecting Your Personal Information
                </h3>
                <p>
                  We use security measures that comply with applicable federal
                  and state laws to protect personal information from
                  unauthorized access and use. Security measures may include
                  device safeguards and secured files and buildings, as well as
                  oversight of our third-party providers to ensure personal
                  information remains confidential and secure.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Cards and Account Access Devices 
                </h3>
                <p>
                  You and an Authorized User may use a Card and other Account access devices for Purchases and 
                  Promotional Offers, as permitted by the Agreement and applicable law. The Card is valid through 
                  the expiration date shown on the front. The Card is our property and you agree to return it to us 
                  or destroy it, if we ask. We may replace a Card with another Card at any time, subject to applicable law. 
                  Each Card must be signed before it is used. If a personal identification number (PIN) is associated with a 
                  Card when the Account is opened, you may have to use the PIN for Purchases at certain merchant terminals. 
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Mobile Devices
                </h3>
                <p>
                  Certain smart telephones, tablets and other mobile devices (each, a “Mobile Device”) can store, 
                  access and/or use information about a Card and the Account in different ways (for example, through a 
                  digital wallet or other application on the Mobile Device that may allow you to make Purchases). 
                  In some cases, the Mobile Device may essentially function as a credit card itself. In other cases, 
                  the transactions made with the Mobile Device may replicate use of the Card and Account information for 
                  online or in-person transactions with merchants. The applications that allow you to use a Mobile Device 
                  for these transactions are from third parties not affiliated with us and may have unique terms and conditions. Read these terms and terms carefully to understand how their rules may govern your use of the Mobile Device and its applications. Any Account transaction you make by using a Mobile Device and these applications are governed as ordinary transactions on your Account under this Agreement. When information about a Card or the Account is accessible through a Mobile Device, you should treat the Mobile Device with the same care used for a Card itself. It is important that you secure Mobile Devices from unauthorized access and use. Remember, when you give a Mobile Device to anyone else, it is essentially the same as giving a Card to that person. 
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Credit Limits and Credit Availability
                </h3>
                <p>
                  We will disclose information about the credit limits that apply to your Account when we open it.
                   Your Statements will also disclose information about your Account credit limits. We may assign different 
                   credit limits for the different Balance Categories of your Account. We may raise, lower, restrict, or 
                   cancel the credit limit that applies to any Balance Category or the Account itself at any time based on 
                   various factors and reasons, subject to any notices that are required by law. This will not affect your 
                   obligation to pay us. You must keep track of your Account balances and available credit, including the 
                   credit that remains available for Account transactions that are authorized and made after the closing date 
                   of the most recent billing cycle. You agree not to allow your Account to go over any credit limit. 
                   We may honor transactions above your credit limits, but, if we do, this will not increase your credit limit 
                   and we may require that you make immediate payment to us of the full overlimit amount. 
                   Read these terms and terms carefully to understand how their rules may govern your use of the 
                   Mobile Device and its applications. Any Account transaction you make by using a Mobile Device and these 
                   applications are governed as ordinary transactions on your Account under this Agreement. 
                   When information about a Card or the Account is accessible through a Mobile Device, you should treat the 
                   Mobile Device with the same care used for a Card itself. It is important that you secure Mobile Devices 
                   from unauthorized access and use. Remember, when you give a Mobile Device to anyone else, it is essentially 
                   the same as giving a Card to that person. 
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Page Break Visual Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-t-2 border-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm font-medium">Page 2 of 9</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div className="flex-grow border-t-2 border-gray-300"></div>
          </div>
        </div>

        {/* Third Page */}
        <Card className="bg-white p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Account Use Restrictions
                </h3>
                <p>
                  You and any Authorized User may use the Account only for personal, family, or household purposes,
                  and not for business or commercial purposes. You may not use this Account to make a payment on this
                  or any other credit account with us or our affiliates. You promise that your Account will be used only
                  for transactions that are legal where and when you conduct them. We will not be liable if you engage in
                  an illegal transaction and you will be liable for any such transactions charged to your Account.
                  You may not use your Account to conduct transactions in any country or territory, or with any individual
                  or entity that is subject to economic sanctions administered and enforced by the U.S. Department of the
                  Treasury's Office of Foreign Assets Control (OFAC). Use of your Account in those countries will be blocked.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Interest Charges
                </h3>
                <p>
                  This section explains how we use periodic interest rates, called Annual Percentage Rates ("APRs"), to determine the interest charges that apply to your Account. For each APR that applies to your transactions, we will calculate a corresponding Daily Periodic Rate ("DPR") that is used to determine interest charges. Each applicable DPR will equal the APR divided by 365.  Please review this section and the Account Opening Disclosures for more information about the APRs that apply to your Account.
                </p>
                <br/>
                <p>
                  <u>Variable APRs:</u>  We calculate variable APRs by adding a published index rate to a margin. The index rate we presently use is based on the Federal funds rate published by the Board of Governors of the Federal Reserve System in its Statistical Release H.15 Selected Interest Rates and in effect as of the first day of the month immediately preceding the first day of the billing cycle in which interest is charged. If the Federal Reserve System ceases publication of the Federal funds rate, we may, in our sole discretion, designate a substantially equivalent index.
                </p>
                <br/>
                <p>An increase or decrease in the published index rate will cause a corresponding increase or decrease in your variable APRs on the first day of the billing cycle that begins in the month after the one in which the index rate is published. If the index rate increases, your interest charges and the Minimum Payment due after each billing cycle will also increase. </p>
                <br/>
                <p>
                  <u>Calculation and Billing of Interest Charges:</u>  The periodic statements we prepare after a billing cycle (each, a "Statement") will disclose important information about your Account transactions, payments, and amounts due for interest charges and Account Fees. A billing cycle is a time period that ends on a Statement closing date that we determine and that begins on the day after the Statement closing date of the previous billing cycle. Each Statement reflects a single billing cycle.
                </p>
                <br/>
                <p>
                  To calculate interest charges, we multiply each Balance Subject to Interest Rate shown on the Statement by its applicable daily periodic rate (DPR) and then multiply the result by the number of days in the billing cycle. When applicable and as described in this section, interest charges accrue daily on new transactions and balances remaining from previous billing cycles.
                </p>
                <br/>
                <p><u>When Interest Begins; No Grace Period:</u>  The "New Balance" on your Statement is the total billed amount on your Account as of the closing date of each billing cycle. The term "Paid in Full" means payments and credits in a billing cycle that equal or exceed the previous billing cycle's New Balance (excluding credits we may apply to comply with applicable law, such as the Military Lending Act or Truth in Lending Act). The "Payment Due Date" shown on a Statement will be at least 21 days after the Statement closing date and will generally fall on the same calendar day of each month. </p>
                <br/>
                <p>Each Purchase begins to accrue interest charges on its posting date. There is no grace period. You can avoid interest charges by making a payment in the amount of, and on the date of, your Purchase. You can do this by using the Pay Now option when making a Purchase.  </p>
                <br/>
                <p><u>Balances Subject to Interest Rate: </u>
                <br/>
                <i>Average Daily Balance Method (including new Purchases):</i> For each APR that applies to your transactions, we calculate a separate Balance Subject to an Interest Rate by: (a) calculating a daily balance for each day in the current billing cycle; (b) adding all the daily balances together; and (c) dividing the sum of the daily balances by the number of days in the current billing cycle.  To calculate the daily balance of these Purchase balances for each day in the current billing cycle, we: (1) take the beginning balance; (2) add new Purchases, including any new Account Fees treated as Purchases; and (3) subtract applicable payments and credits. If any daily balance is less than zero, we treat it as zero.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Page Break Visual Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-t-2 border-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm font-medium">Page 3 of 9</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div className="flex-grow border-t-2 border-gray-300"></div>
          </div>
        </div>

        {/* Fourth Page */}
        <Card className="bg-white p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Other Account Fees and Charges
                </h3>
                <p><u>Account Fees: </u> We treat the following fees (“Account Fees”) as Purchases for purposes of calculating interest charges, meaning the DPR for Purchases applies to these Account Fees. </p>
                <br/>
                <p><i>Application & Annual Membership Fees: </i> Where permitted by applicable law, an Application or Annual Fee may be required and will be disclosed on the accompanying Account Opening Disclosures. The Application Fee will be imposed in connection the submission of an application. The Annual Fee will be assessed when the Account is opened and annually on or near each anniversary of the Account opening date, so long as your Account remains open to new transactions. </p>
                <br/>
                <p><i>Late Payment Fees: </i> If we do not receive at least the Minimum Payment Due by its Payment Due Date, we will charge your Account a Late Payment Fee in the amount shown in the accompanying Account Opening Disclosures or the amount of your Minimum Payment Due, whichever is less. If a Late Payment Fee and a Returned Payment Fee both may be due based on a single event or transaction, we will assess either the Late Payment Fee or Returned Payment Fee, but not both of them for any single event or transaction. </p>
                <br/>
                <p><i>Returned Payment Fees:</i> If any form of Account payment is not paid for any reason by your depository institution or financial services provider, we will charge your Account a Returned Payment Fee in the amount shown in the accompanying Account Opening Disclosures or the amount of your Minimum Payment Due, whichever is less. We may charge this Returned Payment Fee if an Account payment is returned unpaid by your depository institution or financial services provider, even if that institution or provider later allows this payment. If a Late Payment Fee and a Returned Payment Fee both may be due based on a single event or transaction, we will assess either the Late Payment Fee or Returned Payment Fee, but not both of them for any single event or transaction.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Your Promises
                </h3>
                <p>You promise to do everything the Agreement requires of you, so long as the Account has an unpaid balance, remains open to future transactions, or both.  You promise to pay us all amounts due on your Account and under the Agreement, now and in the future. The amounts you promise to pay in connection with your Account includes all Account transactions in each Balance Category that are made by any of you and any Authorized User, plus all Account Fees and all interest charges, as described in the Agreement. All persons who initially or subsequently request, are granted, accept, guarantee or use the Account are individually and together responsible for any total outstanding balance. If you are responsible to pay any total outstanding balance, we may refuse to release you from liability until all of the Cards, access checks, and other credit devices outstanding under the Account have been returned to us and you repay us the total outstanding balance owed to us under the terms of this Agreement.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Payments
                </h3>
                <p><u>Minimum Payment Due; Other Payments: </u> You may pay the total outstanding balance of your Account at any time. After each billing cycle, you must pay at least the Minimum Payment Due shown on your Statement by its Payment Due Date. You must still pay at least the Minimum Payment Due after each billing cycle, even if you paid more than the Minimum Payment Due for any previous billing cycle.  The Minimum Payment Due for each billing cycle is the sum of the following amounts:  (1) all interest charges and Account Fees that have accrued and are unpaid as of the Statement closing date; plus (2) 3.00% of the New Balance shown on your Statement as of the closing date of the billing cycle; plus (3) any Minimum Payment Due for an earlier billing cycle that remains unpaid and past due; plus (4) any amount by which your Account is overlimit. If the sum of these amounts after any billing cycle is $15.00 or less, the Minimum Payment Due will be $15.00 or the New Balance, whichever is less. We may round the payment amount to the nearest whole dollar. The Minimum Payment Due will not be greater than your New Balance. If a payment is credited to your Account but is returned unpaid in a later billing cycle, we will recalculate the Minimum Payment Due for the billing cycle in which the payment was originally credited. If you overpay or if there is a credit balance on your Account, we will not pay interest on such amounts.</p>
                <br/>
                <p><u>Payment Requirements and Posting: </u> Your payments to us must be in U.S. dollars from a U.S. deposit account and must otherwise be acceptable to us. We do not accept cash payments through the mail. You may not make Account payments with funds borrowed from your Account or any other credit account with us. You may not use a postdated check to make a payment. If you do postdate a payment check, we may elect to honor it upon presentment or return it uncredited to the person that presented it, without in either case waiting for the date shown on the check. We are not liable to you for any loss or expense arising out of the action we elect to take.</p>
                <br/>
                <p>You agree to follow the payment requirements we disclose on Statements from time to time. Any payment method that we promote, such as payments you authorize by electronic fund transfer will be credited to your Account on the day we receive it. Mailed payments must be mailed to us at the address for payments shown on your Statement, unless we expressly instruct you to make payments at a different address. A mailed payment will be credited to your Account on the day we receive it, if you send the payment coupon from your Statement in the same envelope with your payment or include your Account number on your payment, and your payment arrives at the address we specify no later than the due date indicated on your Statement. If your due date falls on a day when we do not receive payments, any payment we receive the next day that conforms to these payment requirements will not be treated as late. Please allow at least five (5) days for postal delivery. Unless we or our agents specifically instruct you to make payment in a different manner, payments received at any other location or in any other form may not be credited for up to five (5) days. This may cause you to be charged late payment fees and additional interest charges. </p>
                <br/>
                <p><u>Payment Processing: </u> We reserve the right to reject any payment if your Account has a credit balance as of the day we receive that payment. Generally, credits to your Account, such as those generated by merchant refunds, are not treated as payments. We may accept and process payments without losing any of our rights. Even if we apply a payment to your Account, we may delay the availability of credit in your Account until we confirm your payment has cleared. We may adjust your Account as necessary to correct errors, to process returned and reversed payments, and to handle similar issues. An “Item” means a check, draft, money order or other negotiable instrument you use to pay your Account, including any image of these instruments. When you provide an Item as payment, you authorize us either to use information from your Item to make a one-time electronic fund transfer from your deposit account or to process the payment as a check transaction. When we use information from your Item to make an electronic funds transfer, funds may be withdrawn from your deposit account as soon as the same day your payment is received, and you will not receive your Item back from your financial institution. You may contact us and ask that we not process your future Items in this way. If we process the payment as a check transaction, you understand and agree that we may convert your Item into an electronic image that can be collected from your depository institution as a substitute check. We will not be responsible if an Item you provide has physical features that, when imaged, result in it not being processed as you intended. <b>Any Item that has restrictive words, conditions, limitations or special instructions (including Items marked with the words “Paid in Full” or similar language), and all accompanying communications, must be mailed to us at Joint Venture Card, Attn: Legal Department, P.O. Box 1365, Monterey, CA 93942. </b>  If you make your payment or send any accompanying communications to any other address, we may accept and process the payment, without losing any of our rights.</p>
                <br/>
                <p><u>How We Allocate Payments: </u> We generally apply your payment of the Minimum Payment Due in the following order: interest, fees, Balance Categories with lower APRs, and Balance Categories with higher APRs. We apply any portion of a payment that exceeds your Minimum Payment Due to the Balance Categories with higher Annual Percentage Rates before the Balance Categories with lower Annual Percentage Rates, except as otherwise required by law. If a payment is returned, we reserve the right to debit the returned payment amount to the balance subject to the current non-promotional rate for Purchases on the Account. </p>
                <br/>
                <p><u>Modifications to Minimum Payments Due: </u> We may allow you, from time to time, to omit a monthly payment or make a reduced payment. We will notify you when these options are available. This will only occur on an isolated basis, such as when we are working with borrowers affected by a federally declared disaster. If, in response to this notification, you omit a payment or make a reduced payment, interest charges, Account Fees and other regular terms will apply to your Account in accordance with this Agreement. The reduced payment amount may be less than your interest charges. You must make the reduced payment on time to avoid a Late Fee. You must resume making your regular Minimum Payment Due each month following any modifications made to your required minimum monthly payment.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Events of Default; Our Rights and Remedies
                </h3>
                <p>Except to the extent limited by applicable law, we may consider you in default of the Agreement if: (1) you do not make at least the Minimum Payment Due after a billing cycle by its Payment Due Date; (2) you exceed an assigned credit limit; (3) a bankruptcy or other insolvency proceeding is filed by you or on your behalf; (4) you die or are legally declared incompetent or incapacitated; (5) we determine, in our sole discretion, that you made a materially false, incomplete or misleading statement on any of your Account documentation, or you otherwise tried to defraud us; (6) you do not comply with any term of this Agreement or any other agreement with us; or (7) you permanently reside outside the United States. Paying the interest charges and Account Fees then due for your Account will not, by itself, cure the default.  Unless the law requires us to notify you and wait before we may take action, you understand and agree that we may, after any event of default and without advance notice to you, take any one or more of the following actions: (A) close or suspend your Account; (B) lower your credit limits; (C) increase your Minimum Payment Due; (D) demand that you immediately pay the entire balance owing on your Account; (E) continue to charge you interest charges, and Account Fees as long as your Account balance remains outstanding; and/or (F) exercise any rights and remedies that the law allows to creditors following a default, which includes to filing of a lawsuit against you. You agree to pay us all of our collection expenses to the extent permitted by applicable law, including but not limited to reasonable attorney’s fees that we incur after referring your Account for collection to an attorney who is not our salaried employee.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Closing or Suspending Your Account
                </h3>
                <p>You may ask us to close your Account at any time by calling or writing us at the address for customer service as described on your Statement.  If you do, we may provide you with additional details about this process and request certain information from you, including payment information. If a Card is used or charges post to your Account after you ask us to close it, we may keep your Account open or reopen it. We may close or suspend your Account and your right to obtain credit from us.  We may do this at any time and for any reason, as permitted by law, even if you are not in default. A suspension of your Account may be permanent or temporary. If your Account is closed or suspended for any reason, you and all Authorized Users must stop using the Cards and Account immediately. You must also cancel all recurring charges or similar billing arrangements connected with the Account.  We will not do this for you. If we close or permanently suspend your Account, you must also destroy all Cards or return them to us as we instruct. You must still pay us all amounts you owe on the Account, even if these amounts are charged after your Account is closed or suspended.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Refusal to Honor Your Account
                </h3>
                <p>We may deny any transactions for any reason at our discretion. We are not liable for any refusal to honor your Account. This can include a refusal to honor your Card or Account number. We are not liable for any retention of your Card by us, any other financial institution, or any provider of goods or services.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Page Break Visual Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-t-2 border-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm font-medium">Page 4 of 9</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div className="flex-grow border-t-2 border-gray-300"></div>
          </div>
        </div>

        {/* Fifth Page */}
        <Card className="bg-white p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Security Agreement
                </h3>
                <p><i>This section (the “Security Agreement”) only applies if your Joint Venture Card is identified as a Secured Card in your Account Opening Disclosure.</i> </p>
                <br/>
                <p>You must provide a security deposit in U.S. dollars (“Security”) from a deposit account to secure the obligations to us that you incur in connection with your Joint Venture Card. Security may be added to your Security Account by making a payment on your Joint Venture Card when there is a zero dollar ($0.00) balance. </p>
                <br/>
                <p>All Security will be held in a Security Account.  We will maintain separate records of your Security Account. The Security Account is insured by the Federal Deposit Insurance Corporation to the extent permitted by law. Subject to this Security Agreement, you will be the beneficial owner of the Security Account for purpose of FDIC insurance. We will not send statements for the Security Account. </p>
                <br/>
                <p>We may allow you to add additional Security to the Security Account in order to grant an increase of your credit limit in our sole discretion. You may not withdraw Security from the Security Account unless your Joint Venture Card is closed and paid to a zero-dollar ($0.00) balance.</p>
                <br/>
                <p>We will not pay interest on the Security Account. You grant us, as of the date you deliver Security to us, a security interest in the Security, any additions to the Security, and any proceeds of the Security (“Collateral”) to secure your performance of the Joint Venture Card. You irrevocably and unconditionally relinquish possession and control over the Collateral, and you pledge and assign as security to us all of your right, title and interest in it. You must take action we request to perfect or protect our first lien position security interest in the Collateral. You waive the benefit of any homestead or other exemptions in the Collateral. </p>
                <br/>
                <p>If you are in default of your Joint Venture Card under this Agreement or your Joint Venture Card is closed for any reason, you authorize us to withdraw Collateral from the Security Account and apply such amounts to the Joint Venture Card sufficient to resolve the default, until the Collateral is exhausted, without sending you notice or demand for payment as permitted by applicable law. We may do this in addition to any other rights we have under the law or the Agreement. The application of Collateral to your Joint Venture Card will not change your minimum payment amount. You are responsible for the repayment of any outstanding balance on your Joint Venture Card that is not satisfied by the application of Collateral. We may take up to sixty (60) days after your account is closed with no outstanding balances to return any excess Collateral to you. </p>
                <br/>
                <p>You represent that there are no current lawsuits or bankruptcy proceedings that might affect our interest in the collateral and that you have not and will not attempt to transfer any interest in the Collateral to any other person or offer the Collateral as security for any other obligation. </p>
                <br/>
                <p>If any other person seeks to attach the Collateral, for example by legal garnishment, you agree that we may deem the balance of the Joint Venture Card immediately payable and apply the Collateral as payment of the Joint Venture Card. </p>
                <br/>
                <p>If we must hire an attorney to defend or enforce our rights under this Security Agreement or to perform any legal services in connection with this Security Agreement, You will pay our reasonable attorneys’ fees and court costs, unless the law does not allow us to collect these amounts. </p>
                <br/>
                <p>If there is no activity on your Account for a prescribed period of time (generally five years) and we are unable to locate you after making good faith attempts to return the Collateral you, the Collateral may be presumed to have been abandoned and will escheat to and become the property of Nevada or another applicable state. We will notify you if required by law prior to escheating any Collateral held under this Security Agreement,</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Military Lending Act Disclosure
                </h3>
                <p>Certain members of the Armed Forces and their dependents (“Covered Borrowers”) are protected by the federal Military Lending Act, 10 U.S.C. §987, and its implementing regulations, 32 C.F.R. Part 232 (“MLA”). This section applies only to Covered Borrowers.</p>
                <br/>
                <p><u>Statement of Military Annual Percentage Rate (“MAPR”):</u> Federal law provides important protections to members of the Armed Forces and their dependents relating to extensions of consumer credit. In general, the cost of consumer credit to a member of the Armed Forces and his or her dependent may not exceed an Annual Percentage Rate of 36%. This rate must include, as applicable to the credit transaction or account:  (1) the costs associated with credit insurance premiums; (2) fees for ancillary products sold in connection with the credit transaction; (3) any application fee charge (other than certain application fees for specified credit transactions or accounts); and (4) any participation fee charged (other than certain participation fees for a credit card account). </p>
                <br/>
                <p><u>Oral Disclosures: </u> To hear important MLA disclosures and payment information provided in this Agreement, please call (855) 588-3688.</p>
                <br/>
                <p>If you are a Covered Borrower as defined by the MLA, any waiver of your right to legal recourse under any state or federal law, and any other provision in this Agreement that is unenforceable against you under the MLA, does not apply to you.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Telephone Calls, Monitoring and Recording
                </h3>
                <p>You consent to and authorize Joint Venture Card of California, any of its affiliates, its marketing associates, and independent contractors including servicers, vendors and collection agents, to monitor and/or record any of your telephone conversations and other electronic communications with our representatives or the representatives of any of those companies for reasonable business purposes including security and quality assurance. We will not remind you that we may be monitoring or recording a call at the outset of the call unless required by law to do so. </p>
                <br/>
                <p>Where you have provided a cell phone number directly to us, you consent and agree to accept servicing calls and text messages to your cell phone from us. For example, we may place calls to you about fraud alerts or amounts you owe us (collection calls) on your Account. For any telephone or cell phone calls/communications we place to you, including SMS or text messages, you consent and agree that those calls may be automatically dialed and include prerecorded messages or texts. This includes communications from companies working on our behalf to service your Account. Message and data rates may apply.</p>
                <br/>
                <p>If you do not want to receive automatically dialed communications for this Account, including prerecorded messages or texts, as described above, you must:  (1) provide us with written notice revoking your prior consent; and (2) in that written notice, include your name and mailing address as they appear on the Account, and the last four digits of your Account number.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Consumer Reports
                </h3>
                <p> We may provide information about you and the Account to consumer reporting agencies.  We may also provide information about you and the Account to others as described in this Agreement and our privacy notices. Information we provide about the Account may appear on consumer reports about you and any Authorized Users.  This could include negative information if you do not comply with the terms of this Agreement. We may obtain and use credit and income information about you from consumer reporting agencies and others, as the law allows. </p>
                <br/>
                <br/>
                <p><b>If you believe we have reported inaccurate information about you to a consumer reporting agency, notify us in writing at: Joint Venture Card, Attn: Disputes Department, P.O. Box 1365, Monterey, CA 93942. </b>  In doing so, identify yourself, your Account, the information you believe is inaccurate, and tell us why you believe the information is incorrect. If you have supporting documents or information, such as a copy of a consumer report that includes information you believe is inaccurate, please send us the supporting documents and information, too.</p>

              </div>
            </div>
          </div>
        </Card>

        {/* Page Break Visual Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-t-2 border-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm font-medium">Page 5 of 9</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div className="flex-grow border-t-2 border-gray-300"></div>
          </div>
        </div>

        {/* Sixth Page */}
        <Card className="bg-white p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Benefits
                </h3>
                <p>
                  We may offer you certain benefits and services with your Account. Any benefits or services are not a part of this Agreement, but are subject to the terms and restrictions outlined in the Benefits Guide and other official documents provided to you from time to time by or on behalf of Joint Venture Card of California. We may adjust, add, or delete benefits and services at any time and without notice to you.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Account Transfer and Assignment
                </h3>
                <p>
                  This Agreement will be binding on and benefit any of your and our successors and assigns. You may not transfer your Account or your Agreement to someone else without our written permission. We may transfer your Account, our rights and responsibilities under this Agreement, and/or the unpaid balances of your Account to another company or person at any time, without your permission and without advance notice to you. If this happens, any such company or person will take our place under this Agreement. You must pay them and perform all of your obligations to them and not us. If you pay us after you are informed or learn that we have transferred your Account or this Agreement, we may return the payment to you, forward the payment to the other company or person, or take any other action in our sole discretion.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Required Account Information 
                </h3>
                <p>
                  We must have complete, current and valid information about you to provide your Account. We may also ask you for similar information about any Authorized Users. You must tell us when this information changes. To do this, contact us in writing at the address shown on your most recent Statement, use the appropriate area of any Account web site we maintain for this purpose, or call us at the customer service telephone number shown on your most recent Statement or on the back of your Card. We may require that you provide additional documents that are acceptable to us so that we can verify this information and any changes. We may restrict or close your Account, if we are unable to verify your information or you do not provide the additional information we request. We may also change your address if so notified by the post office or others.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What Law Applies 
                </h3>
                <p>
                  The interpretation and enforcement of this Agreement shall be governed by federal law and, unless preempted by federal law, by the laws of the state shown in the Account Opening Disclosure, without regard to conflict of law principles. If any part of this Agreement is found to be unenforceable or invalid, the remaining parts will remain in effect. 
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Disputed Transactions; Lost or Stolen Cards; Unauthorized Use. 
                </h3>
                <p>
                  You must promptly inspect each Statement you receive and tell us about any errors or questions you have, as described in the “Billing Rights” section of your Statement and this Agreement.  If you do not notify us as provided in these disclosures, you agree that we may assume that all information in the Statement is correct. You must take reasonable steps to prevent the unauthorized use of your Card and Account. If you notice the loss or theft of your Card, or a possible unauthorized use of your Card, you should write to us immediately at the address provided on your Statement or call us at the telephone number provided on your Statement. You will not be liable for any unauthorized use that occurs after you notify us.  You may, however, be liable for unauthorized use that occurs before your notice to us. In any case, your liability will not exceed $50 (or any lesser amount required by law). 
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Your Billing Rights: Keep This Document For Future Use 
                </h3>
                <p>This notice tells you about your rights and our responsibilities under the Fair Credit Billing Act. </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What To Do If You Find A Mistake On Your Statement 
                </h3>
                <p>If you think there is an error on your Statement, write to us at:  </p>
                <br/>
                <p>Joint Venture Card, Attn: Legal Department, P.O. Box 1365, Monterey, CA 93942. In your letter, give us the following information: </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>Account information: Your name and Account number. </li>
                  <li>Dollar amount: The dollar amount of the suspected error. </li>
                  <li>Description of problem: If you think there is an error on your bill, describe what you believe is wrong and why you believe it is a mistake. </li>
                
                </ul>
                <br/>
                <p>You must contact us: </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>Within 60 days after the error appeared on your Statement. </li>
                  <li>At least 3 business days before an automated payment is scheduled, if you want to stop payment on the amount you think is wrong. </li>
                </ul>
                <br/>
                <p>
                  You must notify us of any potential errors in writing. You may call us, but if you do we are not required to investigate any potential errors and you may have to pay the amount in question.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Page Break Visual Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-t-2 border-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm font-medium">Page 6 of 9</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div className="flex-grow border-t-2 border-gray-300"></div>
          </div>
        </div>

        {/* Seventh Page */}
        <Card className="bg-white p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What Will Happen After We Receive Your Letter
                </h3>
                <p>When we receive your letter, we must do two things:</p>

                <ol>
                  <li>
                    1.  Within 30 days of receiving your letter, we must tell you that we received
                    your letter. We will also tell you if we have already corrected the error.
                  </li>
                <li>
                    2.  Within 90 days of receiving your letter, we must either correct the error or
                    explain to you why we believe the bill is correct.
                </li>
              </ol>
              <br/>

              <p>
                While we investigate whether or not there has been an error:
              </p>

              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                <li>
                  We cannot try to collect the amount in question, or report you as delinquent
                  on that amount.
                </li>
                <li>
                  The charge in question may remain on your statement, and we may continue to
                  charge you interest on that amount.
                </li>
                <li>
                  While you do not have to pay the amount in question, you are responsible for
                  the remainder of your balance.
                </li>
                <li>
                  We can apply any unpaid amount against your credit limit.
                </li>
              </ul>
              <br/>

              <p>
                After we finish our investigation, one of two things will happen:
              </p>

              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                <li>
                  <i>If we made a mistake:</i> You will not have to pay the amount in
                  question or any interest or other fees related to that amount.
                </li>
                <li>
                  <i>If we do not believe there was a mistake:</i> You will have to
                  pay the amount in question, along with applicable interest and fees. We will
                  send you a statement of the amount you owe and the date payment is due. We may
                  then report you as delinquent if you do not pay the amount we think you owe.
                </li>
              </ul>
              <br/>

              <p>
                If you receive our explanation but still believe your bill is wrong, you must
                write to us within 10 days telling us that you still refuse to pay. If you do
                so, we cannot report you as delinquent without also reporting that you are
                questioning your bill. We must tell you the name of anyone to whom we reported
                you as delinquent, and we must let those organizations know when the matter has
                been settled between us.
              </p>
              <br/>

              <p>
                If we do not follow all of the rules above, you do not have to pay the first
                $50 of the amount you question even if your bill is correct.
              </p>

              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Your Rights If You Are Dissatisfied With Your Credit Card Purchases  
                </h3>
                <p>
                  If you are dissatisfied with the goods or services that you have purchased
                  with your credit card, and you have tried in good faith to correct the problem
                  with the merchant, you may have the right not to pay the remaining amount due
                  on the purchase.
                </p>
                <br/>

                <p>
                  To use this right, all of the following must be true:
                </p>
                <br/>

                <ol>
                  <li>
                    1. The purchase must have been made in your home state or within 100 miles of
                    your current mailing address, and the purchase price must have been more than
                    $50. (Note: Neither of these are necessary if your purchase was based on an
                    advertisement we mailed to you, or if we own the company that sold you the
                    goods or services.)
                  </li>
                  <br/>
                  <li>
                    2. You must have used your credit card for the purchase. Purchases made with
                    cash advances from an ATM or with a check that accesses your credit card
                    account do not qualify.
                  </li>
                  <br/>
                  <li>
                    3. You must not have fully paid for the purchase.
                  </li>
                </ol>
                <br/>
                <p>
                  If all of the criteria above are met and you are still dissatisfied with the
                  purchase, contact us in writing at: Joint Venture Card, Attn: Disputes
                  Department, P.O. Box 1365, Monterey, CA 93942.
                </p>
                <br/>
                <p>
                  While we investigate, the same rules apply to the disputed amount as discussed
                  above. After we finish our investigation, we will tell you our decision. At
                  that point, if we think you owe an amount and you do not pay, we may report you
                  as delinquent.
                </p>

              </div>
            </div>
          </div>
        </Card>

        {/* Page Break Visual Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-t-2 border-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm font-medium">Page 7 of 9</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div className="flex-grow border-t-2 border-gray-300"></div>
          </div>
        </div>

        {/* Eighth Page */}
        <Card className="bg-white p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  4-Pay Promotional Offer Terms
                </h3>
                <p>We may give you the option to complete a Purchase with a 4-Pay Promotional Offer. You are not required to accept a 4-Pay Promotional Offer to make a Purchase, and 4-Pay Promotional Offers may not always be available to you. Each 4-Pay Promotional Offer is subject to these terms and any additional terms that may be provided when you accept the offer. If you accept multiple 4-Pay Promotional Offers, you may have more than one 4-Pay Promotional Balance at a given time</p>

              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  4-Pay Interest Charges 
                </h3>
                <p>Each Purchase subject to a 4-Pay Promotional Offer creates a <b>“4-Pay Purchase Balance”</b> which will be subject to your standard purchase rate. </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  4-Pay Repayments & Bonus Rewards
                </h3>
                <p>
                  When you accept a 4-Pay Promotional Offer, you agree to schedule four payments to repay the total Purchase amount (the “<b>4-Pay Payments</b>”). Each 4-Pay Payment will include 1/4 of the Purchase amount plus estimated interest. These 4-Pay Payments must be authorized to occur:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>On the date of the Purchase;</li>
                  <li>Two weeks after the Purchase;</li>
                  <li>Four weeks after the Purchase; and </li>
                  <li>Six weeks after the Purchase. </li>
                </ul>
                <br/>
                <p>If you make all of the 4-Pay Payments as set forth in your 4-Pay Promotional Offer, you will earn Bonus Rewards equal to 25% of the Purchase amount. </p>
                <br/>
                <p>You may cancel scheduled 4-Pay Payments at any time. However, if we do not receive each 4-Pay Payment, for any reason, then any remaining 4-Pay payments will be cancelled.</p>
                <br/>
                <p><i>Your 4-Pay Promotional Balance is not subject to a grace period. Interest charges will accrue on your 4-Pay Purchase Balance while it is outstanding. Paying your scheduled 4-Pay Payments may not pay off all of the interest charges that accrue on your 4-Pay Purchase Balance. The interest you owe will be included in your statement. </i></p>

              </div>
            </div>
          </div>
        </Card>

        {/* Page Break Visual Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-t-2 border-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm font-medium">Page 8 of 9</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div className="flex-grow border-t-2 border-gray-300"></div>
          </div>
        </div>

        {/* Ninth Page */}
        <Card className="bg-white p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  The Joint Venture Card (JVC) Rewards Program
                </h3>
                <p>Your Account includes the Rewards Program described herein. </p>

              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Earning and redeeming rewards
                </h3>
                <p>You will earn points each time you use your Account to make a Purchase. You will earn:</p>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                    50 points with your first Purchase; and
                  </li>
                  <li>
                    1 point for each dollar of your Purchases. 
                  </li>
                </ul>
                <br/>

              <p>
                Each 500 points you accumulate with a merchant earns a $25 reward credit applied to a future Purchase with that merchant. If your future Purchase is less than $25, the remaining reward credit amount will be forfeited. 
              </p>
              <br/>
              <p>
                <i>Note that points are earned, accumulated, and redeemable with each individual merchant where Purchases are made.</i> For example, if you make $500 in Purchases at Merchant A and $250 in Purchases at Merchant B, you will earn 500 points with Merchant A, which qualifies for a $25 reward credit towards your next Purchase with Merchant A. The 500 points and $25 reward credit from Purchases with Merchant A cannot be redeemed at Merchant B. You will also earn 250 points with Merchant B. 
              </p>
              <br/>
              <p>
                We may provide you, in our sole discretion, with the ability to transfer rewards earned with one merchant to another merchant that accepts the Joint Venture Card.
              </p>
              <br/>
              <p>
                You are required to load their earned rewards to your Account in order to use the Rewards during a purchase. You can do so by logging onto the JVC c You can review your points balances on the JVC consumer app.  Rewards will be earned when a Purchase posts to your account. 
              </p>
              <br/>
              <p>
                Returns and credits from a merchant will reduce your points balance for the merchant by 1 point for each dollar.   
              </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Bonus Rewards
                </h3>
                <p>
                  You may be given the opportunity to earn bonus rewards in addition to the rewards you earn for Purchases. For example, you may earn bonus rewards in connection with a Pay Now or 4-Pay Purchase.  For Pay Now purchases, points are earned after the payment clears.  For 4-Pay purchases, points are earned after the final payment clears.  Bonus rewards are subject to additional terms.

                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Limitations and restrictions 
                </h3>
                <p>Points have no monetary value. Points accumulated that are less than 500 with a merchant cannot be redeemed. All rewards redemptions are final. </p>
                <br/>
                <p><i>Note that points expire 180 days after they are earned and earned rewards expire 90 days after they are awarded. </i></p>
                <br/>
                <p>You may not earn or redeem points if you are in you in default of the Agreement. We reserve the right to suspend and eliminate any and all of your points if:</p>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>Your Account is closed for any reason; </li>
                  <li>Your Account balance is charged-off;</li>
                  <li>We determine, in our sole discretion, that your Account is inactive. An Account may be inactive if it has not been used to make a Purchase within the preceding 12-months; or</li>
                  <li>We determine, in our sole discretion, that your Account or the Rewards Program has been abused (e.g., repeat Purchases are made solely to earn rewards and not for personal, family or household purposes), been subject to fraud, or otherwise resulted in violations or likely violations of any applicable law or terms of this Agreement. </li>
                </ul>
                <br/>
                <p>Note that if a merchant stops accepting the Joint Venture Card for purchases or stops doing business altogether, you may not be able to redeem the points you’ve earned with that merchant.  We may not be able to provide you with advance notice when a merchant stops accepting the Joint Venture Card for purchases or stops doing business altogether. If you are unable to redeem your points following such an occurrence, you may request that we credit your outstanding points with the Merchant towards any outstanding Purchase balance at a rate of $0.005 per point.</p>
                <br/>
                <p>We reserve the right to verify and adjust your points balance at any time.</p>             
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Additional terms
                </h3>
                <p>We may share information about your Account and Rewards Program activity with merchants. </p>
                <br/>
                <p>You agree to receive transactional and other communications from us and any merchants where you use your Joint Venture Card including, without limitation, emails relating to promotions and offers. You may unsubscribe from promotional emails at any time via the unsubscribe link in those emails. </p>
                <br/>
                <p>We reserve the right to change the terms of this Rewards Program at any time, including the rate at which you may earn and redeem rewards. </p>
                <br/>
                <p>We are not responsible for the activities of any merchants or the goods or services they provide when you make a Purchase, including when a Rewards Program credit is used to make a Purchase. </p>
                <br/>
                <p>The determination and payment of any tax liability related to the Rewards Program are your sole responsibility. To the extent required by law, certain rewards transactions may be included in year-end tax reporting.</p>
                <br/>
                <p>This Rewards Program or any portion thereof is void where prohibited by federal, state, or local law.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Page Break Visual Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-t-2 border-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm font-medium">Page 9 of 9</span>
            </div>
            <div className="flex-grow border-t-2 border-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardAgreementPreview;
