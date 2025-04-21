import React, { useState } from 'react';
import {
  ShoppingBag,
  Package,
  DollarSign,
  Users,
  Bell,
} from 'lucide-react';
import SideBar from '../../../components/admin/SideBar';
import SearchBar from '../../../components/admin/SearchBar';
import Pagination from '../../../components/admin/Pagination';

const stats = [
  { title: 'Total Orders', value: 320, icon: <ShoppingBag className="text-blue-500 w-6 h-6" /> },
  { title: 'Products', value: 120, icon: <Package className="text-green-500 w-6 h-6" /> },
  { title: 'Revenue', value: '$45,000', icon: <DollarSign className="text-yellow-500 w-6 h-6" /> },
  { title: 'Customers', value: 89, icon: <Users className="text-purple-500 w-6 h-6" /> },
];

const orders = [
  { id: 1201, status: 'Completed' },
  { id: 1202, status: 'Pending' },
  { id: 1203, status: 'Cancelled' },
  { id: 1204, status: 'Completed' },
  { id: 1205, status: 'Pending' },
  { id: 1206, status: 'Completed' },
  { id: 1207, status: 'Cancelled' },
  { id: 1208, status: 'Pending' },
];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(orders.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => setCurrentPage(page);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-500';
      case 'Pending':
        return 'text-yellow-500';
      case 'Cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Dashboard Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Dashboard
          </h1>

          {/* Center: SearchBar */}
          <div className="w-full sm:w-1/2 flex justify-center">
            <SearchBar placeholder="Search..." />
          </div>

          {/* Right: Bell + Avatar */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              A
            </div>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="p-2 rounded-md bg-gray-100 shadow-sm">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500">{item.title}</p>
                <p className="text-lg font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <ul className="divide-y divide-gray-200 text-sm">
            {currentOrders.map((order) => (
              <li key={order.id} className="py-3 flex justify-between">
                <span>Order #{order.id}</span>
                <span className={`font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
<h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Manage Inventory
          </h1>
export default Dashboard;
