import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import Sidebar from '../../components/Sidebar';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Payment via ${paymentMethod} successful!`);
    // Redirect or trigger backend call here
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Payment Section */}
        <div className="flex-1 p-8">
          <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Choose Payment Method</h2>

            {/* Payment Options */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                type="button"
                className={`px-6 py-3 rounded-full font-semibold text-sm ${
                  paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                } transition-colors duration-300`}
                onClick={() => setPaymentMethod('card')}
              >
                Card
              </button>
              <button
                type="button"
                className={`px-6 py-3 rounded-full font-semibold text-sm ${
                  paymentMethod === 'jazzcash' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'
                } transition-colors duration-300`}
                onClick={() => setPaymentMethod('jazzcash')}
              >
                JazzCash
              </button>
              <button
                type="button"
                className={`px-6 py-3 rounded-full font-semibold text-sm ${
                  paymentMethod === 'easypaisa' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                } transition-colors duration-300`}
                onClick={() => setPaymentMethod('easypaisa')}
              >
                EasyPaisa
              </button>
            </div>

            {/* Form Area */}
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Card Payment */}
              {paymentMethod === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ali Khan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="CVV"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {/* JazzCash Payment */}
              {paymentMethod === 'jazzcash' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">JazzCash Mobile Number</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{11}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="03XXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">PIN</label>
                    <input
                      type="password"
                      required
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="****"
                    />
                  </div>
                </>
              )}

              {/* EasyPaisa Payment */}
              {paymentMethod === 'easypaisa' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">EasyPaisa Account Number</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{11}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="03XXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">PIN</label>
                    <input
                      type="password"
                      required
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="****"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300"
              >
                Pay with {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
