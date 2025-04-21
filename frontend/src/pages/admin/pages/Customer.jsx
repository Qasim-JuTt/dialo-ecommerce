import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import SideBar from '../../../components/admin/SideBar';
import Pagination from '../../../components/admin/Pagination';
import SearchBar from '../../../components/admin/SearchBar'; // ✅ Imported SearchBar

const customers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', status: 'Inactive' },
  { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', phone: '555-123-4567', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '111-222-3333', status: 'Inactive' },
  { id: 5, name: 'William Brown', email: 'william.brown@example.com', phone: '444-555-6666', status: 'Active' },
  { id: 6, name: 'Sophia Clark', email: 'sophia.clark@example.com', phone: '777-888-9999', status: 'Inactive' },
  { id: 7, name: 'Liam King', email: 'liam.king@example.com', phone: '123-987-6543', status: 'Active' },
];

const Customers = () => {
  const customersPerPage = 5;

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
         {/* Page Title with SearchBar */}
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Customer Records
          </h1>
          <div className="max-w-md">
            <SearchBar
              placeholder="Search by product or customer"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 pr-4">Customer Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Phone</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {currentCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="py-4 pr-4 font-medium text-gray-800">{customer.name}</td>
                  <td className="py-4 pr-4 text-gray-600">{customer.email}</td>
                  <td className="py-4 pr-4">{customer.phone}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        customer.status === 'Active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default Customers;
