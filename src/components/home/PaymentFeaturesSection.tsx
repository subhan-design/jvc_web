import payNowImage from "@/assets/images/purchase-Pay-Now-image.png";

const PaymentFeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Flexible Customer Payments
          </h2>
          <p className="text-lg text-gray-600">
            Accept payments however your customers prefer to pay.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Card Payments
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Accept all major credit and debit cards with our secure
                    payment processing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Digital Wallets
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Support for Apple Pay, Google Pay, and other popular digital
                    wallet solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    QR Code Payments
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Enable contactless payments with QR code scanning for quick
                    transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-100 rounded-xl p-8 text-center">
              <img
                src={payNowImage}
                alt="purchase-pay-now-image"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentFeaturesSection;
