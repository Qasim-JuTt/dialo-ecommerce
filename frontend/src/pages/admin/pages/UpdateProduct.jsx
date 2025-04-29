import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Select from 'react-select';

import SideBar from "../../../components/admin/SideBar";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [existingImages, setExistingImages] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductAndOptions = async () => {
      try {
        // Fetch the current product
        const productResponse = await axios.get(
          `http://localhost:5000/api/products/getProduct/${id}`
        );
        const product = productResponse.data;

        // Fetch all products for related products options
        const allProductsResponse = await axios.get(
          `http://localhost:5000/api/products/getAllProducts`
        );
        
        setAllProducts(allProductsResponse.data);

        setProductData({
          name: product.name,
          description: product.description,
          price: product.price,
          minOrder: product.minOrder,
          stock: product.stock,
          status: product.status,
          images: product.images,
        });

        // Set related products
        if (product.relatedProducts && product.relatedProducts.length > 0) {
          setRelatedProducts(product.relatedProducts.map(p => ({
            value: p._id,
            label: p.name,
            image: p.images[0] ? `http://localhost:5000/uploads/${p.images[0]}` : null,
            price: p.price
          })));
        }

        const imageBaseUrl = "http://localhost:5000/uploads/";
        setExistingImages(
          product.images.map((img) => ({
            url: `${imageBaseUrl}${img}`,
            isExisting: true,
          }))
        );

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch product data");
      }
    };

    fetchProductAndOptions();
  }, [id, navigate]);

  // Format options for react-select
  const relatedOptions = allProducts
    .filter(product => product._id !== id) // Exclude current product from options
    .map(product => ({
      value: product._id,
      label: product.name,
      image: product.images[0] ? `http://localhost:5000/uploads/${product.images[0]}` : null,
      price: product.price
    }));

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
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      isExisting: false,
    }));
    const updatedPreviews = [...previewImages, ...newPreviews];

    setSelectedFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  const handleRelatedChange = (selected) => {
    setRelatedProducts(selected || []);
  };

  const removeImage = (index, isExisting) => {
    if (isExisting) {
      const newExisting = [...existingImages];
      newExisting.splice(index, 1);
      setExistingImages(newExisting);
    } else {
      const newPreviews = [...previewImages];
      const newFiles = [...selectedFiles];
      const previewIndex = index - existingImages.length;
      newPreviews.splice(previewIndex, 1);
      newFiles.splice(previewIndex, 1);
      setPreviewImages(newPreviews);
      setSelectedFiles(newFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("minOrder", productData.minOrder);
    formData.append("stock", productData.stock);
    formData.append("status", productData.status);

    // Extract filenames from existing image URLs
    const remainingExistingImages = existingImages.map((img) =>
      img.url.split("/").pop()
    );
    formData.append("existingImages", JSON.stringify(remainingExistingImages));

    // Append related products
    formData.append("relatedProducts", JSON.stringify(relatedProducts.map(p => p.value)));

    // Append new files
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/productUpdate/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      toast.success("Product updated successfully!");
      setTimeout(() => {
        navigate("/admin-product-page");
      }, 2000);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  };

  // Custom option component to show product image and name
  const formatOptionLabel = ({ label, image, price }) => (
    <div className="flex items-center">
      {image && (
        <img 
          src={image} 
          alt={label} 
          className="w-8 h-8 mr-2 rounded-sm object-cover"
        />
      )}
      <div>
        <div>{label}</div>
        <div className="text-xs text-gray-500">${price}</div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
        <SideBar activeLink="product" />
        <main className="flex-1 p-4 md:p-6 flex items-center justify-center">
          <div className="text-lg font-medium">Loading product data...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
      <ToastContainer position="top-right" autoClose={3000} />
      <SideBar activeLink="product" />

      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Update Product
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

              {/* Related Products Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Related Products
                </label>
                <Select
                  isMulti
                  options={relatedOptions}
                  value={relatedProducts}
                  onChange={handleRelatedChange}
                  formatOptionLabel={formatOptionLabel}
                  getOptionValue={option => option.value}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select related products..."
                  noOptionsMessage={() => "No products available"}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      padding: '8px 12px',
                    }),
                    control: (provided) => ({
                      ...provided,
                      minHeight: '44px',
                    }),
                  }}
                />
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
              {(existingImages.length > 0 || previewImages.length > 0) && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Selected Images
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {existingImages.map((img, index) => (
                      <div key={`existing-${index}`} className="relative group">
                        <img
                          src={img.url}
                          alt={`Existing ${index}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, true)}
                          className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {previewImages.map((img, index) => (
                      <div key={`new-${index}`} className="relative group">
                        <img
                          src={img.url}
                          alt={`Preview ${index}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index + existingImages.length, false)
                          }
                          className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              Update Product
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UpdateProduct;