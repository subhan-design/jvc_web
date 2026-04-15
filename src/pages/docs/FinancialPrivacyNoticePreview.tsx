// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// const FinancialPrivacyNoticePreview = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Document Content */}
//         <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             {/* Header with FACTS and main question */}
//             <div className="mb-8">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="bg-black text-white px-4 py-2 font-bold text-lg">
//                   FACTS
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   WHAT DOES JOINT VENTURE CARD DO WITH YOUR PERSONAL
//                   INFORMATION?
//                 </h2>
//               </div>
//               <div className="text-right text-sm text-gray-600">
//                 Rev. 07/2025
//               </div>
//             </div>

//             <Separator className="my-6" />

//             <div className="space-y-6 text-sm leading-relaxed">
//               {/* Why? Section */}
//               <div className="flex">
//                 <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[80px]">
//                   Why?
//                 </div>
//                 <div className="ml-4 flex-1">
//                   <p>
//                     Financial companies choose how they share your personal
//                     information. Federal law gives consumers the right to limit
//                     some but not all sharing. Federal law also requires us to
//                     tell you how we collect, share, and protect your personal
//                     information. Please read this notice carefully to understand
//                     what we do.
//                   </p>
//                 </div>
//               </div>

//               {/* What? Section */}
//               <div className="flex">
//                 <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[80px]">
//                   What?
//                 </div>
//                 <div className="ml-4 flex-1">
//                   <p>
//                     The types of personal information we collect and share
//                     depend on the product or service you have with us. This
//                     information can include:
//                   </p>
//                   <ul className="list-none ml-4 mt-2 space-y-1">
//                     <li>▪ Social Security number and payment history</li>
//                     <li>▪ account balances and account transactions</li>
//                     <li>▪ credit history and credit scores</li>
//                   </ul>
//                   <p className="mt-2">
//                     When you are no longer our customer, we continue to share
//                     information as described in this notice.
//                   </p>
//                 </div>
//               </div>

//               {/* How? Section */}
//               <div className="flex">
//                 <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[80px]">
//                   How?
//                 </div>
//                 <div className="ml-4 flex-1">
//                   <p>
//                     All financial companies need to share customers' personal
//                     information to run their everyday business. In the section
//                     below, we list the reasons financial companies can share
//                     their customers' personal information; the reasons Joint
//                     Venture Card chooses to share; and whether you can limit
//                     this sharing.
//                   </p>
//                 </div>
//               </div>

//               {/* Information Sharing Table */}
//               <div className="mt-8">
//                 <table className="w-full border-collapse border border-gray-300">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="border border-gray-300 p-3 text-left font-semibold">
//                         Reasons we can share your personal information
//                       </th>
//                       <th className="border border-gray-300 p-3 text-center font-semibold">
//                         Does Joint Venture Card share?
//                       </th>
//                       <th className="border border-gray-300 p-3 text-center font-semibold">
//                         Can you limit this sharing?
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="border border-gray-300 p-3">
//                         For our everyday business purposes – such as to process
//                         your transactions, maintain your account(s), respond to
//                         court orders and legal investigations, or report to
//                         credit bureaus
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         Yes
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         No
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 p-3">
//                         For our marketing purposes – to offer our products and
//                         services to you
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         Yes
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         No
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 p-3">
//                         For joint marketing with other financial companies
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         No
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         We don't share.
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 p-3">
//                         For our affiliates' everyday business purposes –
//                         information about your transactions and experiences
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         Yes
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         No
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 p-3">
//                         For our affiliates' everyday business purposes –
//                         information about your creditworthiness
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         No
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         We don't share.
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 p-3">
//                         For our affiliates to market to you
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         Yes
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         Yes
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 p-3">
//                         For nonaffiliates to market to you
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         Yes
//                       </td>
//                       <td className="border border-gray-300 p-3 text-center">
//                         Yes
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               {/* To Limit Our Sharing Section */}
//               <div className="flex mt-8">
//                 <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[80px]">
//                   To Limit Our Sharing
//                 </div>
//                 <div className="ml-4 flex-1">
//                   <ul className="list-none space-y-1">
//                     <li>• Call at 855.858.2227</li>
//                     <li>
//                       • Email:{" "}
//                       <span className="text-blue-600 underline">
//                         Privacy@jointventurecard.com
//                       </span>
//                     </li>
//                   </ul>
//                   <p className="mt-2">
//                     <strong>Please note:</strong>
//                     <br />
//                     If you are a new customer, we can begin sharing your
//                     information 30 days from the date we sent this notice. When
//                     you are no longer our customer, we continue to share your
//                     information as described in this notice.
//                   </p>
//                   <p className="mt-2">
//                     However, you can contact us at any time to limit our sharing
//                   </p>
//                 </div>
//               </div>

