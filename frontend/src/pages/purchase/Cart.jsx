import React from 'react';
import { FiTrash2 } from 'react-icons/fi'; // ⬅️ nice trash icon
import CommonHeader from '../../components/CommonHeader';
import Sidebar from '../../components/Sidebar';
import ShippingInfo from '../../components/ShippingInfo';
import CommonFooter from '../../components/CommonFooter';
import { useCart } from '../../context/CartContext'; // import the cart context

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart(); // ⬅️ get removeFromCart also

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 10 : 0; // Example: flat $10 shipping if cart not empty
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <CommonHeader />

      <div className="min-w-screen px-4 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 py-8 flex-grow">
        {/* Sidebar */}
        <div className="w-full lg:w-1/5 lg:order-first">
          <div className="bg-white p-4 shadow-md rounded-xl sticky top-24">
            <Sidebar />
          </div>
        </div>

        {/* Cart Table */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

            {/* Empty Cart */}
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 text-lg py-20">
                Your cart is empty.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 text-sm">
                        <th className="p-3 font-semibold">Image</th>
                        <th className="p-3 font-semibold">Product</th>
                        <th className="p-3 font-semibold text-center">Quantity</th>
                        <th className="p-3 font-semibold text-right">Price</th>
                        <th className="p-3 font-semibold text-right">Total</th>
                        <th className="p-3 font-semibold text-center">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          </td>
                          <td className="p-3 text-sm">{item.name}</td>
                          <td className="p-3 text-center">{item.quantity}</td>
                          <td className="p-3 text-right">${item.price.toFixed(2)}</td>
                          <td className="p-3 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 transition"
                              title="Remove"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Subtotal, Shipping, Grand Total */}
                <div className="border-t mt-6 pt-6 space-y-3 text-right text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Shipping:</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-green-600">
                    <span>Grand Total:</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Shipping Info */}
        <div className="w-full lg:w-1/5 lg:order-last">
          <div className="bg-white shadow-md rounded-xl sticky top-24 p-4">
            <ShippingInfo />
          </div>
        </div>
      </div>

      <CommonFooter />
    </div>
  );
};

export default CartPage;
