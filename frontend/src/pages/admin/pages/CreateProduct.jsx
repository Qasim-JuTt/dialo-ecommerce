import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select"; // Import Select

import SideBar from "../../../components/admin/SideBar";

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    minOrder: "",
    stock: "",
    status: "In Stock",
    images: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [relatedOptions, setRelatedOptions] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/getAllProducts"
        ); // Adjust your API if needed
        const options = response.data.map((prod) => ({
          value: prod._id,
          label: (
            <div className="flex items-center space-x-2">
              <img
                src={`http://localhost:5000/uploads/${
                  prod.images?.[0] || "placeholder.png"
                }`}
                alt={prod.name}
                className="w-6 h-6 object-cover rounded-full"
              />
              <span>{prod.name}</span>
            </div>
          ),
          id: prod._id, // for saving
        }));
        setRelatedOptions(options);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, []);

  const handleRelatedChange = (selected) => {
    setRelatedProducts(selected || []);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = [...selectedFiles, ...files];
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    const updatedPreviews = [...previewImages, ...newPreviews];

    setSelectedFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  const removeImage = (index) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previewImages];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setSelectedFiles(newFiles);
    setPreviewImages(newPreviews);
  };

  // Update handleSubmit to include related product IDs
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("minOrder", productData.minOrder);
    formData.append("stock", productData.stock);
    formData.append("status", productData.status);

    relatedProducts.forEach((item) => {
      formData.append("relatedProducts", item.id); // backend field: "relatedProducts"
    });

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      toast.success("Product created successfully!", response?.data?.message);
      setProductData({
        name: "",
        description: "",
        price: "",
        minOrder: "",
        stock: "",
        status: "In Stock",
        images: [],
      });
      setSelectedFiles([]);
      setPreviewImages([]);
      setRelatedProducts([]);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
      <ToastContainer position="top-right" autoClose={3000} />
      <SideBar activeLink="product" />

      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Create New Product
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={productData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Order
                  </label>
                  <input
                    type="number"
                    name="minOrder"
                    value={productData.minOrder}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={productData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Pre-order">Pre-order</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                      <span>Upload images</span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Selected Images
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Related Products
                </label>
                <Select
                  isMulti
                  options={relatedOptions}
                  value={relatedProducts}
                  onChange={handleRelatedChange}
                  getOptionValue={(e) => e.id}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select related products..."
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      display: "flex",
                      alignItems: "center",
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/admin-product-page">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Product
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateProduct;