//               {/* Questions? Section */}
//               <div className="flex">
//                 <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[80px]">
//                   Questions?
//                 </div>
//                 <div className="ml-4 flex-1">
//                   <p>
//                     Go to{" "}
//                     <span className="text-blue-600 underline">
//                       jointventurecard.com
//                     </span>{" "}
//                     or call 855.858.2227
//                   </p>
//                 </div>
//               </div>
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
//               {/* What we do Section */}
//               <div className="flex">
//                 <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[80px]">
//                   What we do
//                 </div>
//                 <div className="ml-4 flex-1">
//                   <div className="space-y-4">
//                     <div>
//                       <p className="font-semibold mb-2">
//                         How does Joint Venture Card protect my personal
//                         information?
//                       </p>
//                       <p>
//                         To protect your personal information from unauthorized
//                         access and use, we use security measures that comply
//                         with federal law.
//                       </p>
//                     </div>

//                     <div>
//                       <p className="font-semibold mb-2">
//                         How does Joint Venture Card collect my personal
//                         information?
//                       </p>
//                       <p>
//                         We collect your personal information, for example, when
//                         you
//                       </p>
//                       <ul className="list-none ml-4 mt-2 space-y-1">
//                         <li>▪ open a credit card account</li>
//                         <li>▪ conduct transactions using your account</li>
//                         <li>▪ give us your contact information</li>
//                       </ul>
//                       <p className="mt-2">
//                         We also collect your personal information from others,
//                         such as credit bureaus or other companies.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Why can't I limit all sharing? Section */}
//               <div className="flex">
//                 <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[80px]">
//                   Why can't I limit all sharing?
//                 </div>
//                 <div className="ml-4 flex-1">
//                   <p>Federal law gives you the right to limit only</p>
//                   <ul className="list-none ml-4 mt-2 space-y-1">
//                     <li>
//                       ▪ sharing for affiliates' everyday business purposes –
//                       information about your creditworthiness
//                     </li>
//                     <li>
//                       ▪ affiliates from using your information to market to you
//                     </li>
//                     <li>▪ sharing for nonaffiliates to market to you</li>
//                   </ul>
//                   <p className="mt-2">
//                     State laws and individual companies may give you additional
//                     rights to limit sharing. See below for more on your rights
//                     under state law.
//                   </p>
//                 </div>
//               </div>

//               {/* Definitions Section */}
//               <div className="flex">
//                 <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[80px]">
//                   Definitions
//                 </div>
//                 <div className="ml-4 flex-1">
//                   <div className="space-y-3">
//                     <div>
//                       <p className="font-semibold">Affiliates</p>
//                       <p>
//                         Companies related by common ownership or control. They
//                         can be financial and nonfinancial companies. Our
//                         affiliates include financial companies with the name
//                         "Joint Venture Card" or "JVC".
//                       </p>
//                     </div>

//                     <div>
//                       <p className="font-semibold">Nonaffiliates</p>
//                       <p>
//                         Companies not related by common ownership or control.
//                         They can be financial and nonfinancial companies. Non
//                         affiliates we share with can include merchants, point of
//                         sale providers, and insurance companies.
//                       </p>
//                     </div>

