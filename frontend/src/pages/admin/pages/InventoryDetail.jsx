import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../../../components/admin/SideBar";
import SearchBar from "../../../components/admin/SearchBar";
import { FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../../components/admin/Pagination";

const InventoryDetail = () => {
  const { mainCategory, category } = useParams();
  const [inventoryData, setInventoryData] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(inventoryData.length / itemsPerPage);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/inventory/allfetch/${mainCategory}/${category}`
      );
      setInventoryData(res.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMouseEnter = (e, imageUrl) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPreviewImage(imageUrl);
    setPosition({ x: rect.right + 10, y: rect.top });
  };

  const handleMouseLeave = () => {
    setPreviewImage(null);
  };

  const handleDelete = (productId) => {
    console.log("Delete product:", productId);
  };

  // Pagination logic: slice inventory data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventoryData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
      <SideBar activeLink="inventory" />

      <main className="flex-1 p-6 space-y-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Manage Products
          </h1>

          <div className="max-w-md">
            <SearchBar placeholder="Search..." />
          </div>

          <Link
            to="/admin-createInventory-page"
            className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FiPlus className="w-5 h-5" />
          </Link>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm relative">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm relative z-10">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3 pr-4">Image</th>
                  <th className="py-3 pr-4">Product</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Color</th>
                  <th className="py-3 pr-4">Quantity</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="py-4 pr-4">
                      <img
                        src={`http://localhost:5000/uploads/${product.images[0]}`}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded cursor-pointer"
                        onMouseEnter={(e) =>
                          handleMouseEnter(
                            e,
                            `http://localhost:5000/uploads/${product.images[0]}`
                          )
                        }
                        onMouseLeave={handleMouseLeave}
                      />
                    </td>
                    <td className="py-4 pr-4 font-medium text-indigo-600 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="py-4 pr-4 text-gray-700 whitespace-nowrap">
                      {product.category}
                    </td>
                    <td className="py-4 pr-4 text-gray-700 whitespace-nowrap">
                      {product.color}
                    </td>
                    <td className="py-4 pr-4">{product.quantity}</td>
                    <td className="py-4 pr-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                          product.status === "In Stock"
                            ? "bg-green-100 text-green-600"
                            : product.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 flex space-x-2">
                      <Link
                        to={`/admin-updateInventory-page/${product._id}`}
                        title="Edit"
                      >
                        <button className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition">
                          <FiEdit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Tooltip Preview */}
            {previewImage && (
              <div
                className="fixed z-50 pointer-events-none transition-opacity duration-150"
                style={{
                  top: `${position.y}px`,
                  left: `${position.x}px`,
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

export default InventoryDetail;
