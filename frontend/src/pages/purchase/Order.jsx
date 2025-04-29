import React from 'react';
import CommonHeader from '../../components/CommonHeader';
import Sidebar from '../../components/Sidebar';
import ShippingInfo from '../../components/ShippingInfo';
import CommonFooter from '../../components/CommonFooter';

const Order = ({ products }) => {
  const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="w-full overflow-x-hidden">
      <CommonHeader />

      <div className="min-w-screen px-4 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Left side */}
        <div className="w-full lg:w-1/5 lg:order-first">
          <div className="bg-white p-4 shadow-sm sticky top-24">
            <Sidebar />
          </div>
        </div>

        {/* Product Table - Middle */}
        <div className="w-full lg:w-3/5 flex justify-center">
          <div className="bg-white rounded-2xl p-6 w-full">
            <h2 className="text-2xl font-semibold mb-6 py-4">Order Summary</h2>
            <div className="w-full overflow-hidden">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-3 text-sm font-semibold">Image</th>
                    <th className="p-3 text-sm font-semibold">Product</th>
                    <th className="p-3 text-sm font-semibold text-center">Qty</th>
                    <th className="p-3 text-sm font-semibold text-right">Price</th>
                    <th className="p-3 text-sm font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="p-3 text-sm max-w-xs truncate">{item.name}</td>
                      <td className="p-3 text-sm text-center">{item.quantity}</td>
                      <td className="p-3 text-sm text-right">${item.price.toFixed(2)}</td>
                      <td className="p-3 text-sm text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Price */}
            <div className="p-4 border-t text-xl font-bold text-green-600 text-right">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Shipping Info - Right side */}
        <div className="w-full lg:w-1/5 lg:order-last">
          <div className="bg-white sticky shadow-sm top-24 ">
            <ShippingInfo />
          </div>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};

// Manual products for testing
const sampleProducts = [
  {
    name: 'T-Shirt',
    image: 'https://via.placeholder.com/100',
    price: 25.99,
    quantity: 2,
  },
  {
    name: 'Jeans',
    image: 'https://via.placeholder.com/100',
    price: 49.99,
    quantity: 1,
  },
];

const OrderPage = () => {
  return <Order products={sampleProducts} />;
};

export default OrderPage;