//                     <div>
//                       <p className="font-semibold">Joint Marketing</p>
//                       <p>
//                         A formal agreement between nonaffiliated financial
//                         companies that together market financial products or
//                         services to you.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Other Important Information Section */}
//               <div className="flex">
//                 <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[80px]">
//                   Other Important Information
//                 </div>
//                 <div className="ml-4 flex-1">
//                   <p>
//                     <strong>California residents:</strong> We will not disclose
//                     personal information we collect about you to nonaffiliated
//                     third parties, other than as permitted by law, such as to
//                     process your transactions, maintain your account, or with
//                     your consent. We will not disclose your personal information
//                     to our affiliates for their marketing purposes, or disclose
//                     information about your creditworthiness to our affiliates
//                     for their everyday business purposes, if you instruct us not
//                     to do so by using the opt-out methods described on the first
//                     page (or, for California residents, by using the opt-out
//                     methods described the "Important Privacy Choices for
//                     Consumers" form provided with this notice). Additional
//                     information concerning our privacy policies can be found at{" "}
//                     <span className="text-blue-600 underline">
//                       https://www.jvccard.com
//                     </span>{" "}
//                     or by calling 855.858.2227.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Subtle page break divider */}
//         {/* <div className="w-full max-w-4xl flex items-center my-8">
//           <div className="flex-grow border-t border-gray-200" />
//           <span className="mx-2 text-gray-400 text-xs">Page 3</span>
//           <div className="flex-grow border-t border-gray-200" />
//         </div> */}

//         {/* Page 3 */}
//         {/* <Card className="bg-white p-8">
//           <div className="prose prose-lg max-w-none">
//             <div className="space-y-6 text-sm leading-relaxed"> */}
//               {/* Header */}
//               {/* <div className="text-center mb-8">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-2">
//                   Important Privacy Choices for Consumers
//                 </h2>
//                 <p className="text-lg font-medium text-gray-700">
//                   (California Residents Only)
//                 </p>
//                 <div className="text-right text-sm text-gray-600 mt-4">
//                   Rev. 07/2025
//                 </div>
//               </div> */}

//               {/* Introduction */}
//               {/* <div className="text-center mb-6">
//                 <p className="text-base">
//                   You have the right to control whether we share some of your
//                   personal information.
//                 </p>
//                 <p className="text-base">
//                   Please read the following information carefully before you
//                   make your choices below.
//                 </p>
//               </div> */}

//               {/* Your Rights Section */}
//               {/* <div className="border-b-2 border-gray-300 pb-4">
//                 <div className="flex items-center mb-3">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Your Rights
//                   </h3>
//                   <div className="flex-grow border-t-2 border-gray-300 ml-4"></div>
//                 </div>
//                 <p className="text-sm leading-relaxed">
//                   You have the following rights to restrict the sharing of
//                   personal and financial information with our affiliates
//                   (companies we own or control) and outside companies that we do
//                   business with. Nothing in this form prohibits the sharing of
//                   information necessary for us to follow the law, as permitted
//                   by law, or to give you the best service on your accounts with
//                   us. This includes sending you information about some other
//                   products or services.
//                 </p>
//               </div> */}

//               {/* Your Choices Section */}
//               {/* <div className="border-b-2 border-gray-300 pb-4">
//                 <div className="flex items-center mb-3">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Your Choices
//                   </h3>
//                   <div className="flex-grow border-t-2 border-gray-300 ml-4"></div>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-sm leading-relaxed mb-3">
//                       <strong>
//                         Restrict Information Sharing With Companies We Own or
//                         Control (Affiliates):
//                       </strong>{" "}
//                       Unless you say "No," we may share personal and financial
//                       information about you with our affiliated companies.
//                     </p>
//                     <div className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         id="affiliates-opt-out"
//                         className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                       />
//                       <label
//                         htmlFor="affiliates-opt-out"
//                         className="text-sm font-medium text-gray-900"
//                       >
//                         NO, please do not share personal and financial
//                         information with your affiliated companies.
//                       </label>
//                     </div>
//                   </div>

