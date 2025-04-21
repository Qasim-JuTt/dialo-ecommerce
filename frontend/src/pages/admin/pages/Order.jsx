import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import SideBar from '../../../components/admin/SideBar';
import Pagination from '../../../components/admin/Pagination';
import SearchBar from '../../../components/admin/SearchBar';

const allOrders = [
  {
    id: 'ORD-1001',
    date: '2025-04-16',
    customer: 'Ali Khan',
    total: 120.0,
    status: 'Completed',
    products: [
      { name: 'T-Shirt', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60' },
    ],
  },
  {
    id: 'ORD-1002',
    date: '2025-04-15',
    customer: 'Sara Ahmed',
    total: 80.5,
    status: 'Pending',
    products: [
      { name: 'Shoes', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60' },
    ],
  },
  {
    id: 'ORD-1003',
    date: '2025-04-14',
    customer: 'Usman Raza',
    total: 240.99,
    status: 'Cancelled',
    products: [
      { name: 'Watch', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60' },
    ],
  },
  {
    id: 'ORD-1004',
    date: '2025-04-13',
    customer: 'Fatima Noor',
    total: 190.75,
    status: 'Completed',
    products: [
      { name: 'Bag', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60' },
    ],
  },
  {
    id: 'ORD-1005',
    date: '2025-04-12',
    customer: 'Ahmed Bilal',
    total: 60.0,
    status: 'Pending',
    products: [
      { name: 'Hat', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60' },
    ],
  },
  {
    id: 'ORD-1006',
    date: '2025-04-11',
    customer: 'Hina Zafar',
    total: 150.99,
    status: 'Cancelled',
    products: [
      { name: 'Jacket', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60' },
    ],
  },
  {
    id: 'ORD-1007',
    date: '2025-04-10',
    customer: 'Zain Malik',
    total: 89.99,
    status: 'Completed',
    products: [
      { name: 'Glasses', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60' },
    ],
  },
];

const statusColors = {
  Completed: 'bg-green-100 text-green-600',
  Pending: 'bg-yellow-100 text-yellow-600',
  Cancelled: 'bg-red-100 text-red-600',
};

const Orders = () => {
  const ordersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleMouseEnter = (e, imageUrl) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPreviewImage(imageUrl);
    setPosition({ x: rect.right + 10, y: rect.top });
  };

  const handleMouseLeave = () => {
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
      <SideBar />

      <main className="flex-1 p-4 md:p-6 space-y-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
           Manage Orders
          </h1>
          <div className="max-w-md">
            <SearchBar
              placeholder="Search by product or customer"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm relative">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm relative z-10">
              <thead className="text-left">
                <tr className="text-gray-500 border-b">
                  <th className="py-3 pr-4 whitespace-nowrap">Order ID</th>
                  <th className="py-3 pr-4 whitespace-nowrap">Date</th>
                  <th className="py-3 pr-4 whitespace-nowrap">Customer</th>
                  <th className="py-3 pr-4">Products</th>
                  <th className="py-3 pr-4 whitespace-nowrap">Total</th>
                  <th className="py-3 pr-4 whitespace-nowrap">Status</th>
                  <th className="py-3 pr-4 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 pr-4 whitespace-nowrap">{order.id}</td>
                    <td className="py-4 pr-4 whitespace-nowrap">{order.date}</td>
                    <td className="py-4 pr-4 whitespace-nowrap">{order.customer}</td>
                    <td className="py-4 pr-4">
                      <div className="flex -space-x-2">
                        {order.products.map((product, index) => (
                          <img
                            key={index}
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded border object-cover cursor-pointer"
                            onMouseEnter={(e) => handleMouseEnter(e, product.image)}
                            onMouseLeave={handleMouseLeave}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 pr-4 font-semibold text-indigo-600 whitespace-nowrap">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-right space-x-2">
                      <button
                        onClick={() => console.log('Edit order:', order.id)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Pencil className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button
                        onClick={() => console.log('Delete order:', order.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Image Preview Tooltip */}
            {previewImage && (
              <div
                className="fixed z-50 pointer-events-none transition-opacity duration-150"
                style={{
                  top: position.y,
                  left: position.x,
                }}
              >
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-[400px] max-h-[300px] object-cover rounded-lg shadow-lg border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default Orders;
