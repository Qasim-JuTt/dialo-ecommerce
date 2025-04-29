import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../../components/admin/SideBar";

const UpdateInventoryDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    color: "",
    mainCategory: "T-Shirt",
    category: "Men",
    quantity: "",
    status: "In Stock",
    images: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const clothingTypes = [
    "T-Shirt", "Shirt", "Jeans", "Pants", "Shorts", "Jacket",
    "Sweater", "Hoodie", "Dress", "Skirt", "Activewear",
    "Swimwear", "Underwear", "Socks", "Footwear", "Accessory"
  ];

  const genderCategories = ["Men", "Women", "Unisex", "Kids", "Baby"];

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/inventory/fetchSingle/${id}`);
        const data = response.data;
        
        setProductData({
          name: data.name,
          color: data.color,
          mainCategory: data.mainCategory,
          category: data.category,
          quantity: data.quantity,
          status: data.status,
          images: data.images
        });
        
        const imageBaseUrl = "http://localhost:5000/uploads/"; // adjust path if needed
        setExistingImages(
          data.images.map((img) => ({
            url: img.includes('http') ? img : `${imageBaseUrl}${img}`,
            isExisting: true,
          }))
        );
        
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch product data");
        navigate("/admin/inventory");
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id, navigate]);

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
      file
    }));
    const updatedPreviews = [...previewImages, ...newPreviews];

    setSelectedFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  const removeNewImage = (index) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previewImages];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setSelectedFiles(newFiles);
    setPreviewImages(newPreviews);
  };

  const removeExistingImage = (index, imageUrl) => {
    const newExistingImages = [...existingImages];
    newExistingImages.splice(index, 1);
    setExistingImages(newExistingImages);
    
    setImagesToDelete(prev => [...prev, imageUrl]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("color", productData.color);
    formData.append("mainCategory", productData.mainCategory);
    formData.append("category", productData.category);
    formData.append("quantity", productData.quantity);
    formData.append("status", productData.status);

    // Append new images
    previewImages
      .filter(img => !img.isExisting)
      .forEach((img) => {
        formData.append("images", img.file);
      });

    // Append images to delete
    imagesToDelete.forEach((imageUrl) => {
      formData.append("imagesToDelete", imageUrl);
    });

    try {
      await axios.put(`http://localhost:5000/api/inventory/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product updated successfully!");
      navigate("/admin-inventory-page");

      // Reset form
      setProductData({
        name: "",
        color: "",
        mainCategory: "T-Shirt",
        category: "Men",
        quantity: "",
        status: "In Stock",
        images: [],
      });
      setSelectedFiles([]);
      setPreviewImages([]);
      setExistingImages([]);
      setImagesToDelete([]);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
        <SideBar activeLink="inventory" />
        <main className="flex-1 p-4 md:p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading product data...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <SideBar activeLink="inventory" />

      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            {id ? "Update Clothing Item" : "Add New Clothing Item"}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={productData.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clothing Type
                </label>
                <select
                  name="mainCategory"
                  value={productData.mainCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  {clothingTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  {genderCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={productData.quantity}
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
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
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

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Current Images
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {existingImages.map((image, index) => (
                      <div key={`existing-${index}`} className="relative group">
                        <img
                          src={image.url}
                          alt={`Existing ${index}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index, image.url)}
                          className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Image Previews */}
              {previewImages.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    New Images
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {previewImages.map((image, index) => (
                      <div key={`new-${index}`} className="relative group">
                        <img
                          src={image.url}
                          alt={`Preview ${index}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
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
            <Link to="/admin/inventory">
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
              {id ? "Update Clothing Item" : "Add Clothing Item"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UpdateInventoryDetail;