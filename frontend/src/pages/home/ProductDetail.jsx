import React, { useState, useRef, useEffect } from "react";
import Layout from "../../layout/Layout";
import Card from "../../components/Card";
import ProductBrandDetails from "./ProductBrandDetail";
import { useParams, useNavigate } from "react-router-dom";
import { FiPlus, FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useCart } from "../../context/CartContext";
import { ToastContainer, toast } from 'react-toastify';


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({
    phoneOrEmail: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const { addToCart } = useCart();

  // Products array defined at the top
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
  ];

  const product = products[0];

  // Check for user in localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const imgRef = useRef(null);

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
  
    addToCart({
      id: product.id,
      name: product.title,
      image: mainImage,
      price: parseFloat(product.price.replace('$', '')),
      selectedColor: colorImages[selectedColor].name,
      selectedSize: selectedSize,
      quantity: quantity,
    });
  
    toast.success(`${product.title} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  

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
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    navigate("/checkout");
  };

  const handleGoogleSignUp = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.phoneOrEmail || !loginForm.password) {
      setLoginError("Please enter both phone/email and password");
      return;
    }

    const userData = {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setShowLoginModal(false);
    setLoginError("");
  };

  return (
    <Layout>
      {/* Add ToastContainer at the root of your component */}
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setShowLoginModal(false);
                setLoginError("");
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium mb-6 text-center">Login</h3>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="text-red-500 text-sm text-center">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone or Email
                </label>
                <input
                  type="text"
                  name="phoneOrEmail"
                  value={loginForm.phoneOrEmail}
                  onChange={handleLoginChange}
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="Please enter your Phone or Email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="Please enter your password"
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              >
                LOGIN
              </button>

              <div className="text-center text-sm">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setShowLoginModal(false);
                      setShowSignupModal(true);
                    }}
                  >
                    Sign up
                  </button>
                </p>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    Or, login with
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <FcGoogle className="text-xl" />
                  <span className="text-sm font-medium">
                    Sign up with Google
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowSignupModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium mb-6 text-center">Create Account</h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  const userData = {
                    id: "123",
                    name: "New User",
                    email: "new@example.com",
                  };
                  localStorage.setItem("user", JSON.stringify(userData));
                  setUser(userData);
                  setShowSignupModal(false);
                }}
              >
                SIGN UP
              </button>

              <div className="text-center text-sm">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setShowSignupModal(false);
                      setShowLoginModal(true);
                    }}
                  >
                    Login
                  </button>
                </p>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    Or, sign up with
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <FcGoogle className="text-xl" />
                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </button>
              </div>
            </form>
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

              {/* Buttons - Sticky on Mobile */}
              <div className="flex gap-4 mt-6 md:static fixed bottom-0 left-0 w-full bg-white p-4 border-t md:border-none md:p-0 z-40">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md font-medium"
                >
                  Buy now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products & Brand Details */}
        <div className="mt-10 flex related-product-margin flex-col lg:flex-row gap-8 sm:mt-0">
          <div className="w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              You may also like
            </h2>
            <Card products={products} />
            <ProductBrandDetails />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;