import React from "react";
export default function Button({ children, onClick, className = "" }) {
    return (
      <button
        onClick={onClick}
        className={`px-6 py-3 text-lg font-semibold bg-white text-black rounded-lg shadow-lg hover:bg-gray-300 ${className}`}
      >
        {children}
      </button>
    );
  }