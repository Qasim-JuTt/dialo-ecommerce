import { useState, useRef, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from 'react-router-dom';

import {
  Home,
  Package,
  User,
  Heart,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react"; // Assuming you're using lucide-react for these icons
import { useCart } from "../context/CartContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const menuButtonRef = useRef(null);
  const [menuTop, setMenuTop] = useState(64);
  const { totalItems } = useCart(); // get live totalItems

  useEffect(() => {
    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuTop(rect.bottom + window.scrollY);
    }
  }, [menuOpen]);

  const links = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    { name: "Place Orders", icon: <Package size={18} />, path: "/orders" },
    { name: "My Account", icon: <User size={18} />, path: "/account" },
    { name: "Wishlist", icon: <Heart size={18} />, path: "/wishlist" },
    { name: "Cart", icon: <ShoppingCart size={18} />, path: "/cart" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
    { name: "Logout", icon: <LogOut size={18} />, path: "/logout" },
  ];

  const categories = [
    {
      name: "Clothes",
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Kids' Clothing",
        "Accessories",
      ],
    },
    {
      name: "Electronics",
      subcategories: ["Phones", "Laptops", "Tablets", "TVs", "Cameras"],
    },
    {
      name: "Fashion",
      subcategories: ["Shoes", "Bags", "Watches", "Jewelry"],
    },
    {
      name: "Home & Garden",
      subcategories: ["Furniture", "Lighting", "Kitchenware", "Decor"],
    },
    {
      name: "Beauty & Health",
      subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances"],
    },
    {
      name: "Toys & Hobbies",
      subcategories: ["Action Figures", "Dolls", "Puzzles", "Board Games"],
    },
    {
      name: "Automobiles",
      subcategories: ["Car Parts", "Car Care", "Motorcycle Accessories"],
    },
    {
      name: "Sports & Outdoors",
      subcategories: ["Fitness", "Camping", "Cycling", "Team Sports"],
    },
  ];

  return (
<div className="sticky top-0 z-10">
{/* Top Header */}
<header className="bg-white p-4 flex items-center justify-between sticky top-0 z-20">
{/* Logo */}
        <div className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="text-orange-500">Dia</span>lo
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-4 relative">
          <input
            type="text"
            placeholder="I'm shopping for..."
            className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button className="bg-black text-white p-2 rounded-r-md">
            <FaSearch />
          </button>
        </div>

        {/* Icons and Auth/User Dropdown */}
        <div className="flex items-center space-x-4">
          {/* User Icon with Dropdown */}
          <div
            className="relative hidden md:flex items-center"
            onMouseEnter={() => setUserMenuOpen(true)}
            onMouseLeave={() => setUserMenuOpen(false)}
          >
            <button className="text-gray-700">
              <FaUser size={20} />
            </button>
            {userMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md border z-20 w-48 p-2 space-y-2">
                {links.map((link, index) => (
                  <button
                    key={index}
                    className="flex items-center w-full text-left hover:bg-gray-100 p-2 space-x-2"
                    onClick={() => (window.location.href = link.path)}
                  >
                    {link.icon}
                    <span className="text-sm">{link.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/cart" className="text-gray-700 relative">
      <FaShoppingCart size={20} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 rounded-full">
          {totalItems}
        </span>
      )}
    </Link>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <IoMenu size={24} />
          </button>
        </div>
      </header>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white shadow-md p-3 flex items-center justify-between md:px-10  sticky top-16 z-10">
      {/* Categories Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setCategoriesOpen(true)}
          onMouseLeave={() => {
            setCategoriesOpen(false);
            setActiveCategory(null);
          }}
        >
          <button className="flex items-center text-gray-700 font-medium px-4 py-2 border rounded-md">
            <IoMenu className="mr-2" /> All Categories
          </button>
          {categoriesOpen && (
            <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md border z-10 flex">
              {/* Main Categories */}
              <ul className="w-52 p-2 space-y-2 border-r">
                {categories.map((cat, i) => (
                  <li
                    key={i}
                    onMouseEnter={() => setActiveCategory(i)}
                    className={`p-2 ${
                      activeCategory === i ? "bg-gray-100" : ""
                    }`}
                  >
                    <button className="w-full text-left flex justify-between items-center">
                      {cat.name}
                      {cat.subcategories && <IoMdArrowDropdown />}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Subcategories */}
              {activeCategory !== null &&
                categories[activeCategory].subcategories && (
                  <ul className="w-52 p-2 space-y-2">
                    {categories[activeCategory].subcategories.map(
                      (subcat, j) => (
                        <li key={j}>
                          <button className="w-full text-left p-2 hover:bg-gray-100">
                            {subcat}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                )}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium relative">
          <li>
            <button className="hover:text-red-500">Bundle Deals</button>
          </li>
          <li>
            <button className="hover:text-red-500">Choice</button>
          </li>
          <li>
            <button className="hover:text-red-500">SuperDeals</button>
          </li>
          <li>
            <button className="hover:text-red-500">Dialo Business</button>
          </li>
          <li>
            <button className="hover:text-red-500">Home & Garden</button>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="hover:text-red-500 flex items-center">
              More <IoMdArrowDropdown className="ml-1" />
            </button>
            {moreOpen && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md border p-2 z-20 space-y-2 w-40">
                <li>
                  <button className="w-full text-left hover:bg-gray-100 p-2">
                    Toys
                  </button>
                </li>
                <li>
                  <button className="w-full text-left hover:bg-gray-100 p-2">
                    Beauty
                  </button>
                </li>
                <li>
                  <button className="w-full text-left hover:bg-gray-100 p-2">
                    Gaming
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute left-0 w-full bg-white shadow-md md:hidden z-20"
          style={{ top: `${menuTop}px` }}
        >
          <ul className="p-4 space-y-2">
            <li>
              <button
                className="w-full text-left border-b p-2 flex justify-between items-center"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                All Categories
                <IoMdArrowDropdown
                  className={`transition-transform ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {categoriesOpen && (
                <ul className="pl-4 space-y-2 mt-2">
                  {categories.map((cat, i) => (
                    <li key={i}>
                      <button className="w-full text-left p-2">
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <button className="w-full text-left border-b p-2 text-red-500">
                Bundle Deals
              </button>
            </li>
            <li>
              <button className="w-full text-left border-b p-2">Choice</button>
            </li>
            <li>
              <button className="w-full text-left border-b p-2">
                SuperDeals
              </button>
            </li>
            <li>
              <button className="w-full text-left border-b p-2">
                Dialo Business
              </button>
            </li>
            <li>
              <button className="w-full text-left border-b p-2">
                Home & Garden
              </button>
            </li>
            <li className="relative">
              <button
                className="w-full text-left border-b p-2 flex justify-between items-center"
                onClick={() => setMoreOpen(!moreOpen)}
              >
                More
                <IoMdArrowDropdown
                  className={`transition-transform ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {moreOpen && (
                <ul className="pl-4 space-y-2 mt-2">
                  <li>
                    <button className="w-full text-left p-2">Toys</button>
                  </li>
                  <li>
                    <button className="w-full text-left p-2">Beauty</button>
                  </li>
                  <li>
                    <button className="w-full text-left p-2">Gaming</button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
