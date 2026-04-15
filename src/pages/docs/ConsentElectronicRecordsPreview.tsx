import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ConsentElectronicRecordsPreview = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Document Content */}
        <Card className="bg-white p-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Consent for Use of Electronic Signatures and Records
              </h2>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                In this Consent for Use of Electronic Records and Signatures
                ("E-Sign Consent'), the words "you" and "your" mean any person
                giving consent to our use of electronic records and signatures
                as described below. The words "we," "us" and "our" mean Joint
                Venture Card Holdings, Inc., its affiliates, its successors,
                assigns, and their respective agents and service providers.
              </p>

              <p>
                You are requesting or have obtained financial products or
                services from us. With your consent, we may choose to provide
                certain Records to you in electronic form and obtain your
                electronic signature in connection with those Records and other
                notices, instruments and terms. You are not required to receive
                Records in electronic form and sign them electronically. If you
                do not want to consent to our use of electronic Records and
                signatures at this time, please close your web browser and do
                not electronically sign this E-Sign Consent.
              </p>

              <p>
                Please read this E-Sign Consent carefully and print or save a
                copy for future reference to verify that you can keep this type
                of electronic Record.
              </p>

              <p>
                <strong>Description of Electronic Records.</strong> The
                "Records" covered by this E-Sign Consent include any
                disclosures, notices, consents, authorizations, agreements,
                statements, or terms and conditions we may choose to display,
                deliver or otherwise provide to you in electronic form in
                connection with the marketing, origination, and servicing of any
                financial and non-financial products and services that you
                request or obtain from us, now and in the future, including any
                that must be electronically signed and any that we are required
                or allowed by law to provide to you in writing. We may display,
                deliver or provide these "Records" to you in electronic form:
                (i) when you apply for or request prequalification for our
                financial products or services (for example, through application
                disclosures, adverse action notices, and financial privacy
                notices); (ii) when we open, permit access, or provide you with
                financial products and services (for example, through account
                opening disclosures, risk based pricing notices or credit score
                disclosure exception notices, and any terms, conditions, or
                agreements for credit accounts, deposit accounts, and ancillary
                products or services); and (iii) when we maintain, hold, service
                or collect financial products and services for you and on your
                behalf (for example, through periodic statements, change in
                terms notifications, adverse action notices, payment
                authorizations, financial privacy notices, transaction receipts
                or confirmations, and servicing or collections communications
                and correspondence, including any allowed or required by
                applicable law). We reserve the right to decide which Records to
                provide electronically and when to request your electronic
                signature for those Records.
              </p>

              <p>
                <strong>Description of Electronic Signatures.</strong> You agree
                that your electronic signature results from your use of a key
                pad, touch screen, mouse or other device on a computer, mobile
                device or other electronic access device (each, an "Access
                Device") to select an item, button, box, icon or take similar
                action while you use any electronic service we offer, now and in
                the future. You agree we can obtain your electronic signature
                and rely on it to provide access to Records, to have you
                acknowledge receipt of Records, to have you authorize or give
                consent for transactions and action, to accept our terms and
                conditions, and to enter into contracts and agreements with us
                that are enforceable and binding on you, just as if you used a
                pen or pencil to sign a writing set forth on paper. You agree
                that no certification authority or other third party
                verification is required to validate your electronic signature.
                You agree that the lack of any such certification or third party
                verification will not in any way affect the enforceability of
                your signature or resulting contract between you and us.
              </p>

              <p>
                <strong>Hardware and Software Requirements.</strong> To view and
                print or save electronic Records, you must use an Access Device
                that permits Internet access. You must have a printer or
                long-term storage device that allows you to print or save
                electronic Records for future reference. You must use web
                browser software that supports the HTTPS protocol, HTML,
                cookies, and encryption, such as current versions of Microsoft
                Internet Explorer®, Google Chrome®, Mozilla Firefox®, or
                something similar. You must have software that allows you to
                view and print or save PDF documents, such as Adobe Acrobat
                Reader X® or Foxit®. You must maintain a working electronic mail
                ("email") account that allows you to view and print or save any
                electronic Records we send to your designated email address
                (including electronic Records displayed in the email message,
                attached to it, or displayed when you select links included in
                the message). If we change the hardware or software requirements
                in a way that creates a material risk that you will be unable to
                access or keep Records we previously provided to you in
                electronic form, we will display the revised requirements on our
                website or otherwise send notice to you of the revised
                requirements.
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
              <p>
                questions about any hardware or software requirements, you may
                send an email to us at{" "}
                <span className="text-blue-600 underline">
                  support@jointventurecard.com
                </span>
                .
              </p>

              <p>
                <strong>Obtaining Paper Copies of Records.</strong> You may
                request paper copies of the Records we provide at any time. You
                may ask us to send additional copies of a Record to your
                designated email address at no additional cost to you, which may
                allow you to print paper copies of the Record using your own
                Access Device and printer. If you want to receive paper copies
                from us of Records you previously authorized us to provide in
                electronic form, you may send an email to us at
                <span className="text-blue-600 underline">
                  {" "}
                  support@jointventurecard.com
                </span>
                . Your request for a paper copy of any Record will not, by
                itself, mean you have withdrawn your prior consent to receive
                Records electronically. If you withdraw your prior consent for
                our use of electronic Records and signatures, your withdrawal of
                consent will not apply to any electronic Records or signatures
                provided before the date your withdrawal of consent takes
                effect. We may require you to pay reasonable charges for
                preparing and mailing paper copies of your Records, unless
                applicable law prohibits us from imposing those charges.
              </p>

              <p>
                <strong>
                  How To Update Your Contact Information and Designated Email
                  Address.
                </strong>{" "}
                If you have a working email address and/or telephone number, we
                may require you to include and maintain that information as part
                of your personal contact information. You agree to provide us
                with your correct and complete personal contact information and
                promptly notify us of any changes, including changes in your
                designated email address, telephone, and mailing address. You
                can update your contact information, including your email
                address, by sending an email to us at
                <span className="text-blue-600 underline">
                  {" "}
                  support@jointventurecard.com
                </span>
                .
              </p>

              <p>
                <strong>
                  Your Consent For Our Use of Electronic Records and Signatures.
                </strong>{" "}
                By electronically signing this E-Sign Consent as described
                below, you agree that you reviewed this E-Sign Consent and
                verified that you can print or save a copy of it with your
                records. You give your express consent to receive, view and
                electronically sign the Records that we display, deliver and
                provide to you in electronic form when you use your Access
                Device on the websites and mobile applications that we own,
                control or administer, including the electronic Records we
                display on our website or mobile application and those we may
                send to your designated email address. You agree that the
                electronic Records we send to your designated email address may
                include Records displayed in the email message, attached to it
                or displayed when you select links included in the message. When
                a Record is electronically displayed on your Access Device, you
                agree your electronic signature for the Record may include
                clicking on the displayed buttons, selecting the displayed
                boxes, typing your name in a designated field or otherwise
                selecting an electronic facsimile signature for the field,
                sending an email reply to a message transmitted to your
                designated email address, or taking other affirmative actions
                described when you view an electronic Record displayed on your
                Access Device. Your consent for our use of electronic Records
                and signatures will be effective unless you withdraw it in the
                manner described below.
              </p>

              <p>
                <strong>Changes To This E-Sign Consent.</strong> You understand
                and agree that we may, at any time, modify what this E-Sign
                Consent requires or allows by posting a revised version of the
                E-Sign Consent on our websites and mobile applications. If the
                changes we make to the E-Sign Consent create a material risk you
                will be unable to access or keep Records we previously provided
                to you in electronic form, we will display the revised
                requirements to you on our website and mobile applications or
                and send notices about the revised requirements to your
                designated email account, your mailing address, or both.
              </p>

              <p>
                <strong>Multiple Access Devices:</strong> Your acceptance of
                this E-Sign Consent on one Access Device is also your acceptance
                on all Access Devices you use. For example, if you view and
                accept this E-Sign Consent on a mobile device, the terms of this
                E-Sign Consent will apply to electronic Records accessed on a
                traditional computer (or vice versa). Additionally, by viewing
                and accepting this E-Sign Consent on any Access Device, you are
                reasonably demonstrating your ability to access and view
                electronic documents in the format the services are provided on
                that Access Device and all subsequent Access Devices. If you
                change Access Devices (or use multiple Access Devices), you are
                responsible for ensuring your new Access Device meets the
                applicable system requirements and you are still able to access
                and view electronic Records on the subsequent Access Device.
                Continuing your application on other Access Devices is
                reaffirmation of your agreement to this E-Sign Consent.
              </p>
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
              <p>
                <strong>
                  Withdrawing Prior Consent for Electronic Records and
                  Signatures.
                </strong>{" "}
                If, at any time after your initial consent for electronic
                Records and signatures, you want to withdraw your prior consent,
                you may do so by sending an email to us at{" "}
                <span className="text-blue-600 underline">
                  support@jointventurecard.com
                </span>
                . We may, at our discretion and if not restricted by law, impose
                a reasonable fee if you decide to withdraw your prior consent
                for our continued use of electronic Records and signatures. If
                you withdraw your consent, you will no longer be permitted to
                use and obtain certain services through our website or mobile
                application. Your withdrawal of consent will become effective
                after we have had a reasonable opportunity to act upon it. If
                you withdraw your prior consent for our use of electronic
                Records and signatures, any electronic Records and signatures
                provided and obtained before the effective date of your
                withdrawal will remain fully effective, valid and enforceable.
              </p>

              <p>
                <strong>Consent.</strong> By checking the E-Sign Consent box
                displayed on our website or mobile application, you agree that:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>
                  You received, read and agree to the terms of this Consent for
                  Use of Electronic Records and Signatures;
                </li>
                <li>
                  You verified that your Access Device and its use satisfy the
                  hardware and software requirements described in this E-Sign
                  Consent;
                </li>
                <li>
                  You provided us with a correct and current email address where
                  we may send electronic Records to you; and
                </li>
                <li>
                  You consent to your and our use of electronic Records and
                  signatures in connection with any services you request or
                  obtain through our websites, mobile applications, the email
                  address you provided requesting or obtaining financial
                  products and services from us, and any updated email address
                  you may provide in the future using the procedures described
                  above.
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConsentElectronicRecordsPreview;
