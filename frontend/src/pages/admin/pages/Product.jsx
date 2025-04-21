import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import SideBar from "../../../components/admin/SideBar";
import Pagination from "../../../components/admin/Pagination";
import SearchBar from "../../../components/admin/SearchBar";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/getAllProducts"
        );
        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredResults = products.filter((prod) =>
      prod.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredResults);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/products/deleteProduct/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setFiltered((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };
  

  const handleImageHover = (e, image) => {
    setHoveredImage(image);
    setHoverPosition({ x: e.clientX + 20, y: e.clientY + 20 });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
      <SideBar />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Manage Products
          </h1>

          <div className="max-w-md">
            <SearchBar
              placeholder="Search by product or customer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link
            to="/admin-createProduct-page"
            className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <div className="overflow-x-auto relative">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-3 pr-4">Image</th>
                    <th className="py-3 pr-4">Product</th>
                    <th className="py-3 pr-4 hidden md:table-cell">
                      Description
                    </th>
                    <th className="py-3 pr-4 whitespace-nowrap">Min Order</th>
                    <th className="py-3 pr-4">Price</th>
                    <th className="py-3 pr-4">Stock</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentProducts.map((prod) => (
                    <tr
                      key={prod._id}
                      className="hover:bg-gray-50 transition relative"
                    >
                      <td className="py-4 pr-4">
                        <div
                          className="w-10 h-10"
                          onMouseEnter={(e) =>
                            handleImageHover(e, prod.images?.[0])
                          }
                          onMouseLeave={() => setHoveredImage(null)}
                        >
                          <img
                            src={`http://localhost:5000/uploads/${prod.images?.[0]}`}
                            alt={prod.name}
                            className="w-full h-full object-cover rounded cursor-pointer"
                          />
                        </div>
                      </td>

                      <td className="py-4 pr-4 font-medium text-indigo-600 whitespace-nowrap">
                        <Link
                          to={`/admin/product-detail/${prod._id}`}
                          className="hover:underline"
                        >
                          {prod.name}
                        </Link>
                      </td>

                      <td className="py-4 pr-4 text-gray-700 hidden md:table-cell">
                        {prod.description || "No description"}
                      </td>

                      <td className="py-4 pr-4 whitespace-nowrap">
                        {prod.minOrder}
                      </td>

                      <td className="py-4 pr-4 text-indigo-600 font-semibold whitespace-nowrap">
                        ${prod.price?.toFixed(2)}
                      </td>

                      <td className="py-4 pr-4">{prod.stock}</td>

                      <td className="py-4 pr-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                            prod.status === "In Stock"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {prod.status}
                        </span>
                      </td>

                      <td className="py-4 pr-4 text-right space-x-2">
                        <Link
                          to={`/admin-updateProduct-page/${prod._id}`}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4 md:w-5 md:h-5" />
                        </Link>

                        <button
                          onClick={() => handleDelete(prod._id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {hoveredImage && (
          <div
            className="fixed z-50 w-48 h-48 border border-gray-200 rounded shadow-lg bg-white pointer-events-none"
            style={{
              left: `${hoverPosition.x}px`,
              top: `${hoverPosition.y}px`,
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${hoveredImage}`}
              alt="Preview"
              className="w-full h-full object-contain p-2"
            />
          </div>
        )}

        {!loading && !error && (
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

export default Product;