//                   <div>
//                     <p className="text-sm leading-relaxed mb-3">
//                       <strong>
//                         Restrict Information Sharing With Other Companies We Do
//                         Business With To Provide Financial Products And
//                         Services:
//                       </strong>{" "}
//                       Unless you say "No," we may share personal and financial
//                       information about you with outside companies we contract
//                       with to provide financial products and services to you.
//                     </p>
//                     <div className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         id="outside-companies-opt-out"
//                         className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                       />
//                       <label
//                         htmlFor="outside-companies-opt-out"
//                         className="text-sm font-medium text-gray-900"
//                       >
//                         NO, please do not share personal and financial
//                         information with outside companies you contract with to
//                         provide financial products and services.
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}

//               {/* Cut-off line */}
//               {/* <div className="border-t-2 border-dashed border-gray-400 my-6 relative">
//                 <div className="absolute right-0 top-0 transform -translate-y-1/2">
//                   <span className="text-gray-500 text-lg">✂️</span>
//                 </div>
//               </div> */}

//               {/* Time Sensitive Reply Section */}
//               {/* <div className="border-b-2 border-gray-300 pb-4">
//                 <div className="flex items-center mb-3">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Time Sensitive Reply
//                   </h3>
//                   <div className="flex-grow border-t-2 border-gray-300 ml-4"></div>
//                 </div>
//                 <p className="text-sm leading-relaxed mb-4">
//                   You may make your privacy choices at any time. Your choice
//                   marked here will remain unless you state otherwise. However,
//                   if we do not hear from you we may share some of your
//                   information with affiliated companies and other companies with
//                   which we have contracts to provide products and services.
//                 </p> */}

//                 {/* Form Fields */}
//                 {/* <div className="space-y-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-900 mb-1">
//                       Name:
//                     </label>
//                     <div className="border-b-2 border-gray-300 h-8"></div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-900 mb-1">
//                       Account Number(s):
//                     </label>
//                     <div className="border-b-2 border-gray-300 h-8"></div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-900 mb-1">
//                       Signature:
//                     </label>
//                     <div className="border-b-2 border-gray-300 h-8"></div>
//                   </div>
//                 </div>
//               </div> */}

//               {/* To exercise your choices Section */}
//               {/* <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                   To exercise your choices, do one of the following:
//                 </h3>
//                 <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed">
//                   <li>
//                     Fill out, sign and send back this form to us using the
//                     envelope provided (you may want to make a copy for your
//                     records) to{" "}
//                     <strong>
//                       Joint Venture Card, 101 E. Convention Center Dr., Ste 946,
//                       Las Vegas, NV
//                     </strong>
//                   </li>
//                   <li>
//                     Reply electronically by contacting us through the following
//                     Internet option:{" "}
//                     <span className="text-blue-600 underline">
//                       privacy@jointventurecard.com
//                     </span>
//                   </li>
//                   <li>
//                     Call this toll-free number: <strong>855.858.2227</strong>
//                   </li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </Card>*/}
//       </div> 
//     </div>
//   );
// };

