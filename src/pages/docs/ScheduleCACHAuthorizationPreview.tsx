import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMerchantData } from "@/context/MerchantDataContext";

const ScheduleCACHAuthorizationPreview = () => {
  const { merchantData } = useMerchantData();
  const businessInfo = merchantData?.businessInformation || {};
  const bankInfo = merchantData?.bankInformation || {};
  const agreement = merchantData?.agreement || {};

  const fullName = agreement?.fullName || "";
  const signature = agreement?.signature || "";

  // Modal for missing required fields
  const [showModal, setShowModal] = useState(!fullName || !signature);

  // Date
  const today = new Date();
  const dateStr = today.toLocaleDateString();

  // Account type checkboxes
  const accountType = bankInfo?.accountType;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      {/* Modal for missing required fields */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Missing Required Information</DialogTitle>
          </DialogHeader>
          <div>
            <p className="mb-2 text-red-600 font-semibold">
              Full Name and Signature are required to generate this document.
              Please complete these fields before previewing or downloading the
              PDF.
            </p>
            {!fullName && <p className="text-sm">- Full Name is missing</p>}
            {!signature && <p className="text-sm">- Signature is missing</p>}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowModal(false)}>Back to Form</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="bg-white border border-gray-300 shadow-lg rounded-md max-w-3xl w-full px-8 py-10">
        <h2 className="text-lg font-semibold text-center mb-1">Schedule “C”</h2>
        <h1 className="text-2xl font-bold text-center mb-8">
          Deposit Account ACH Authorization
        </h1>
        <div className="text-gray-900 text-base leading-relaxed mb-8">
          <p className="mb-6">
            The person signing below (“I,” “me,” and “my”) authorizes Joint
            Venture Card, Inc. d/b/a The Joint Venture Card and Joint Venture
            Card (“Joint Venture Card”) to initiate credit entries by automated
            clearing house (ACH) to the deposit account that{" "}
            <span className="font-mono text-gray-600">
              {businessInfo.legalNameOfBusiness || "N/A"}
            </span>{" "}
            (“Merchant”) maintains in its name with the depository institution
            named below (the “Bank”), for purposes of making payments that Joint
            Venture Card determines are due to Merchant in connection with the
            Joint Venture Card Merchant Agreement (“Agreement”) between Joint
            Venture Card and Merchant. I also authorize Joint Venture Card to
            initiate debit entries to this same deposit account for obtaining
            payment of amounts that Joint Venture Card determines are due from
            Merchant in connection with the Agreement, whether as a result of
            amounts deposited in error, amounts resulting from credits issued on
            charges submitted from a Merchant location, or other reasons
            authorized by the Agreement. I authorize the Bank named below to
            honor and process these credits and debits to the designated deposit
            account. I certify that Merchant owns and maintains the designated
            deposit account with the Bank. I also certify that I am duly
            authorized to act for and on behalf of the Merchant in signing this
            authorization. I acknowledge and agree that the origination of ACH
            transactions to this deposit account with the Bank must comply with
            applicable law and NACHA Operating Rules.
          </p>
          <div className="mb-2 flex items-center">
            <span className="w-64 inline-block">
              Name of Financial Institution
            </span>
            <span className="border-b border-gray-400 flex-1 ml-2">
              {businessInfo.legalNameOfBusiness || "N/A"}
            </span>
          </div>
          <div className="mb-2 flex items-center">
            <span className="w-64 inline-block">Address</span>
            <span className="border-b border-gray-400 flex-1 ml-2">
              {bankInfo.bankAddress || "N/A"}
            </span>
          </div>
          <div className="mb-2 flex items-center space-x-6">
            <label className="inline-flex items-center space-x-2">
              <span
                className={`border border-gray-400 w-4 h-4 inline-block mr-1 align-middle ${
                  accountType === "checking" ? "bg-blue-500" : ""
                }`}
              ></span>
              <span>Checking</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <span
                className={`border border-gray-400 w-4 h-4 inline-block mr-1 align-middle ${
                  accountType === "saving" ? "bg-blue-500" : ""
                }`}
              ></span>
              <span>Savings</span>
            </label>
          </div>
          <div className="mb-2 flex items-center">
            <span className="w-64 inline-block">Name on Account</span>
            <span className="border-b border-gray-400 flex-1 ml-2">
              {bankInfo.nameOnAccount || "N/A"}
            </span>
          </div>
          <div className="mb-2 flex items-center">
            <span className="w-64 inline-block">Transit/ABA No.</span>
            <span className="border-b border-gray-400 flex-1 ml-2">
              {bankInfo.routingNumber || "N/A"}
            </span>
          </div>
          <div className="mb-6 flex items-center">
            <span className="w-64 inline-block">Depository Account No.</span>
            <span className="border-b border-gray-400 flex-1 ml-2">
              {bankInfo.accountNumber || "N/A"}
            </span>
          </div>
          <div className="mb-2 font-semibold">Accepted and agreed,</div>
          {/* <div className="flex items-center mb-2">
            <span className="w-48 inline-block">&lt;signed by&gt;</span>
            <span className="w-48 inline-block">{businessInfo.legalNameOfBusiness || "N/A"}</span>
          </div> */}
          <div className="flex items-center mt-6">
            <div className="flex-1 flex flex-col items-center">
              {/* Signature image or placeholder */}
              {signature ? (
                <img
                  src={signature}
                  alt="Signature"
                  className="h-8 object-contain"
                />
              ) : (
                <span className="border-b border-gray-400 w-48 inline-block text-gray-400 italic">
                  N/A
                </span>
              )}
              <span className="text-xs mt-1">Authorized Signature</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="border-b border-gray-400 w-64 inline-block">
                {fullName || "N/A"}
              </span>
              <span className="text-xs mt-1">
                Print Name of Authorized Signer
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="border-b border-gray-400 w-32 inline-block">
                {dateStr}
              </span>
              <span className="text-xs mt-1">Date</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCACHAuthorizationPreview;
