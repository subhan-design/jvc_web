import React from 'react';

const Page: React.FC<{ children: React.ReactNode; pageNum?: number }> = ({ children, pageNum }) => (
  <>
    <div className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] mx-auto relative" style={{ width: '816px', minHeight: '1056px', padding: '72px 72px 80px 72px' }}>
      {children}
      {pageNum && (
        <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-gray-400">
          {pageNum}
        </div>
      )}
    </div>
    <div className="h-6" />
  </>
);

const OnlinePrivacyPolicyPreviewConsumer: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#525659] py-8 px-4 overflow-auto">
      <div className="mx-auto" style={{ width: '816px' }}>

        {/* ===== PAGE 1 ===== */}
        <Page pageNum={1}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            {/* Logo */}
            <div className="mb-2">
              <div className="text-blue-900 font-bold text-[28px] tracking-tight font-sans">JVC</div>
            </div>

            <div className="border-b-2 border-gray-200 pb-1 mb-6" />

            <p className="text-gray-500 text-[15px] mb-0 font-sans">Joint Venture Card</p>
            <h1 className="text-[32px] font-bold text-blue-900 mt-1 mb-1 font-sans leading-tight">Online Privacy Policy</h1>
            <p className="text-gray-500 text-[13px] mb-8 font-sans">Last updated August 1, 2025</p>

            <div className="space-y-4">
              <p>
                Your privacy is important to us and we are committed to protecting it through our compliance with this Online Privacy Policy (the &ldquo;Policy&rdquo;). The terms &ldquo;JVC&rdquo; and &ldquo;Joint Venture Card&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo; in this Policy refers to JVC Holdings, Inc. and any banking or non-banking U.S. affiliates of JVC that refer or link to this Policy. To the extent that you obtain a financial product or serve to you, our <strong>Financial Privacy Notice</strong> will govern. Additional privacy rights and notices will apply if you are a California resident. See the section below called <span className="text-blue-700 underline cursor-pointer">Your California Privacy Rights</span> for more information about your rights under California law.
              </p>

              <p>
                This Policy describes how we manage personal information about you when you interact with us online through our websites, mobile applications and social sites (a &ldquo;Site&rdquo; or the &ldquo;Sites&rdquo;), using your computer, smartphone, tablet or other mobile device (a &ldquo;Device&rdquo; or the Devices&rdquo;). We maintain our Sites and provide services through them for your information and communication purposes, as well as for purposes associated with the marketing, origination, and servicing of our products and services (the &ldquo;Service&rdquo; or &ldquo;Services&rdquo;). This Policy also explains how JVC collects personal information that you may provide when you visit, use or interact with us online, and through our ads displayed through online services operated by us or non-affiliated third parties. In addition, this Policy explains how we may use or share personal information collected to provide our Services to you and for advertising purposes.
              </p>

              <p>
                Please read this Policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Sites. By using our Sites, you agree to the terms and conditions of this Policy.
              </p>

              <p>
                Our Sites and Services are intended for use only by United States residents, while located in the United States. If you are not a United States resident, or are located in a country other than the United States, you may not use our Sites or request and obtain Services from us through those Sites.
              </p>

              <p>
                We work with third-party providers that are contractually obligated to comply with our policies for protecting information. However, if you visit or access one of these third-party provider sites or mobile apps, please review the online privacy policies that apply to the third-party provider&rsquo;s site or mobile app to understand the specifics of how your online personal information may be collected, used and shared.
              </p>

              <h2 className="text-[15px] font-bold text-gray-900 mt-6 mb-2">Updates To This Policy</h2>

              <p>
                This Policy may change from time to time, so please check this Policy periodically for updates. For example, we may update this Policy periodically to comply with updates to federal, state, and local laws, or to reflect our own business choices and preferences. If we make changes to this Policy, we will revise the &ldquo;<span className="text-blue-700 underline">last updated</span>&rdquo; date at the top of this Policy. You are responsible for periodically reviewing this Policy to check for any changes. If we change the Policy on this Site and you continue to use it, you agree that your continued use of the Site will mean you have accepted all of the changes described in our updated Policy.
              </p>
            </div>
          </div>
        </Page>

        {/* ===== PAGE 2 ===== */}
        <Page pageNum={2}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            <h2 className="text-[15px] font-bold text-gray-900 mb-3">JVC&rsquo;s Online Privacy Practices</h2>
            <div className="space-y-4">
              <p>
                JVC is committed to transparency about your personal information. In some cases, we may ask for your express consent to use or disclose your personal information (for example, if we determine that your express consent is required or advisable under applicable law). Otherwise, when you use our Site and Services, you consent to the collection, use and sharing of your personal information as described by this Policy, subject to applicable law and other notices we may have provided to you based on our relationship with you and based on the Services you obtain from us using our Sites or otherwise.
              </p>
            </div>

            <h2 className="text-[15px] font-bold text-gray-900 mt-6 mb-3">Linking To Other Sites</h2>
            <div className="space-y-4">
              <p>
                We may provide links to non-affiliated third-party sites, such as credit bureaus, service providers or merchants. If you follow links to any site that is not affiliated with or controlled by JVC, you should review their privacy and security policies and other terms and conditions, because the policies of those third parties may be different from those that apply to our Sites and Services. We do not guarantee and are not responsible for the privacy or security of these third-party sites or for the accuracy, completeness, or reliability of information found on those other sites.
              </p>
            </div>

            <h2 className="text-[15px] font-bold text-gray-900 mt-6 mb-3">Protecting Your Personal Information</h2>
            <div className="space-y-4">
              <p>
                We use security measures that comply with applicable federal and state laws to protect personal information from unauthorized access and use. Security measures may include device safeguards and secured files and buildings, as well as oversight of our third-party providers to ensure personal information remains confidential and secure.
              </p>
            </div>

            <h2 className="text-[15px] font-bold text-gray-900 mt-6 mb-3">Persons Under 18 Years of Age</h2>
            <div className="space-y-4">
              <p>
                Our Site is not intended for children under 18 years of age. No one under age 18 is allowed to provide personal information on this Site. We do not knowingly collect personal information from children under 18. If you are under 18, do not use or provide any information on this Site or provide any information about yourself to us, including your name, address, telephone number, email address, or any screen name or username you may use. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information.
              </p>
            </div>

            <h2 className="text-[15px] font-bold text-gray-900 mt-6 mb-3">Keeping Your Personal Information Accurate and Updated</h2>
            <div className="space-y-4">
              <p>
                Keeping your personal information accurate and up to date is very important. If your personal information is incomplete, inaccurate or not current, please use the <em>Contact Us</em> or similar option on our Sites, or call us at the telephone numbers or write to us at the appropriate address for changes listed on your account statements, records, online or other account materials.
              </p>
            </div>

            <h2 className="text-[22px] font-normal text-blue-800 mt-8 mb-3 font-sans">Personal Information We Collect</h2>

            <p className="font-bold mb-2">How do we collect personal information online?</p>
            <p className="underline mb-3">Cookies and similar technologies</p>
            <div className="space-y-4">
              <p>
                We collect personal information about you through your Devices by using &ldquo;cookies&rdquo; and similar tracking technologies (including pixels or clear GIFs, tags, web beacons and Flash objects). Cookies are text files containing small amounts of information that are downloaded to your Devices when you visit a website. Tracking technologies may collect information about you and your use of our Sites. Cookies allow a site or mobile app to recognize your Device, keep track of pages visited, and remember your preferences. This information is used for security purposes, to facilitate navigation, to display information more effectively and to personalize the user&rsquo;s experience. Cookies and similar tracking technologies are also used to gather information to improve website design and functionality and assist with resolving questions regarding our Sites.
              </p>
            </div>
          </div>
        </Page>

        {/* ===== PAGE 3 ===== */}
        <Page pageNum={3}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            <div className="space-y-4">
              <p>
                Cookies set by JVC and cookies created and set by third-party providers on our behalf are called &ldquo;first-party&rdquo; cookies. Cookies set by third-party providers, but which are not set on our behalf, are called &ldquo;third-party&rdquo; cookies. Information obtained from a third-party cookie can be used only for the purposes we have stated in our contracts with the third-party. There can be first-party and/or third-party cookies within any of the Categories of Cookies described below.
              </p>

              <p>
                Cookies that expire at the end of a browser session are called &ldquo;session&rdquo; cookies. Cookies that are stored longer are called &ldquo;persistent&rdquo; cookies. Generally, there can be session and/or persistent cookies within any of the below Categories of Cookies.
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

              <p className="underline mt-4 mb-2">Other means of collecting personal information</p>

              <p>
                JVC also collects personal information that you provide when visiting or using our Sites and Services. This may occur when you apply for or open a new account, register for a new product or service, or request information about a product or service. We may also use third-party providers to process personal information for business purposes on our behalf. These third-party providers are contractually required to keep this information confidential and to comply with our policies to protect information we share with them or they collect on our behalf. The personal information we collect is limited to what is required to provide our Services and to support legal, risk management and regulatory compliance requirements. For additional information, please review the &ldquo;How We Use and Share Personal Information&rdquo; section of this Policy.
              </p>

              <h3 className="font-bold text-gray-900 mt-6 mb-2">Types of personal information we collect online</h3>

              <p>The type of personal information we collect from and about you online will depend on how you interact with us and may include:</p>

              <div className="ml-8 space-y-2">
                <p>A. &nbsp;Contact information, such as name, mailing address, email address, telephone and mobile number(s);</p>
                <p>B. &nbsp;Account application information, such as credit and income information;</p>
                <p>C. &nbsp;Identifiers such as Social Security number, account number(s), driver&rsquo;s license number (or comparable) or other information that identifies you for ordinary business purposes;</p>
                <p>D. &nbsp;Access authorization, such as username, alias, PIN and Passcode and security questions and answers;</p>
                <p className="font-bold">E. &nbsp;Information from your computer and mobile devices, where allowed by individual browsers and/or operating systems. such as:</p>
              </div>
            </div>
          </div>
        </Page>

        {/* ===== PAGE 4 ===== */}
        <Page pageNum={4}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            <div className="ml-16 space-y-1 mb-4">
              <p>a. &nbsp;Unique device identifiers (for example Media Access Control (MAC) and Internet Protocol (IP) addresses); and</p>
              <p>b. &nbsp;Browser type, version, language, and display/screen settings;</p>
            </div>
            <div className="ml-8 space-y-2">
              <p>F. &nbsp;Information about how you use and interact with our Sites and use our Services (for example, activities on pages visited, links clicked or unique and measurable patterns such as keystrokes, mouse clicks and movements, swipes and gestures);</p>
              <p>G. &nbsp;Responses to advertisements on the sites and mobile apps where we advertise;</p>
              <p>H. &nbsp;Log information, such as your search and voice to text queries using our Sites;</p>
              <p>I. &nbsp;&nbsp;Search engine referrals;</p>
              <p>J. &nbsp;Geo-location information with consent (for example, merchant location, fraud prevention); and</p>
              <p>K. &nbsp;Social media preferences</p>
            </div>

            <h2 className="text-[22px] font-normal text-blue-800 mt-10 mb-4 font-sans">How We Use and Share Personal Information</h2>

            <p className="font-bold mb-3">How do we use your personal information?</p>
            <p className="mb-3">Personal information collected from and about you online described in this Policy may be used for many purposes, such as:</p>

            <div className="ml-8 space-y-3">
              <p>A. &nbsp;Delivering products and services to you (for example, to verify your identity when you access your account information, or when we process your applications or requests for prequalified offers, or otherwise request or obtain our Services using the Sites or otherwise);</p>
              <p>B. &nbsp;Personalizing your digital and mobile experience by enhancing the organization and design of our Sites and by analyzing data to create relevant alerts, products or services;</p>
              <p>C. &nbsp;Providing advertising on our Sites, as well as non-affiliated third-party sites and through off-line channels like call centers and direct marketing (for example email, mail and phone);</p>
              <p>D. &nbsp;Detecting and preventing fraud, identify theft and other risks to you or us;</p>
              <p>E. &nbsp;Performing analytics concerning your use of our online services, including your responses to our emails and the pages and advertisements you view;</p>
              <p>F. &nbsp;Complying with and enforcing applicable legal requirements, industry standards, contractual obligations and our policies;</p>
              <p>G. &nbsp;Allowing you to use features within our Sites when you grant us access to personal information from your Device, such as contact lists, or geo-location when you request certain Services that requires such access (for example, to locate a merchant); and</p>
              <p>H. &nbsp;To evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by us about our Site users and consumers are among the assets transferred.</p>
            </div>

            <p className="mt-4">
              We keep personal information for as long as applicable law requires or allows and will use it for our legitimate business purposes. When we determine that personal information is no longer needed or that we are no longer required or allowed to keep it, we will securely delete that personal information.
            </p>
          </div>
        </Page>

        {/* ===== PAGE 5 ===== */}
        <Page pageNum={5}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            <p className="font-bold mb-3">With whom do we share your personal information?</p>
            <p className="mb-3">Subject to other legal restrictions and notices you may receive from us based on our relationship with you, we may share the personal information we collect from and about you online described in this Policy:</p>

            <div className="ml-8 space-y-2 mb-6">
              <p>A. &nbsp;Among our affiliates and subsidiaries;</p>
              <p>B. &nbsp;With third-party providers that have contracts with us, including contractors and technology service providers;</p>
              <p>C. &nbsp;To fulfill the purpose for which your personal information is provided;</p>
              <p>D. &nbsp;To comply with any court order, law, or legal process, including responding to any government or regulatory request;</p>
              <p>E. &nbsp;With your consent;</p>
              <p>F. &nbsp;To conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by us about our Site users and consumers are among the assets transferred; and</p>
              <p>G. &nbsp;For any other purpose we disclosed when obtaining the personal information.</p>
            </div>

            <h3 className="font-bold text-gray-900 mt-4 mb-3">Aggregated and De-identified information</h3>
            <p className="mb-4">
              We may aggregate or de-identify personal information, meaning we may remove any details that identify you personally. We may share this aggregated and/or de-identified information with third-party providers to help deliver products, services and content that are better tailored to the users of our Services and for our own business purposes, where permissible under applicable laws and regulations.
            </p>

            <h3 className="font-bold text-gray-900 mt-4 mb-3">How to limit sharing</h3>
            <p className="mb-3">
              You have choices regarding the sharing of some personal information. Where appropriate, we will limit sharing of your personal information based on your privacy choices.
            </p>
            <p className="mb-6">
              Industry standards are currently evolving and we may not separately respond to or take any action with respect to a &ldquo;do not track&rdquo; configuration set in your Internet browser.
            </p>

            <h2 className="text-[22px] font-normal text-blue-800 mt-4 mb-4 font-sans">Additional Information</h2>

            <h3 className="font-bold text-gray-900 mb-3">Third-party data sharing</h3>
            <p className="mb-3">
              Some companies may offer aggregation websites and services that allow you to share your data with them to consolidate your account information from different sources (such as your accounts with us or with other financial institutions), so you can view it in one location or perform actions related to your accounts using their services. To do this, a third-party may request you to authorize access to your JVC accounts by providing your JVC username and passcode or by providing your information-sharing consent directly to JVC. Please be careful about using these third parties and keep the following details in mind if you choose to use these third-party service providers:
            </p>

            <div className="ml-8 space-y-2">
              <p>A. &nbsp;The third-party may access, on your behalf, detailed and personally identifiable information about you, about your accounts, transactions, and relationship with us, and about the Services you obtain from and through us;</p>
              <p>B. &nbsp;You should use caution and ensure the third-party has appropriate policies and practices to protect the privacy and security of any personal information you provide or to which they are gaining access;</p>
              <p>C. &nbsp;Use of your information by the third-party is governed by your agreement with them, not by any agreement you have with us;</p>
              <p>D. &nbsp;We are not responsible for the use or disclosure of any personal information accessed by any company or</p>
            </div>
          </div>
        </Page>

        {/* ===== PAGE 6 ===== */}
        <Page pageNum={6}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            <div className="ml-12 mb-2">
              <p>person to whom you provide your username and passcode;</p>
            </div>
            <div className="ml-8 space-y-2 mb-6">
              <p>E. &nbsp;If you share your JVC username and passcode or other information about your accounts with others, we will consider your decision to share this information with others to mean that you have authorized any transaction or action that is initiated using the access information you provided;</p>
              <p>F. &nbsp;If you decide to revoke the authority you have given to a third-party, we strongly recommend that you change your JVC passcode to ensure that the third-party cannot continue to access your account.</p>
            </div>

            <h3 className="font-bold text-gray-900 mt-4 mb-3">Social media</h3>
            <p className="mb-3">
              We may engage with customers and potential customers on social media platforms, such as Facebook&reg;, Twitter&reg;, YouTube&reg; and LinkedIn&reg;.
            </p>

            <div className="ml-8 space-y-2 mb-4">
              <p>A. &nbsp;Any content you post on official JVC managed social media pages, such as pictures, information, opinions or any personal information that you make available to other participants on these social platforms, is subject to the Terms of Use and Privacy Policies of those respective platforms.</p>
              <p>B. &nbsp;When interacting with official JVC social media pages, JVC&rsquo;s privacy notices and any applicable social media user terms and community guidelines may apply.</p>
              <p>C. &nbsp;Please review the privacy policy for the specific social media service you are using to better understand your rights and obligations with regard to such content.</p>
            </div>

            <p>
              We may allow social share buttons on our sites that enable users to easily share information on social media platforms. The non-affiliated third parties that own these widgets may have access to information about your browsing on pages of our Sites where these widgets are placed.
            </p>
          </div>
        </Page>

        {/* ===== PAGE 7 ===== */}
        <Page pageNum={7}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            <h2 className="text-[22px] font-normal text-blue-800 mb-2 font-sans">Your California Privacy Rights</h2>
            <p className="text-[12px] text-gray-600 mb-0">Effective Date: August 1, 2025</p>
            <p className="text-[12px] text-gray-600 mb-4">Last Updated and Reviewed: August 1, 2025</p>

            <div className="space-y-4">
              <p>
                This Privacy Policy for California Residents (&ldquo;California Privacy Policy&rdquo;) supplements the information contained in our general Policy and applies solely to visitors, users, and others who reside in the State of California (&ldquo;consumers&rdquo; or &ldquo;you&rdquo;). We adopt this notice to comply with the California Consumer Privacy Act of 2018 (&ldquo;CCPA&rdquo;). Any terms defined by the CCPA have the same meaning when used in this California Privacy Policy.
              </p>

              <h3 className="font-bold text-gray-900 mt-4 mb-2">Notice At Collection/Personal Information We Collect</h3>

              <p>
                We collect information that identifies, relates to, describes, references, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer, household, or device (&ldquo;personal information&rdquo;).
              </p>

              <p>Personal information does not include:</p>

              <div className="ml-8 space-y-2">
                <p>A. &nbsp;Publicly available information from government records;</p>
                <p>B. &nbsp;Deidentified or aggregated consumer information; and</p>
                <p>C. &nbsp;Information excluded from the CCPA&rsquo;s scope, such as personal information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act (FCRA), the Gramm-Leach-Bliley Act (GLBA) or California Financial Information Privacy Act (FIPA), and the Driver&rsquo;s Privacy Protection Act of 1994.</p>
              </div>

              <p>In particular, we have collected the following categories of personal information from consumers within the last twelve (12) months:</p>
            </div>

            {/* Table */}
            <table className="w-full border-collapse border border-gray-400 mt-4 text-[12px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold w-[30%]">Category</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold">Examples</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold w-[12%]">Collected</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 px-3 py-2 align-top">A. &nbsp;Identifiers.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">A name, postal address, Internet Protocol address, and email address.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">YES</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-3 py-2 align-top">B. &nbsp;Personal information categories listed in the California Customer Records statute (Cal. Civ. Code &sect; 1798.80(e)).</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">A name, postal address, Internet Protocol address, and email address. Some personal information included in this category may overlap with other categories.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">YES</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-3 py-2 align-top">C. &nbsp;Commercial information.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">Records of personal property, products or services purchased, obtained, or considered with us.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">YES</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-3 py-2 align-top">D. &nbsp;Internet or other similar network activity.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">Browsing history, search history, information on a consumer&rsquo;s interaction with a website, application, or advertisement.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">YES</td>
                </tr>
              </tbody>
            </table>

            <div className="space-y-3 mt-4">
              <p>We obtain the categories of personal information listed above from the following categories of sources:</p>
              <div className="ml-8 space-y-2">
                <p>A. &nbsp;Directly from you. For example, from forms you complete or products and services you purchase.</p>
                <p>B. &nbsp;Indirectly from you. For example, from observing your actions on our Site.</p>
              </div>
            </div>
          </div>
        </Page>

        {/* ===== PAGE 8 ===== */}
        <Page pageNum={8}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            <h3 className="font-bold text-gray-900 mb-3">Use of Personal Information</h3>
            <p className="mb-3">We may use or disclose the personal information we collect for one or more of the following purposes:</p>

            <div className="ml-8 space-y-2 mb-4">
              <p>A. &nbsp;To fulfill or meet the reason you provided the information. For example, if you share your name and contact information to request a prequalified offer or ask a question about our products or services, we will use that personal information to respond to your inquiry. If you provide your personal information to obtain a product or service, we will use that information to process your request and facilitate delivery. We may also save your information to facilitate new orders or process transactions.</p>
              <p>B. &nbsp;To provide, support, personalize, and develop our Site, products, and services.</p>
              <p>C. &nbsp;To create, maintain, customize, and secure your account with us.</p>
              <p>D. &nbsp;To process your requests, purchases, transactions, and payments and prevent transactional fraud.</p>
              <p>E. &nbsp;To provide you with support and to respond to your inquiries, including to investigate and address your concerns and monitor and improve our responses.</p>
              <p>F. &nbsp;To personalize your Site experience and to deliver content and product and service offerings relevant to your interests, including targeted offers and ads through our Site and via email or text message (with your consent, where required by law).</p>
              <p>G. &nbsp;To help maintain the safety, security, and integrity of our Site, products and services, databases and other technology assets, and business.</p>
              <p>H. &nbsp;For testing, research, analysis, and product development, including to develop and improve our Site, products, and services.</p>
              <p>I. &nbsp;&nbsp;To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations.</p>
              <p>J. &nbsp;As described to you when collecting your personal information or as otherwise set forth in the CCPA.</p>
              <p>K. &nbsp;To evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by us about our Site users and consumers are among the assets transferred.</p>
            </div>

            <p className="mb-4">
              We will not collect additional categories of personal information or use the personal information we collected for materially different, unrelated, or incompatible purposes without providing you notice.
            </p>

            <h3 className="font-bold text-gray-900 mt-4 mb-3">Sharing Personal Information</h3>
            <p className="mb-3">
              We may share your personal information by disclosing it to a third-party for a business purpose. We make these business purpose disclosures only under written contracts that describe the purposes, require the recipient to keep the personal information confidential, and prohibit using the disclosed information for any purpose except performing the contract.
            </p>
            <p>
              In the preceding twelve (12) months, we have disclosed personal information for a business purpose to the categories of third parties indicated in the chart below.
            </p>
          </div>
        </Page>

        {/* ===== PAGE 9 ===== */}
        <Page pageNum={9}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            {/* Sharing Table */}
            <table className="w-full border-collapse border border-gray-400 text-[12px] mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold w-[30%]">Category</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold">Examples</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold w-[12%]">Collected</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 px-3 py-2 align-top">A. &nbsp;Identifiers.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">A name, postal address, Internet Protocol address, and email address.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">YES</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-3 py-2 align-top">B. &nbsp;Personal information categories listed in the California Customer Records statute (Cal. Civ. Code &sect; 1798.80(e)).</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">A name, postal address, Internet Protocol address, and email address. Some personal information included in this category may overlap with other categories.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">YES</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-3 py-2 align-top">C. &nbsp;Commercial information.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">Records of personal property, products or services purchased, obtained, or considered with us.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">YES</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-3 py-2 align-top">D. &nbsp;Internet or other similar network activity.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">Browsing history, search history, information on a consumer&rsquo;s interaction with a website, application, or advertisement.</td>
                  <td className="border border-gray-400 px-3 py-2 align-top">YES</td>
                </tr>
              </tbody>
            </table>

            <p className="mb-6">
              We do not sell personal information and have not sold personal information to third parties in the preceding twelve (12) months. We do not and will not sell or share the personal information of minors under 16 years of age.
            </p>

            <h3 className="font-bold text-gray-900 mt-2 mb-3">Your Rights and Choices</h3>
            <p className="mb-4">
              The CCPA provides consumers (California residents) with specific rights regarding their personal information. This section describes your CCPA rights and explains how to exercise those rights.
            </p>

            <h3 className="font-bold text-gray-900 mb-3">Right to Know and Data Portability</h3>
            <p className="mb-3">
              You have the right to request that we disclose certain information to you about our collection and use of your personal information over the past 12 months (the &ldquo;right to know&rdquo;). Once we receive your request and confirm your identity (see Exercising Your Rights to Know or Delete), we will disclose to you:
            </p>

            <div className="ml-8 space-y-2 mb-4">
              <p>L. &nbsp;The categories of personal information we collected about you;</p>
              <p>M. &nbsp;The categories of sources for the personal information we collected about you;</p>
              <p>N. &nbsp;Our business or commercial purpose for collecting that personal information;</p>
              <p>O. &nbsp;The categories of third parties with whom we share that personal information;</p>
              <p>P. &nbsp;If we disclosed your personal information for a business purpose, a list that describes the disclosures we made for a business purpose, identifying the personal information categories that each category of recipient obtained; and</p>
              <p>Q. &nbsp;The specific pieces of personal information we collected about you (also called a data portability request).</p>
            </div>

            <h3 className="font-bold text-gray-900 mt-4 mb-3">Right to Delete</h3>
            <p>
              You have the right to request that we delete any of your personal information that we collected from you and retained, subject to certain exceptions (the &ldquo;right to delete&rdquo;). Once we receive your request and confirm your identity (see Exercising Your Rights to Know or Delete), we will review your request to see if an exception allowing us to retain the information applies. We may deny your deletion request if retaining the information is necessary for us or our service provider(s) to:
            </p>
          </div>
        </Page>

        {/* ===== PAGE 10 ===== */}
        <Page pageNum={10}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            <div className="ml-8 space-y-2 mb-6">
              <p>A. &nbsp;Complete the transaction for which we collected the personal information, provide a good or service that you requested, take actions reasonably anticipated within the context of our ongoing business relationship with you, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, or otherwise perform our contract with you.</p>
              <p>B. &nbsp;Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or prosecute those responsible for such activities.</p>
              <p>C. &nbsp;Debug products to identify and repair errors that impair existing intended functionality.</p>
              <p>D. &nbsp;Exercise free speech, ensure the right of another consumer to exercise their free speech rights, or exercise another right provided for by law.</p>
              <p>E. &nbsp;Comply with the California Electronic Communications Privacy Act (Cal. Penal Code &sect; 1546 et. seq.).</p>
              <p>F. &nbsp;Enable solely internal uses that are reasonably aligned with consumer expectations based on your relationship with us.</p>
              <p>G. &nbsp;Comply with a legal obligation.</p>
              <p>H. &nbsp;Make other internal and lawful uses of that information that are compatible with the context in which you provided it.</p>
              <p>I. &nbsp;&nbsp;We will delete or deidentify personal information not subject to one of these exceptions from our records and will direct our service providers to take similar action.</p>
            </div>

            <h3 className="font-bold text-gray-900 mb-3">Right to Correct Inaccurate Personal Information</h3>
            <p className="mb-6">
              The CCPA provides you the right to request that we correct inaccurate personal information that we maintain about you.
            </p>

            <h3 className="font-bold text-gray-900 mb-3">Right to Opt-Out</h3>
            <p className="mb-6">
              We do not and will not sell your personal information. The CCPA provides consumers with the right to opt-out of the sale or sharing of your personal information. For purposes of this California Privacy Policy, &ldquo;share&rdquo; means the disclosure of Personal Information to a third-party for cross-context behavioral advertising. We do not &ldquo;share&rdquo; Personal Information for cross-context behavioral advertising. Therefore. because we do not sell, share, or otherwise disclose your Personal Information for this purpose, you do not have the right to such opt-out at this time.
            </p>

            <h3 className="font-bold text-gray-900 mb-3">Right to Limit Use and Disclosure of Sensitive Personal Information</h3>
            <p className="mb-6">
              As disclosed in the above table, we may collect certain information that is considered Sensitive Personal Information under California law. Under the CCPA regulations, a business is only required to provide a right to limit the use and disclosure of sensitive personal information when such use does not fall within the list of exemptions outlined in the regulation. Our use and disclosure of Sensitive Personal Information falls within this list of exceptions and we do not use or disclose Sensitive Personal Information for other purposes. Therefore, we do not provide any such right to limit at this time.
            </p>

            <h3 className="font-bold text-gray-900 mb-3">Exercising Your Rights to Know or Delete</h3>
            <p className="mb-2">To exercise your rights to know or delete described above, please submit a request by either:</p>
            <div className="ml-8 mb-4 space-y-1">
              <p>Emailing us at: <a href="mailto:privacy@jointventurecard.com" className="text-blue-700 underline">privacy@jointventurecard.com</a> or</p>
              <p>Calling us at: 855.858.2227</p>
            </div>
            <p className="mb-3">
              Only you, or someone legally authorized to act on your behalf, may make a request to know or delete related to your personal information.
            </p>
            <p className="mb-2">You may only submit a request to know twice within a 12-month period. Your request to know or delete must:</p>
          </div>
        </Page>

        {/* ===== PAGE 11 ===== */}
        <Page pageNum={11}>
          <div className="text-[13px] leading-[1.6] text-gray-800 font-['Times_New_Roman',_serif]">
            <div className="ml-8 space-y-2 mb-4">
              <p>A. &nbsp;Provide sufficient information that allows us to reasonably verify you are the person about whom we collected personal information or an authorized representative.</p>
              <p>B. &nbsp;Describe your request with sufficient detail that allows us to properly understand, evaluate, and respond to it.</p>
            </div>

            <div className="space-y-4">
              <p>
                We cannot respond to your request or provide you with personal information if we cannot verify your identity or authority to make the request and confirm the personal information relates to you.
              </p>
              <p>
                You do not need to create an account with us to submit a request to know or delete.
              </p>
              <p>
                We will only use personal information provided in the request to verify the requestor&rsquo;s identity or authority to make it.
              </p>
            </div>

            <h3 className="font-bold text-gray-900 mt-6 mb-3">Response Timing and Format</h3>
            <div className="space-y-4">
              <p>
                We will confirm receipt of your request within ten (10) business days. If you do not receive confirmation within the 10-day timeframe, please contact us using the contact information included in the section above called Exercising Your Rights to Know or Delete.
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
            </div>

            <h3 className="font-bold text-gray-900 mt-6 mb-3">Non-Discrimination</h3>
            <p className="mb-3">We will not discriminate against you for exercising any of your CCPA rights. Unless permitted by the CCPA, we will not:</p>

            <div className="ml-8 space-y-2">
              <p>A. &nbsp;Deny you goods or services.</p>
              <p>B. &nbsp;Charge you different prices or rates for goods or services, including through granting discounts or other benefits, or imposing penalties.</p>
              <p>C. &nbsp;Provide you a different level or quality of goods or services.</p>
              <p>D. &nbsp;Suggest that you may receive a different price or rate for goods or services or a different level or quality of goods or services.</p>
            </div>
          </div>
        </Page>

      </div>
    </div>
  );
};

export default OnlinePrivacyPolicyPreviewConsumer;