// export default FinancialPrivacyNoticePreview;

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const FinancialPrivacyNoticePreview = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* PAGE 1 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-black text-white px-4 py-2 font-bold text-lg">
                  FACTS
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  WHAT DOES JOINT VENTURE CARD DO WITH YOUR PERSONAL INFORMATION?
                </h2>
              </div>
              <div className="text-right text-sm text-gray-600">Rev. 07/2025</div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6 text-sm leading-relaxed">
              {/* Why? */}
              <div className="flex">
                <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[90px]">
                  Why?
                </div>
                <div className="ml-4 flex-1">
                  <p>
                    Financial companies choose how they share your personal information.
                    Federal law gives consumers the right to limit some but not all sharing.
                    Federal law also requires us to tell you how we collect, share, and protect
                    your personal information. Please read this notice carefully to understand
                    what we do.
                  </p>
                </div>
              </div>

              {/* What? */}
              <div className="flex">
                <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[90px]">
                  What?
                </div>
                <div className="ml-4 flex-1">
                  <p>
                    The types of personal information we collect and share depend on the
                    product or service you have with us. This information can include:
                  </p>
                  <ul className="list-none ml-4 mt-2 space-y-1">
                    <li>▪ Social Security number and payment history</li>
                    <li>▪ account balances and account transactions</li>
                    <li>▪ credit history and credit scores</li>
                  </ul>
                  <p className="mt-2">
                    When you are no longer our customer, we continue to share information as
                    described in this notice.
                  </p>
                </div>
              </div>

              {/* How? */}
              <div className="flex">
                <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[90px]">
                  How?
                </div>
                <div className="ml-4 flex-1">
                  <p>
                    All financial companies need to share customers’ personal information to
                    run their everyday business. In the section below, we list the reasons
                    financial companies can share their customers’ personal information; the
                    reasons Joint Venture Card chooses to share; and whether you can limit
                    this sharing.
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className="mt-8">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left font-semibold">
                        Reasons we can share your personal information
                      </th>
                      <th className="border border-gray-300 p-3 text-center font-semibold">
                        Does Joint Venture Card share?
                      </th>
                      <th className="border border-gray-300 p-3 text-center font-semibold">
                        Can you limit this sharing?
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">
                        For our everyday business purposes –
                        <br />
                        such as to process your transactions, maintain your account(s),
                        respond to court orders and legal investigations, or report to credit
                        bureaus
                      </td>
                      <td className="border border-gray-300 p-3 text-center">Yes</td>
                      <td className="border border-gray-300 p-3 text-center">No</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">
                        For our marketing purposes –
                        <br />
                        to offer our products and services to you
                      </td>
                      <td className="border border-gray-300 p-3 text-center">Yes</td>
                      <td className="border border-gray-300 p-3 text-center">No</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">
                        For joint marketing with other financial companies
                      </td>
                      <td className="border border-gray-300 p-3 text-center">No</td>
                      <td className="border border-gray-300 p-3 text-center">
                        We don’t share.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">
                        For our affiliates’ everyday business purposes –
                        <br />
                        information about your transactions and experiences
                      </td>
                      <td className="border border-gray-300 p-3 text-center">Yes</td>
                      <td className="border border-gray-300 p-3 text-center">No</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">
                        For our affiliates’ everyday business purposes –
                        <br />
                        information about your creditworthiness
                      </td>
                      <td className="border border-gray-300 p-3 text-center">No</td>
                      <td className="border border-gray-300 p-3 text-center">
                        We don’t share.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">
                        For our affiliates to market to you
                      </td>
                      <td className="border border-gray-300 p-3 text-center">Yes</td>
                      <td className="border border-gray-300 p-3 text-center">Yes</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">
                        For nonaffiliates to market to you
                      </td>
                      <td className="border border-gray-300 p-3 text-center">Yes</td>
                      <td className="border border-gray-300 p-3 text-center">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* To Limit Our Sharing */}
              <div className="flex mt-8">
                <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[90px]">
                  To Limit Our Sharing
                </div>
                <div className="ml-4 flex-1">
                  <ul className="list-none space-y-1">
                    <li>• Call at 855.858.2227</li>
                    <li>
                      • Email:{" "}
                      <span className="text-blue-600 underline">
                        Privacy@jointventurecard.com
                      </span>
                    </li>
                  </ul>

                  <p className="mt-3">
                    <strong>Please note:</strong>
                    <br />
                    If you are a new customer, we can begin sharing your information 30 days
                    from the date we sent this notice. When you are no longer our customer,
                    we continue to share your information as described in this notice.
                  </p>

                  <p className="mt-2">
                    However, you can contact us at any time to limit our sharing
                  </p>
                </div>
              </div>

              {/* Questions? */}
              <div className="flex">
                <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[90px]">
                  Questions?
                </div>
                <div className="ml-4 flex-1">
                  <p>
                    Go to{" "}
                    <span className="text-blue-600 underline">jointventurecard.com</span>{" "}
                    or call 855.858.2227
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Page break */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 2</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* PAGE 2 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              {/* What we do */}
              <div className="flex">
                <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[90px]">
                  What we do
                </div>
                <div className="ml-4 flex-1 space-y-4">
                  <div>
                    <p className="font-semibold mb-2">
                      How does Joint Venture Card protect my personal information?
                    </p>
                    <p>
                      To protect your personal information from unauthorized access and use,
                      we use security measures that comply with federal law.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">
                      How does Joint Venture Card collect my personal information?
                    </p>
                    <p>We collect your personal information, for example, when you</p>
                    <ul className="list-none ml-4 mt-2 space-y-1">
                      <li>▪ open a credit card account</li>
                      <li>▪ conduct transactions using your account</li>
                      <li>▪ give us your contact information</li>
                    </ul>
                    <p className="mt-2">
                      We also collect your personal information from others, such as credit
                      bureaus or other companies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why can't I limit all sharing? */}
              <div className="flex">
                <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[90px]">
                  Why can’t I limit all sharing?
                </div>
                <div className="ml-4 flex-1">
                  <p>Federal law gives you the right to limit only</p>
                  <ul className="list-none ml-4 mt-2 space-y-1">
                    <li>
                      ▪ sharing for affiliates’ everyday business purposes – information about
                      your creditworthiness
                    </li>
                    <li>▪ affiliates from using your information to market to you</li>
                    <li>▪ sharing for nonaffiliates to market to you</li>
                  </ul>
                  <p className="mt-2">
                    State laws and individual companies may give you additional rights to
                    limit sharing. See below for more on your rights under state law.
                  </p>
                </div>
              </div>

              {/* Definitions */}
              <div className="flex">
                <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[90px]">
                  Definitions
                </div>
                <div className="ml-4 flex-1 space-y-3">
                  <div>
                    <p className="font-semibold">Affiliates</p>
                    <p>
                      Companies related by common ownership or control. They can be financial
                      and nonfinancial companies. Our affiliates include financial companies
                      with the name “Joint Venture Card” or “JVC”.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Nonaffiliates</p>
                    <p>
                      Companies not related by common ownership or control. They can be
                      financial and nonfinancial companies. Non affiliates we share with can
                      include merchants, point of sale providers, and insurance companies.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Joint Marketing</p>
                    <p>
                      A formal agreement between nonaffiliated financial companies that
                      together market financial products or services to you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Other Important Information */}
              <div className="flex">
                <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 min-w-[90px]">
                  Other Important Information
                </div>
                <div className="ml-4 flex-1">
                  <p>
                    <strong>California residents:</strong> We will not disclose personal
                    information we collect about you to nonaffiliated third parties, other
                    than as permitted by law, such as to process your transactions, maintain
                    your account, or with your consent. We will not disclose your personal
                    information to our affiliates for their marketing purposes, or disclose
                    information about your creditworthiness to our affiliates for their
                    everyday business purposes, if you instruct us not to do so by using the
                    opt-out methods described on the first page (or, for California residents,
                    by using the opt-out methods described the “Important Privacy Choices for
                    Consumers” form provided with this notice). Additional information
                    concerning our privacy policies can be found at{" "}
                    <span className="text-blue-600 underline">https://www.jvccard.com</span>{" "}
                    or by calling 855.858.2227.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Page break */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 3</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* PAGE 3 (California Residents Only Form) */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-8">
              <div className="text-right text-sm text-gray-600">Rev. 07/2025</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Important Privacy Choices for Consumers
              </h2>
              <p className="text-base font-medium text-gray-700">
                (California Residents Only)
              </p>
            </div>

            <div className="text-center mb-6 text-sm leading-relaxed">
              <p>You have the right to control whether we share some of your personal information.</p>
              <p>Please read the following information carefully before you make your choices below.</p>
            </div>

            {/* Your Rights */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <h3 className="text-base font-semibold text-gray-900">Your Rights</h3>
                <div className="flex-grow border-t border-gray-300 ml-4" />
              </div>
              <p className="text-sm leading-relaxed">
                You have the following rights to restrict the sharing of personal and financial
                information with our affiliates (companies we own or control) and outside companies
                that we do business with. Nothing in this form prohibits the sharing of information
                necessary for us to follow the law, as permitted by law, or to give you the best
                service on your accounts with us. This includes sending you information about some
                other products or services.
              </p>
            </div>

            {/* Your Choices */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <h3 className="text-base font-semibold text-gray-900">Your Choices</h3>
                <div className="flex-grow border-t border-gray-300 ml-4" />
              </div>

              <div className="space-y-4 text-sm leading-relaxed">
                <div>
                  <p className="mb-2">
                    <strong>
                      Restrict Information Sharing With Companies We Own or Control (Affiliates):
                    </strong>{" "}
                    Unless you say “No,” we may share personal and financial information about you
                    with our affiliated companies.
                  </p>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4" />
                    <span>
                      <strong>NO</strong>, please do not share personal and financial information
                      with your affiliated companies.
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mb-2">
                    <strong>
                      Restrict Information Sharing With Other Companies We Do Business With To Provide
                      Financial Products And Services:
                    </strong>{" "}
                    Unless you say “No,” we may share personal and financial information about you with
                    outside companies we contract with to provide financial products and services to you.
                  </p>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 h-4 w-4" />
                    <span>
                      <strong>NO</strong>, please do not share personal and financial information with
                      outside companies you contract with to provide financial products and services.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cut line */}
            <div className="border-t border-dashed border-gray-400 my-6" />

            {/* Time Sensitive Reply */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <h3 className="text-base font-semibold text-gray-900">Time Sensitive Reply</h3>
                <div className="flex-grow border-t border-gray-300 ml-4" />
              </div>

              <p className="text-sm leading-relaxed mb-4">
                You may make your privacy choices at any time. Your choice marked here will remain
                unless you state otherwise. However, if we do not hear from you we may share some of
                your information with affiliated companies and other companies with which we have
                contracts to provide products and services.
              </p>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium mb-1">Name:</div>
                  <div className="border-b border-gray-400 h-7" />
                </div>
                <div>
                  <div className="font-medium mb-1">Account Number(s):</div>
                  <div className="border-b border-gray-400 h-7" />
                </div>
                <div>
                  <div className="font-medium mb-1">Signature:</div>
                  <div className="border-b border-gray-400 h-7" />
                </div>
              </div>
            </div>

            {/* To exercise your choices */}
            <div className="text-sm leading-relaxed">
              <p className="font-semibold mb-2">
                To exercise your choices, do one of the following:
              </p>
              <div className="space-y-2">
                <p>
                  (1) Fill out, sign and send back this form to us using the envelope provided (you
                  may want to make a copy for your records) to{" "}
                  <strong>
                    Joint Venture Card, 101 E. Convention Center Dr., Ste 946, Las Vegas, NV
                  </strong>
                </p>
                <p>
                  (2) Reply electronically by contacting us through the following Internet option:{" "}
                  <span className="text-blue-600 underline">privacy@jointventurecard.com</span>
                </p>
                <p>
                  (3) Call this toll-free number: <strong>855.858.2227</strong>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FinancialPrivacyNoticePreview;
