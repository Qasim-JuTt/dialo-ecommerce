import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import SideBar from "../../../components/admin/SideBar";
import SearchBar from "../../../components/admin/SearchBar";
import Pagination from "../../../components/admin/Pagination";

const salesData = [
  {
    id: 1,
    product: "iPhone 14",
    customer: "John Doe",
    date: "2025-04-15",
    quantity: 2,
    amount: 2200,
    status: "Completed",
  },
  {
    id: 2,
    product: "Samsung Galaxy S22",
    customer: "Jane Smith",
    date: "2025-04-14",
    quantity: 1,
    amount: 1100,
    status: "Pending",
  },
  {
    id: 3,
    product: "Sony Headphones",
    customer: "Michael Brown",
    date: "2025-04-13",
    quantity: 3,
    amount: 900,
    status: "Refunded",
  },
  {
    id: 4,
    product: "Dell XPS 13",
    customer: "Emily Davis",
    date: "2025-04-12",
    quantity: 1,
    amount: 1500,
    status: "Completed",
  },
  {
    id: 5,
    product: "MacBook Air M2",
    customer: "Alice Johnson",
    date: "2025-04-10",
    quantity: 1,
    amount: 1200,
    status: "Completed",
  },
  {
    id: 6,
    product: "Google Pixel 8",
    customer: "Robert Lee",
    date: "2025-04-09",
    quantity: 2,
    amount: 1600,
    status: "Pending",
  },
];

const Sale = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const filteredSales = salesData.filter(
    (sale) =>
      sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSales.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentSales = filteredSales.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Page Title with SearchBar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Sale Records
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

        {/* Sales Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 pr-4">Product</th>
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Quantity</th>
                <th className="py-3 pr-4">Amount ($)</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentSales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="py-4 pr-4 font-medium text-gray-800">
                    {sale.product}
                  </td>
                  <td className="py-4 pr-4 text-gray-600">{sale.customer}</td>
                  <td className="py-4 pr-4">{sale.date}</td>
                  <td className="py-4 pr-4">{sale.quantity}</td>
                  <td className="py-4 pr-4">${sale.amount}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        sale.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : sale.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {sale.status}
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
              {currentSales.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-400">
                    No sales found.
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

export default Sale;
