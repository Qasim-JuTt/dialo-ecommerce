import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Package,
  Users,
  LayoutDashboard,
  FileText,
  BarChart,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, to: '/' },
  { name: 'Orders', icon: <Package className="w-5 h-5" />, to: '/admin-order-page' },
  { name: 'Products', icon: <Package className="w-5 h-5" />, to: '/admin-product-page' },
  { name: 'Customers', icon: <Users className="w-5 h-5" />, to: '/admin-customer-page' },
  { name: 'Inventory', icon: <Package className="w-5 h-5" />, to: '/admin-inventory-page' },
  { name: 'Sales', icon: <FileText className="w-5 h-5" />, to: '/admin-sale-page' },
  { name: 'Reports', icon: <BarChart className="w-5 h-5" />, to: '/admin-report-page' },
];

const SideBar = ({ activeLink }) => {
  return (
    <aside className="min-h-screen bg-white shadow-lg w-full md:w-1/4 p-6 rounded-r-2xl">
      <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-10">
        Shop<span className="text-gray-800">Admin</span>
      </h1>

      <nav className="space-y-3 mb-10">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) => {
              // Dynamically check if activeLink matches the current 'name' or part of 'to'
              const isActiveLink = activeLink && item.name.toLowerCase().includes(activeLink.toLowerCase()) || isActive;
              return `flex items-center gap-3 px-3 py-2 rounded-lg transition 
                ${isActiveLink ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`;
            }}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
