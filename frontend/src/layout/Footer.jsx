import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaShoppingCart
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-800 py-16">
      <div className="container mx-auto px-4">

        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">

          {/* Logo and Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <FaShoppingCart className="text-4xl text-teal-500" />
              <span className="text-3xl font-bold text-teal-500">ShopMate</span>
            </div>
            <p className="text-gray-700 font-medium mb-4">
              Your one-stop shop for all your fashion and electronics needs. Fast delivery and 24/7 customer support.
            </p>
            <p className="text-gray-700 font-medium mb-4 flex items-center">
              <FaPhoneAlt className="mr-2" /> +1 234 567 890
            </p>
            <p className="text-gray-700 font-medium flex items-center">
              <FaEnvelope className="mr-2" /> support@shopmate.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-teal-500 mb-6">Quick Links</h3>
            <ul className="space-y-4 text-gray-700 font-medium">
              <li><a href="/" className="hover:text-teal-500">Home</a></li>
              <li><a href="/shop" className="hover:text-teal-500">Shop</a></li>
              <li><a href="/about" className="hover:text-teal-500">About Us</a></li>
              <li><a href="/contact" className="hover:text-teal-500">Contact</a></li>
              <li><a href="/faq" className="hover:text-teal-500">FAQ</a></li>
              <li><a href="/terms" className="hover:text-teal-500">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold text-teal-500 mb-6">Customer Service</h3>
            <ul className="space-y-4 text-gray-700 font-medium">
              <li><a href="/shipping" className="hover:text-teal-500">Shipping & Delivery</a></li>
              <li><a href="/returns" className="hover:text-teal-500">Returns & Exchanges</a></li>
              <li><a href="/order-tracking" className="hover:text-teal-500">Order Tracking</a></li>
              <li><a href="/privacy" className="hover:text-teal-500">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-400 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">

            {/* Newsletter Signup */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Stay Updated</h3>
              <p className="text-gray-700 font-medium mb-4">Subscribe to our newsletter to get the latest offers and news!</p>
              <div className="flex items-center border border-teal-500 rounded-md">
                <input
                  type="email"
                  className="bg-white text-gray-800 px-4 py-2 rounded-l-md focus:outline-none"
                  placeholder="Enter your email"
                />
                <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md hover:bg-teal-600">
                  <FaArrowRight />
                </button>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <a href="https://facebook.com" className="text-gray-700 hover:text-teal-500 text-xl">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-gray-700 hover:text-teal-500 text-xl">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-gray-700 hover:text-teal-500 text-xl">
                <FaInstagram />
              </a>
              <a href="https://pinterest.com" className="text-gray-700 hover:text-teal-500 text-xl">
                <FaPinterest />
              </a>
              <a href="https://linkedin.com" className="text-gray-700 hover:text-teal-500 text-xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-600 font-medium mt-8">
            &copy; {new Date().getFullYear()} ShopMate. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  