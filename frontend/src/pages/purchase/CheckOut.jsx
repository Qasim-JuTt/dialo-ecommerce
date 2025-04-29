import React, { useState } from "react";
import CommonFooter from "../../components/CommonFooter";
import CommonHeader from "../../components/CommonHeader";

const CheckOut = () => {
  const [showCardModal, setShowCardModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressAdded, setAddressAdded] = useState(false);

  const handlePlaceOrder = () => {
    if (!addressAdded) {
      setShowAddressModal(true);
    } else {
      alert("✅ Order placed successfully!");
    }
  };

  const handleConfirmAddress = () => {
    setAddressAdded(true);
    setShowAddressModal(false);
  };

  return (
    <>
      <div className="w-full">
        <CommonHeader />
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Shipping address</h2>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setShowAddressModal(true)}
              >
                + Add new address
              </button>
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Payment Methods</h2>
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 mt-2">
                  <input
                    type="radio"
                    name="card"
                    onChange={() => setShowCardModal(true)}
                  />
                  <div>
                    <p className="text-sm">Add a new card</p>
                    <div className="flex gap-1 mt-1">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                        alt="Visa"
                        className="h-5"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                        alt="Mastercard"
                        className="h-5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Method */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Shipping method</h2>
              <p className="text-sm font-medium">
                Shipping: <span className="text-green-600">Free shipping</span>
              </p>
              <p className="text-sm text-gray-600">Delivery: May 04 - 09</p>
            </div>

            {/* Items Details */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Items' details</h2>
              <div className="flex gap-4 items-center">
                <img
                  src="https://ae01.alicdn.com/kf/ShoeURL.jpg"
                  alt="Shoes"
                  className="w-16 h-16 rounded"
                />
                <div>
                  <p className="text-sm font-medium">US $7.11</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button className="px-2 border rounded">-</button>
                    <span>2</span>
                    <button className="px-2 border rounded">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary (Sticky) */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-4 space-y-6">
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>US $14.22</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Promo codes</span>
                  <a href="#" className="text-blue-600 hover:underline">
                    Enter
                  </a>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Shipping fee</span>
                  <span>Free</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>US $14.22</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
                >
                  Place order
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Upon clicking ‘Place Order’, I confirm I have read and
                  acknowledged all{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    terms and policies
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Address Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-semibold mb-4">Add new address</h2>

              {/* Country */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Country/Region
                </label>
                <select className="border p-2 w-full rounded">
                  <option>Pakistan</option>
                </select>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <input
                  className="border p-2 rounded"
                  placeholder="Contact name*"
                />
                <input className="border p-2 rounded" value="+92" readOnly />
                <input
                  className="border p-2 rounded"
                  placeholder="Mobile number*"
                />
              </div>

              {/* Address Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <input
                  className="border p-2 rounded"
                  placeholder="Street address*"
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Apt, suite, unit (optional)"
                />
                <select className="border p-2 rounded">
                  <option>Azad Kashmir</option>
                </select>
                <select className="border p-2 rounded">
                  <option>Athmuqam</option>
                </select>
                <select className="border p-2 rounded">
                  <option>Athmuqam</option>
                </select>
                <input className="border p-2 rounded" placeholder="ZIP code*" />
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Set as default shipping address</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                  onClick={handleConfirmAddress}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => setShowAddressModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card Modal */}
        {showCardModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg w-full max-w-lg p-6 relative shadow-lg">
              <button
                onClick={() => setShowCardModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-lg font-semibold mb-1">
                Provide further information
              </h2>
              <p className="text-sm text-green-600 mb-4">
                Your payment information is safe with us
              </p>

              <div className="bg-red-50 p-2 rounded mb-3 text-sm font-medium flex items-center gap-2">
                <span>Add a new card</span>
                <div className="flex gap-1 ml-auto">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                    className="h-4"
                    alt="Visa"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    className="h-4"
                    alt="Mastercard"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Maestro_logo.png"
                    className="h-4"
                    alt="Maestro"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  className="border p-2 rounded"
                  placeholder="Card number"
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Cardholder name"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <select className="border p-2 rounded">
                  <option>MM</option>
                </select>
                <select className="border p-2 rounded">
                  <option>YY</option>
                </select>
                <input className="border p-2 rounded" placeholder="CVV" />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" checked readOnly />
                <label className="text-sm">Save card details</label>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Your order will be processed in USD
              </p>

              <button className="w-full bg-pink-600 text-white py-2 rounded-full hover:bg-pink-700">
                Save & confirm
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full">
        <CommonFooter />
      </div>
    </>
  );
};

export default CheckOut;
