import React from "react";
import { Truck, ShieldCheck, Undo2, Store } from "lucide-react";

const ShippingInfo = () => {
  return (
    <div className="sticky top-24 bg-white p-6 w-full max-w-md text-gray-800 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">🚚 Shipping Details</h2>

      <div className="flex items-start gap-4">
        <Store className="text-red-500" />
        <div>
          <p className="text-sm font-semibold">Sold by</p>
          <p className="text-sm text-gray-600">Shop911259384 Store (Trader)</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Truck className="text-green-600" />
        <div>
          <p className="text-sm font-semibold">Ship to</p>
          <p className="text-sm text-gray-600">Pakistan</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <ShieldCheck className="text-blue-600" />
        <div>
          <p className="text-sm font-semibold">Dialo Commitment</p>
          <ul className="text-sm text-gray-600 space-y-1 mt-1">
            <li>✓ Reliable service, authentic products</li>
            <li>✓ Shipping: <span className="font-medium text-gray-800">PKR 3,837</span></li>
            <li>✓ Delivery by <span className="font-medium text-gray-800">May 11</span></li>
          </ul>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Undo2 className="text-purple-600" />
        <div>
          <p className="text-sm font-semibold">Return & Refund Policy</p>
          <ul className="text-sm text-gray-600 space-y-1 mt-1">
            <li>✓ Free returns within 15 days</li>
            <li className="ml-2">• Safe payments: We don’t share your info</li>
            <li className="ml-2">• Secure: Your personal data is protected</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
