import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import SideBar from "../../../components/admin/SideBar";

const AdminProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/getProduct/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found or server error.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
        <Link to="/admin/products" className="text-indigo-600 underline ml-2">
          Go Back
        </Link>
      </div>
    );
  }

  if (!product) {
    return <div className="p-6 text-center text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SideBar activeLink="product" />

      <main className="flex-1 p-6">
        <div className="mb-6">
          <Link to="/admin-product-page" className="text-indigo-600 hover:underline">
            Products
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Product Detail</span>
        </div>

        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-4">
            <Link to="/admin-product-page" className="flex items-center text-indigo-600 hover:underline">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Product List
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row p-6 gap-10">
            {/* Product Image */}
            <div className="lg:w-1/2 flex justify-center items-center">
              <img
                src={`http://localhost:5000/uploads/${product.images[0]}`} // Adjust path if needed
                alt={product.name}
                className="rounded-xl object-cover w-full h-96 max-w-md shadow"
              />
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 space-y-5">
              <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-base">{product.description}</p>

              <div className="text-xl font-semibold text-indigo-700">
                ₹{product.price.toFixed(2)}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-medium px-2 py-1 rounded-full ${
                      product.status === "In Stock"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.status}
                  </span>
                </span>
                <span>
                  <strong>Stock:</strong> {product.stock}
                </span>
                <span>
                  <strong>Min Order:</strong> {product.minOrder} pcs
                </span>
              </div>
            </div>
          </div>

          {/* More Product Images */}
          {product.images.length > 1 && (
            <div className="px-6 pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">More Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {product.images.slice(1).map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/${img}`} // Adjust path if needed
                    alt={`Product ${index}`}
                    className="rounded-xl object-cover w-full h-40 shadow"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminProductDetail;
