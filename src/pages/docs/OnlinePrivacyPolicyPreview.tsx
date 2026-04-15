import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMerchantData } from "@/context/MerchantDataContext";

const OnlinePrivacyPolicyPreview = () => {
  const { merchantData } = useMerchantData();

  // Extract merchant data
  const personal = merchantData?.personalDetails || {};
  const business = merchantData?.businessInformation || {};
  const fullName = `${personal.firstName || ''} ${personal.lastName || ''}`.trim();
  const merchantName = business.legalNameOfBusiness || business.dbaName || fullName || 'Merchant';
  const email = personal.email || '';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Document Content */}
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                JVC Online Privacy Policy
              </h2>
              <p className="text-sm text-gray-600">
                Last updated August 1, 2025
              </p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                Your privacy is important to us and we are committed to protecting it through our compliance with this Online Privacy Policy (the "Policy"). The terms "JVC" and "Joint Venture Card", "we", "us" or "our" in this Policy refers to JVC Holdings, Inc. and any banking or non-banking U.S. affiliates of JVC that refer or link to this Policy. To the extent that you obtain a financial product or service from us, our Financial Privacy Notice will govern.
              </p>

              <p>
                Additional privacy rights and notices will apply if you are a California resident. See the section below called <strong>Your California Privacy Rights</strong> for more information about your rights under California law.
              </p>

              <p>
                This Policy describes how we manage personal information about you when you interact with us online through our websites, mobile applications and social sites (a "Site" or the "Sites"), using your computer, smartphone, tablet or other mobile device (a "Device" or the "Devices"). We maintain our Sites and provide services through them for your information and communication purposes, as well as for purposes associated with the marketing, origination, and servicing of our products and services (the "Service" or "Services"). This Policy also explains how JVC collects personal information that you may provide when you visit, use or interact with us online, and through our ads displayed through online services operated by us or non-affiliated third parties. In addition, this Policy explains how we may use or share personal information collected to provide our Services to you and for advertising purposes.
              </p>

              <p>
                Please read this Policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Sites. By using our Sites, you agree to the terms and conditions of this Policy.
              </p>

              <p>
                Our Sites and Services are intended for use only by United States residents, while located in the United States. If you are not a United States resident, or are located in a country other than the United States, you may not use our Sites or request and obtain Services from us through those Sites.
              </p>

              <p>
                We work with third-party providers that are contractually obligated to comply with our policies for protecting information. However, if you visit or access one of these third-party provider sites or mobile apps, please review the online privacy policies that apply to the third-party provider's site or mobile app to understand the specifics of how your online personal information may be collected, used and shared.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Updates To This Policy
              </h3>

              <p>
                This Policy may change from time to time, so please check this Policy periodically for updates. For example, we may update this Policy periodically to comply with updates to federal, state, and local laws, or to reflect our own business choices and preferences. If we make changes to this Policy, we will revise the "last updated" date at the top of this Policy. You are responsible for periodically reviewing this Policy to check for any changes. If we change the Policy on this Site and you continue to use it, you agree that your continued use of the Site will mean you have accepted all of the changes described in our updated Policy.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                JVC's Online Privacy Practices
              </h3>

              <p>
                JVC is committed to transparency about your personal information. In some cases, we may ask for your express consent to use or disclose your personal information (for example, if we determine that your express consent is required or advisable under applicable law). Otherwise, when you use our Site and Services, you consent to the collection, use and sharing of your personal information as described by this Policy, subject to applicable law and other notices we may have provided to you based on our relationship with you and based on the Services you obtain from us using our Sites or otherwise.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Linking To Other Sites
              </h3>

              <p>
                We may provide links to non-affiliated third-party sites, such as credit bureaus, service providers or merchants. If you follow links to any site that is not affiliated with or controlled by JVC, you should review their privacy and security policies and other terms and conditions, because the policies of those third parties may be different from those that apply to our Sites and Services. We do not guarantee and are not responsible for the privacy or security of these third-party sites or for the accuracy, completeness, or reliability of information found on those other sites.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Protecting Your Personal Information
              </h3>

              <p>
                We use security measures that comply with applicable federal and state laws to protect personal information from unauthorized access and use. Security measures may include device safeguards and secured files and buildings, as well as oversight of our third-party providers to ensure personal information remains confidential and secure.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Persons Under 18 Years of Age
              </h3>

              <p>
                Our Site is not intended for children under 18 years of age. No one under age 18 is allowed to provide personal information on this Site. We do not knowingly collect personal information from children under 18. If you are under 18, do not use or provide any information on this Site or provide any information about yourself to us, including your name, address, telephone number, email address, or any screen name or username you may use. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information.
              </p>
            </div>
          </div>
        </Card>

        {/* Subtle page break divider */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 2</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Page 2 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Keeping Your Personal Information Accurate and Updated
              </h3>

              <p>
                Keeping your personal information accurate and up to date is very important. If your personal information is incomplete, inaccurate or not current, please use the Contact Us or similar option on our Sites, or call us at the telephone numbers or write to us at the appropriate address for changes listed on your account statements, records, online or other account materials.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Personal Information We Collect
              </h3>

              <p>
                <strong>How do we collect personal information online?</strong>
              </p>

              <p>
                <strong>Cookies and similar technologies</strong>
              </p>

              <p>
                We collect personal information about you through your Devices by using "cookies" and similar tracking technologies (including pixels or clear GIFs, tags, web beacons and Flash objects). Cookies are text files containing small amounts of information that are downloaded to your Devices when you visit a website. Tracking technologies may collect information about you and your use of our Sites. Cookies allow a site or mobile app to recognize your Device, keep track of pages visited, and remember your preferences. This information is used for security purposes, to facilitate navigation, to display information more effectively and to personalize the user's experience. Cookies and similar tracking technologies are also used to gather information to improve website design and functionality and assist with resolving questions regarding our Sites.
              </p>

              <p>
                Cookies set by JVC and cookies created and set by third-party providers on our behalf are called "first-party" cookies. Cookies set by third-party providers, but which are not set on our behalf, are called "third-party" cookies. Information obtained from a third-party cookie can be used only for the purposes we have stated in our contracts with the third-party. There can be first-party and/or third-party cookies within any of the Categories of Cookies described below.
              </p>

              <p>
                Cookies that expire at the end of a browser session are called "session" cookies. Cookies that are stored longer are called "persistent" cookies. Generally, there can be session and/or persistent cookies within any of the below Categories of Cookies.
              </p>

              <p>
                The Sites we administer or control use cookies that we consider necessary for our Sites to function properly and that cannot be switched off in our systems. These cookies are used to set your privacy preferences, gather geolocation data to prevent or detect potential fraudulent activity, or for logging in a secured area requiring authentication. Geolocation cookies are only session cookies.
              </p>

              <p>
                We will retain personal information collected through cookies for as long as needed or permitted by law in light of the purpose(s) for which it was obtained. The criteria used to determine our retention periods includes the purpose for which the personal information was collected, whether there is a legal obligation that applies to us, and whether retention is advisable in light of our legal position, including with respect to applicable statutes of limitations, litigation or regulatory investigations.
              </p>

              <p>
                We work with certain third-party providers that are contractually required to comply with our policies to protect information. We may contract with a third-party provider to provide support to us through their sites. If you are on one of our Sites and you click a link to one of their sites, you will be presented with a notice explaining that you are continuing to a site that we do not own. The third-party provider is solely responsible for cookies, cookie tracking and your choices for managing cookies on its site. Please refer to the privacy policy and terms of use posted by the third-party provider for more information. When we contract with a third-party provider to manage the content of the information within our Sites, the third-party provider is solely responsible for cookies, cookie tracking and your choices for managing cookies.
              </p>

              <p>
                <strong>Other means of collecting personal information</strong>
              </p>

              <p>
                JVC also collects personal information that you provide when visiting or using our Sites and Services. This may occur when you apply for or open a new account, register for a new product or service, or request information about a product or service. We may also use third-party providers to process personal information for business purposes on our behalf. These third-party providers are contractually required to keep this information confidential and to comply with our policies to protect information we share with them or they collect on our behalf. The personal information we collect is limited to what is required to provide our Services and to support legal, risk management and regulatory compliance requirements. For additional information, please review the "How We Use and Share Personal Information" section of this Policy.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Types of personal information we collect online
              </h3>

              <p>
                The type of personal information we collect from and about you online will depend on how you interact with us and may include:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Contact information, such as name, mailing address, email address, telephone and mobile number(s);
                </li>
                <li>
                  Account application information, such as credit and income information;
                </li>
                <li>
                  Identifiers such as Social Security number, account number(s), driver's license number (or comparable) or other information that identifies you for ordinary business purposes;
                </li>
                <li>
                  Access authorization, such as user name, alias, PIN and Passcode and security questions and answers;
                </li>
                <li>
                  Information from your computer and mobile devices, where allowed by individual browsers and/or operating systems, such as:
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Unique device identifiers (for example Media Access Control (MAC) and Internet Protocol (IP) addresses); and</li>
                    <li>Browser type, version, language, and display/screen settings;</li>
                  </ul>
                </li>
                <li>
                  Information about how you use and interact with our Sites and use our Services (for example, activities on pages visited, links clicked or unique and measurable patterns such as keystrokes, mouse clicks and movements, swipes and gestures);
                </li>
                <li>
                  Responses to advertisements on the sites and mobile apps where we advertise;
                </li>
                <li>
                  Log information, such as your search and voice to text queries using our Sites;
                </li>
                <li>Search engine referrals;</li>
                <li>
                  Geo-location information with consent (for example, merchant location, fraud prevention); and
                </li>
                <li>Social media preferences</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Subtle page break divider */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 3</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Page 3 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                How We Use and Share Personal Information
              </h3>

              <p>
                <strong>How do we use your personal information?</strong>
              </p>

              <p>
                Personal information collected from and about you online described in this Policy may be used for many purposes, such as:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Delivering products and services to you (for example, to verify your identity when you access your account information, or when we process your applications or requests for prequalified offers, or otherwise request or obtain our Services using the Sites or otherwise);
                </li>
                <li>
                  Personalizing your digital and mobile experience by enhancing the organization and design of our Sites and by analyzing data to create relevant alerts, products or services;
                </li>
                <li>
                  Providing advertising on our Sites, as well as non-affiliated third-party sites and through off-line channels like call centers and direct marketing (for example email, mail and phone);
                </li>
                <li>
                  Detecting and preventing fraud, identity theft and other risks to you or us;
                </li>
                <li>
                  Performing analytics concerning your use of our online services, including your responses to our emails and the pages and advertisements you view;
                </li>
                <li>
                  Complying with and enforcing applicable legal requirements, industry standards, contractual obligations and our policies;
                </li>
                <li>
                  Allowing you to use features within our Sites when you grant us access to personal information from your Device, such as contact lists, or geo-location when you request certain Services that requires such access (for example, to locate a merchant); and
                </li>
                <li>
                  To evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by us about our Site users and consumers are among the assets transferred.
                </li>
              </ul>

              <p>
                We keep personal information for as long as applicable law requires or allows and will use it for our legitimate business purposes. When we determine that personal information is no longer needed or that we are no longer required or allowed to keep it, we will securely delete that personal information.
              </p>

              <p>
                <strong>With whom do we share your personal information?</strong>
              </p>

              <p>
                Subject to other legal restrictions and notices you may receive from us based on our relationship with you, we may share the personal information we collect from and about you online described in this Policy:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>Among our affiliates and subsidiaries;</li>
                <li>
                  With third-party providers that have contracts with us, including contractors and technology service providers;
                </li>
                <li>
                  To fulfill the purpose for which your personal information is provided;
                </li>
                <li>
                  To comply with any court order, law, or legal process, including responding to any government or regulatory request;
                </li>
                <li>With your consent;</li>
                <li>
                  To conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by us about our Site users and consumers are among the assets transferred; and
                </li>
                <li>
                  For any other purpose we disclosed when obtaining the personal information.
                </li>
              </ul>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Aggregated and De-identified information
              </h3>

              <p>
                We may aggregate or de-identify personal information, meaning we may remove any details that identify you personally. We may share this aggregated and/or de-identified information with third-party providers to help deliver products, services and content that are better tailored to the users of our Services and for our own business purposes, where permissible under applicable laws and regulations.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                How to limit sharing
              </h3>

              <p>
                You have choices regarding the sharing of some personal information. Where appropriate, we will limit sharing of your personal information based on your privacy choices.
              </p>

              <p>
                Industry standards are currently evolving and we may not separately respond to or take any action with respect to a "do not track" configuration set in your Internet browser.
              </p>
            </div>
          </div>
        </Card>

        {/* Subtle page break divider */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 4</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Page 4 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Additional Information
              </h3>

              <p>
                <strong>Third-party data sharing</strong>
              </p>

              <p>
                Some companies may offer aggregation websites and services that allow you to share your data with them to consolidate your account information from different sources (such as your accounts with us or with other financial institutions), so you can view it in one location or perform actions related to your accounts using their services. To do this, a third-party may request you to authorize access to your JVC accounts by providing your JVC username and passcode or by providing your information-sharing consent directly to JVC. Please be careful about using these third parties and keep the following details in mind if you choose to use these third-party service providers:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>
                  The third-party may access, on your behalf, detailed and personally identifiable information about you, about your accounts, transactions, and relationship with us, and about the Services you obtain from and through us;
                </li>
                <li>
                  You should use caution and ensure the third-party has appropriate policies and practices to protect the privacy and security of any personal information you provide or to which they are gaining access;
                </li>
                <li>
                  Use of your information by the third-party is governed by your agreement with them, not by any agreement you have with us;
                </li>
                <li>
                  We are not responsible for the use or disclosure of any personal information accessed by any company or person to whom you provide your username and passcode;
                </li>
                <li>
                  If you share your JVC username and passcode or other information about your accounts with others, we will consider your decision to share this information with others to mean that you have authorized any transaction or action that is initiated using the access information you provided;
                </li>
                <li>
                  If you decide to revoke the authority you have given to a third-party, we strongly recommend that you change your JVC passcode to ensure that the third-party cannot continue to access your account.
                </li>
              </ul>

              <p>
                <strong>Social media</strong>
              </p>

              <p>
                We may engage with customers and potential customers on social media platforms, such as Facebook, Twitter, YouTube and LinkedIn.
              </p>

              <p>
                Any content you post on official JVC managed social media pages, such as pictures, information, opinions or any personal information that you make available to other participants on these social platforms, is subject to the Terms of Use and Privacy Policies of those respective platforms.
              </p>

              <p>
                When interacting with official JVC social media pages, JVC's privacy notices and any applicable social media user terms and community guidelines may apply. Please review the privacy policy for the specific social media service you are using to better understand your rights and obligations with regard to such content.
              </p>

              <p>
                We may allow social share buttons on our sites that enable users to easily share information on social media platforms. The non-affiliated third parties that own these widgets may have access to information about your browsing on pages of our Sites where these widgets are placed.
              </p>
            </div>
          </div>
        </Card>

        {/* Subtle page break divider */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 5</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Page 5 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Your California Privacy Rights
              </h3>

              <p className="text-xs text-gray-600">
                Effective Date: August 1, 2025<br />
                Last Updated and Reviewed: August 1, 2025
              </p>

              <p>
                This Privacy Policy for California Residents ("California Privacy Policy") supplements the information contained in our general Policy and applies solely to visitors, users, and others who reside in the State of California ("consumers" or "you"). We adopt this notice to comply with the California Consumer Privacy Act of 2018 ("CCPA"). Any terms defined by the CCPA have the same meaning when used in this California Privacy Policy.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Notice At Collection/Personal Information We Collect
              </h3>

              <p>
                We collect information that identifies, relates to, describes, references, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer, household, or device ("personal information").
              </p>

              <p>
                Personal information does not include:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>Publicly available information from government records;</li>
                <li>Deidentified or aggregated consumer information; and</li>
                <li>
                  Information excluded from the CCPA's scope, such as personal information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act (FCRA), the Gramm-Leach-Bliley Act (GLBA) or California Financial Information Privacy Act (FIPA), and the Driver's Privacy Protection Act of 1994.
                </li>
              </ul>

              <p>
                In particular, we have collected the following categories of personal information from consumers within the last twelve (12) months:
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 mt-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left text-xs font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-xs font-semibold text-gray-700">
                        Examples
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-xs font-semibold text-gray-700">
                        Collected
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        A. Identifiers.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        A name, postal address, Internet Protocol address, and email address.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        YES
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        B. Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)).
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        A name, postal address, Internet Protocol address, and email address. Some personal information included in this category may overlap with other categories.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        YES
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        C. Commercial information.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        Records of personal property, products or services purchased, obtained, or considered with us.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        YES
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        D. Internet or other similar network activity.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        Browsing history, search history, information on a consumer's interaction with a website, application, or advertisement.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        YES
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        E. Sensitive Personal Information
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        Social security, driver's license, and precise geolocation.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        YES
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4">
                We obtain the categories of personal information listed above from the following categories of sources:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Directly from you. For example, from forms you complete or products and services you purchase.
                </li>
                <li>
                  Indirectly from you. For example, from observing your actions on our Site.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Subtle page break divider */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 6</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Page 6 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Use of Personal Information
              </h3>

              <p>
                We may use or disclose the personal information we collect for one or more of the following purposes:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>
                  To fulfill or meet the reason you provided the information. For example, if you share your name and contact information to request a prequalified offer or ask a question about our products or services, we will use that personal information to respond to your inquiry. If you provide your personal information to obtain a product or service, we will use that information to process your request and facilitate delivery. We may also save your information to facilitate new orders or process transactions.
                </li>
                <li>
                  To provide, support, personalize, and develop our Site, products, and services.
                </li>
                <li>
                  To create, maintain, customize, and secure your account with us.
                </li>
                <li>
                  To process your requests, purchases, transactions, and payments and prevent transactional fraud.
                </li>
                <li>
                  To provide you with support and to respond to your inquiries, including to investigate and address your concerns and monitor and improve our responses.
                </li>
                <li>
                  To personalize your Site experience and to deliver content and product and service offerings relevant to your interests, including targeted offers and ads through our Site and via email or text message (with your consent, where required by law).
                </li>
                <li>
                  To help maintain the safety, security, and integrity of our Site, products and services, databases and other technology assets, and business.
                </li>
                <li>
                  For testing, research, analysis, and product development, including to develop and improve our Site, products, and services.
                </li>
                <li>
                  To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations.
                </li>
                <li>
                  As described to you when collecting your personal information or as otherwise set forth in the CCPA.
                </li>
                <li>
                  To evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by us about our Site users and consumers are among the assets transferred.
                </li>
              </ul>

              <p>
                We will not collect additional categories of personal information or use the personal information we collected for materially different, unrelated, or incompatible purposes without providing you notice.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Sharing Personal Information
              </h3>

              <p>
                We may share your personal information by disclosing it to a third-party for a business purpose. We make these business purpose disclosures only under written contracts that describe the purposes, require the recipient to keep the personal information confidential, and prohibit using the disclosed information for any purpose except performing the contract.
              </p>

              <p>
                In the preceding twelve (12) months, we have disclosed personal information for a business purpose to the categories of third parties indicated in the chart below.
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 mt-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left text-xs font-semibold text-gray-700">
                        Personal Information Category
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-xs font-semibold text-gray-700">
                        Business Purpose Disclosures to Third-Party Recipients
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        A: Identifiers.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        Yes, to our service providers.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        B: California Customer Records personal information categories.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        Yes, to our service providers.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        C: Commercial information.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        Yes, to our service providers.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        D: Internet or other similar network activity.
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-xs">
                        Yes, to our service providers.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4">
                We do not sell personal information and have not sold personal information to third parties in the preceding twelve (12) months. We do not and will not sell or share the personal information of minors under 16 years of age.
              </p>
            </div>
          </div>
        </Card>

        {/* Subtle page break divider */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 7</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Page 7 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Your Rights and Choices
              </h3>

              <p>
                The CCPA provides consumers (California residents) with specific rights regarding their personal information. This section describes your CCPA rights and explains how to exercise those rights.
              </p>

              <p>
                <strong>Right to Know and Data Portability</strong>
              </p>

              <p>
                You have the right to request that we disclose certain information to you about our collection and use of your personal information over the past 12 months (the "right to know"). Once we receive your request and confirm your identity (see Exercising Your Rights to Know or Delete), we will disclose to you:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>
                  The categories of personal information we collected about you;
                </li>
                <li>
                  The categories of sources for the personal information we collected about you;
                </li>
                <li>
                  Our business or commercial purpose for collecting that personal information;
                </li>
                <li>
                  The categories of third parties with whom we share that personal information;
                </li>
                <li>
                  If we disclosed your personal information for a business purpose, a list that describes the disclosures we made for a business purpose, identifying the personal information categories that each category of recipient obtained; and
                </li>
                <li>
                  The specific pieces of personal information we collected about you (also called a data portability request).
                </li>
              </ul>

              <p>
                <strong>Right to Delete</strong>
              </p>

              <p>
                You have the right to request that we delete any of your personal information that we collected from you and retained, subject to certain exceptions (the "right to delete"). Once we receive your request and confirm your identity (see Exercising Your Rights to Know or Delete), we will review your request to see if an exception allowing us to retain the information applies. We may deny your deletion request if retaining the information is necessary for us or our service provider(s) to:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Complete the transaction for which we collected the personal information, provide a good or service that you requested, take actions reasonably anticipated within the context of our ongoing business relationship with you, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, or otherwise perform our contract with you.
                </li>
                <li>
                  Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or prosecute those responsible for such activities.
                </li>
                <li>
                  Debug products to identify and repair errors that impair existing intended functionality.
                </li>
                <li>
                  Exercise free speech, ensure the right of another consumer to exercise their free speech rights, or exercise another right provided for by law.
                </li>
                <li>
                  Comply with the California Electronic Communications Privacy Act (Cal. Penal Code § 1546 et. seq.).
                </li>
                <li>
                  Enable solely internal uses that are reasonably aligned with consumer expectations based on your relationship with us.
                </li>
                <li>Comply with a legal obligation.</li>
                <li>
                  Make other internal and lawful uses of that information that are compatible with the context in which you provided it.
                </li>
              </ul>

              <p>
                We will delete or deidentify personal information not subject to one of these exceptions from our records and will direct our service providers to take similar action.
              </p>

              <p>
                <strong>Right to Correct Inaccurate Personal Information</strong>
              </p>

              <p>
                The CCPA provides you the right to request that we correct inaccurate personal information that we maintain about you.
              </p>

              <p>
                <strong>Right to Opt-Out:</strong>
              </p>

              <p>
                We do not and will not sell your personal information. The CCPA provides consumers with the right to opt-out of the sale or sharing of your personal information. For purposes of this California Privacy Policy, "share" means the disclosure of Personal Information to a third-party for cross-context behavioral advertising. We do not "share" Personal Information for cross-context behavioral advertising. Therefore, because we do not sell, share, or otherwise disclose your Personal Information for this purpose, you do not have the right to such opt-out at this time.
              </p>

              <p>
                <strong>Right to Limit Use and Disclosure of Sensitive Personal Information</strong>
              </p>

              <p>
                As disclosed in the above table, we may collect certain information that is considered Sensitive Personal Information under California law. Under the CCPA regulations, a business is only required to provide a right to limit the use and disclosure of sensitive personal information when such use does not fall within the list of exemptions outlined in the regulation. Our use and disclosure of Sensitive Personal Information falls within this list of exceptions and we do not use or disclose Sensitive Personal Information for other purposes. Therefore, we do not provide any such right to limit at this time.
              </p>
            </div>
          </div>
        </Card>

        {/* Subtle page break divider */}
        <div className="w-full max-w-4xl flex items-center my-8">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">Page 8</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Page 8 */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Exercising Your Rights to Know or Delete
              </h3>

              <p>
                To exercise your rights to know or delete described above, please submit a request by either:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Emailing us at:{" "}
                  <span className="text-blue-600 underline">
                    privacy@jointventurecard.com
                  </span>
                </li>
                <li>Calling us at: 855.858.2227</li>
              </ul>

              <p>
                Only you, or someone legally authorized to act on your behalf, may make a request to know or delete related to your personal information.
              </p>

              <p>
                You may only submit a request to know twice within a 12-month period. Your request to know or delete must:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Provide sufficient information that allows us to reasonably verify you are the person about whom we collected personal information or an authorized representative.
                </li>
                <li>
                  Describe your request with sufficient detail that allows us to properly understand, evaluate, and respond to it.
                </li>
              </ul>

              <p>
                We cannot respond to your request or provide you with personal information if we cannot verify your identity or authority to make the request and confirm the personal information relates to you.
              </p>

              <p>
                You do not need to create an account with us to submit a request to know or delete.
              </p>

              <p>
                We will only use personal information provided in the request to verify the requestor's identity or authority to make it.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Response Timing and Format
              </h3>

              <p>
                We will confirm receipt of your request within ten (10) business days. If you do not receive confirmation within the 10-day timeframe, please contact us using the contact information included in the section above called <strong>Exercising Your Rights to Know or Delete</strong>.
              </p>

              <p>
                We endeavor to substantively respond to a verifiable consumer request within forty-five (45) days of its receipt. If we require more time (up to another 45 days), we will inform you of the reason and extension period in writing.
              </p>

              <p>
                If you have an account with us, we will deliver our written response to that account. If you do not have an account with us, we will deliver our written response by mail or electronically, at your option.
              </p>

              <p>
                Any disclosures we provide will only cover the 12-month period preceding our receipt of your request. The response we provide will also explain the reasons we cannot comply with a request, if applicable. For data portability requests, we will select a format to provide your personal information that is readily useable and should allow you to transmit the information from one entity to another entity without hindrance.
              </p>

              <p>
                We do not charge a fee to process or respond to your verifiable consumer request unless it is excessive, repetitive, or manifestly unfounded. If we determine that the request warrants a fee, we will tell you why we made that decision and provide you with a cost estimate before completing your request.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-8 mb-4">
                Non-Discrimination
              </h3>

              <p>
                We will not discriminate against you for exercising any of your CCPA rights. Unless permitted by the CCPA, we will not:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>Deny you goods or services.</li>
                <li>
                  Charge you different prices or rates for goods or services, including through granting discounts or other benefits, or imposing penalties.
                </li>
                <li>
                  Provide you a different level or quality of goods or services.
                </li>
                <li>
                  Suggest that you may receive a different price or rate for goods or services or a different level or quality of goods or services.
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OnlinePrivacyPolicyPreview;
