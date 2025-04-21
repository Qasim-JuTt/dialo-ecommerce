import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import SideBar from '../../../components/admin/SideBar';
import SearchBar from '../../../components/admin/SearchBar';
import Pagination from '../../../components/admin/Pagination';

const inventoryData = [
  {
    id: 1,
    type: 'Hoodie',
    category: 'Men',
    quantity: 120,
    status: 'In Stock',
  },
  {
    id: 2,
    type: 'Dress',
    category: 'Women',
    quantity: 45,
    status: 'Low Stock',
  },
  {
    id: 3,
    type: 'T-shirt',
    category: 'Kids',
    quantity: 0,
    status: 'Out of Stock',
  },
  {
    id: 4,
    type: 'Jeans',
    category: 'Men',
    quantity: 32,
    status: 'In Stock',
  },
  {
    id: 5,
    type: 'Skirt',
    category: 'Women',
    quantity: 15,
    status: 'In Stock',
  },
  {
    id: 6,
    type: 'Shorts',
    category: 'Kids',
    quantity: 8,
    status: 'Low Stock',
  },
  {
    id: 7,
    type: 'Jacket',
    category: 'Men',
    quantity: 25,
    status: 'In Stock',
  },
  {
    id: 8,
    type: 'Blouse',
    category: 'Women',
    quantity: 5,
    status: 'Low Stock',
  },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const filteredItems = inventoryData.filter(
    (item) =>
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Page Title with SearchBar and Add Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Manage Inventory
          </h1>
          
          <div className="max-w-md">
            <SearchBar
              placeholder="Search by type or category"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
            />
          </div>
          
          <button className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Inventory Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 pr-4">Product Type</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Quantity</th>
                <th className="py-3 pr-4">Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="py-4 pr-4 font-medium text-gray-800">
                    <Link
                      to={`/admin-inventoryDetail-page/${item.id}`}
                      className="text-indigo-600 hover:text-indigo-800 transition"
                    >
                      {item.type}
                    </Link>
                  </td>
                  <td className="py-4 pr-4 text-gray-600">{item.category}</td>
                  <td className="py-4 pr-4">{item.quantity}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'In Stock'
                          ? 'bg-green-100 text-green-600'
                          : item.status === 'Low Stock'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-400">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default Inventory;