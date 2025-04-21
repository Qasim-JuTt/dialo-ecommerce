import React, { useState, useRef } from "react";
import Layout from "../../layout/Layout";
import ShippingInfo from "../../components/ShippingInfo";
import Card from "../../components/Card";
import ProductBrandDetails from "./ProductBrandDetail";
import { useParams } from "react-router-dom";
import { FiPlus, FiX } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();
  const thumbnails = [
    {
      img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=500&q=80",
    },
    {
      img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60",
    },
    {
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
    },
  ];

  const colorImages = [
    {
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
      name: "B-Navy",
    },
    {
      img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60",
      name: "Black",
    },
    {
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
      name: "Gray",
    },
    {
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
      name: "Blue",
    },
    {
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
      name: "Beige",
    },
  ];

  const sizes = ["M", "L", "XL", "XXL", "XXXL"];
  const [mainImage, setMainImage] = useState(thumbnails[2].img);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const imgRef = useRef(null);

  const handleThumbnailClick = (img) => setMainImage(img);
  const handleColorClick = (img, index) => {
    setSelectedColor(index);
    setMainImage(img);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleBuyNow = () => {
    if (!address || !phoneNumber) {
      setError("Please add your address and phone number before purchasing");
      setShowAddressModal(true);
      return;
    }
    // Proceed with purchase
    alert(`Order placed successfully! Shipping to: ${address}`);
  };

  const handleSaveAddress = () => {
    if (!address.trim() || !phoneNumber.trim()) {
      setError("Both address and phone number are required");
      return;
    }
    setError("");
    setShowAddressModal(false);
  };

  const products = [
    {
      id: id,
      title: "Men's Casual Slim Fit T-Shirts (Pack of 3)",
      verified: true,
      price: "$24.99-29.99",
      minOrder: "2 pieces",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop&q=60",
      ],
      ad: true,
      link: "/product-detail",
    },
    {
      id: id,
      title: "Women's Floral Summer Dress",
      verified: true,
      price: "$35.50-45.80",
      minOrder: "1 piece",
      images: [
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60",
      ],
      ad: true,
      link: "/product-detail",
    },
    {
      id: id,
      title: "Unisex Hooded Sweatshirt (Multiple Colors)",
      verified: false,
      price: "$39.99",
      minOrder: "1 piece",
      images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1620799139834-6b8f8448be1b?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1620799139652-715e4d5b232d?w=500&auto=format&fit=crop&q=60",
      ],
      ad: true,
      link: "/product-detail",
    },
    {
      id: id,
      title: "Women's High-Waist Yoga Pants",
      verified: false,
      price: "$28.50",
      minOrder: "1 piece",
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1583744946564-b52d01e2da64?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop&q=60",
      ],
      ad: true,
      link: "/product-detail",
    },
    {
      id: id,
      title: "Men's Classic Denim Jeans",
      verified: false,
      price: "$49.99",
      minOrder: "1 piece",
      images: [
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1472749591034-046ab199b537?w=500&auto=format&fit=crop&q=60",
      ],
      ad: true,
      link: "/product-detail",
    },
    {
      id: id,
      title: "Women's Winter Knit Sweater",
      verified: false,
      price: "$45.00",
      minOrder: "1 piece",
      images: [
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1551488831-00ddcb6d6bd3?w=500&auto=format&fit=crop&q=60",
      ],
      ad: true,
      link: "/product-detail",
    },
  ];

  return (
    <Layout>
      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setShowAddressModal(false);
                setError("");
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium mb-4">Add Shipping Details</h3>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                  rows={4}
                  placeholder="Enter your full address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAddressModal(false);
                    setError("");
                  }}
                  className="px-4 py-2 border rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAddress}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                >
                  Save Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-screen-xl px-6 py-10 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT - Product Images */}
          <div className="flex-1">
            <div className="flex flex-col-reverse md:flex-row gap-6 mb-10">
              <div className="flex md:flex-col gap-3 overflow-x-auto">
                {thumbnails.map((item, index) => (
                  <img
                    key={index}
                    src={item.img}
                    onClick={() => handleThumbnailClick(item.img)}
                    className={`w-16 h-16 object-cover rounded border cursor-pointer hover:ring-2 ring-black ${
                      mainImage === item.img ? "ring-2 ring-black" : ""
                    }`}
                  />
                ))}
              </div>

              <div className="flex-1">
                <div
                  className="border rounded-xl overflow-hidden shadow w-full h-[500px] relative"
                  onMouseEnter={() => setShowZoom(true)}
                  onMouseLeave={() => setShowZoom(false)}
                  onMouseMove={handleMouseMove}
                  ref={imgRef}
                >
                  <img
                    src={mainImage}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                  {showZoom && (
                    <div
                      className="absolute inset-0 pointer-events-none overflow-hidden"
                      style={{
                        backgroundImage: `url(${mainImage})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: "200%",
                        backgroundRepeat: "no-repeat",
                        opacity: 0.8,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Product Details */}
          <div className="flex-1 max-w-2xl">
            <div className="space-y-6 pb-24 md:pb-0">
              <div className="bg-red-100 p-3 rounded-lg">
                <div className="text-red-600 font-bold text-lg">
                  PKR435{" "}
                  <span className="line-through text-gray-500">PKR870</span>{" "}
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                    50% off
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <div>- Wootenails</div>
                  <div className="ml-4">- S-pieces, extra 2% off</div>
                  <div className="ml-4">
                    - Tax excluded, add at checkout if applicable
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-semibold text-gray-900">
                Harajuku Oversized Cargo Parachute Pants Men Streetwear Vintage
                Y2k Hip Hop Wide Leg Joggers Baggy Casual Sweatpants Techwear
              </h1>

              {/* Sizes */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Size</p>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm ${
                        selectedSize === size
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-800"
                      } hover:bg-gray-100`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color and Quantity - Side by Side */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Colors */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Color: {colorImages[selectedColor].name}
                  </p>
                  <div className="flex gap-2">
                    {colorImages.map((color, index) => (
                      <img
                        key={index}
                        src={color.img}
                        onClick={() => handleColorClick(color.img, index)}
                        className={`w-10 h-10 object-cover border-2 cursor-pointer transition-all ${
                          selectedColor === index
                            ? "ring-2 ring-black"
                            : "hover:opacity-80 hover:ring-1 hover:ring-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="w-full max-w-xs">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </p>
                  <div className="flex items-center border rounded-md overflow-hidden w-full">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="flex-1 py-2 text-lg text-center bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="flex-1 py-2 text-center border-x">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="flex-1 py-2 text-lg text-center bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="border backdrop-blur-sm rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Shipping Details</h3>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <FiPlus className="w-4 h-4" />
                    {address && phoneNumber ? "Edit" : "Add"}
                  </button>
                </div>

                {address && phoneNumber ? (
                  <div className="text-sm text-gray-700">
                    <div className="font-medium">Address:</div>
                    <div className="mb-2">{address}</div>
                    <div className="font-medium">Phone:</div>
                    <div>{phoneNumber}</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    Please add your shipping address and phone number
                  </div>
                )}
              </div>

              {/* Buttons - Sticky on Mobile */}
              <div className="flex gap-4 mt-6 md:static fixed bottom-0 left-0 w-full bg-white p-4 border-t md:border-none md:p-0 z-40">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md font-medium"
                >
                  Buy now
                </button>
                <button className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-md font-medium">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products & Shipping Info */}
        <div className="mt-10 flex related-product-margin flex-col lg:flex-row gap-8 sm:mt-0">
          <div className="lg:w-3/4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              You may also like
            </h2>
            <Card products={products} />
            <ProductBrandDetails />
          </div>
          <div className="lg:w-1/4 mt-6">
            <div className="sticky top-24">
              <ShippingInfo />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;