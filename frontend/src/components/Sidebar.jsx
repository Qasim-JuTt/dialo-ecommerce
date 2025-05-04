import { useState } from 'react';
import {
  Home,
  ShoppingCart,
  Package,
  Heart,
  User,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', icon: <Home />, path: '/' },
    { name: 'Place Orders', icon: <Package />, path: '/orders' },
    { name: 'My Accounts', icon: <User />, path: '/account' },
    { name: 'Wishlist', icon: <Heart />, path: '/wishlist' },
    { name: 'Cart', icon: <ShoppingCart />, path: '/cart' },
    { name: 'Settings', icon: <Settings />, path: '/settings' },
    { name: 'Logout', icon: <LogOut />, path: '/logout' },
  ];

  return (
    <div className="flex">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-white  p-4">
        <h2 className="text-2xl font-bold mb-6">eShop</h2>
        <nav className="space-y-4">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.path}
              className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {isOpen && (
          <div className="absolute top-16 left-0 w-64 bg-white shadow-lg p-4 z-50">
            <h2 className="text-xl font-bold mb-4">eShop</h2>
            <nav className="space-y-3">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.path}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
