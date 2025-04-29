import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Card = ({ products = [] }) => {
  const [imageIndices, setImageIndices] = useState({});

  const nextImage = (productId, images) => {
    setImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % images.length
    }));
  };

  const prevImage = (productId, images) => {
    setImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + images.length) % images.length
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product) => {
          // Create image URLs array
          const imageUrls = product.images?.map(img => 
            `http://localhost:5000/uploads/${img}`
          ) || [];
          
          const currentIndex = imageIndices[product._id] || 0;
          
          return (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/product-detail/${product._id}`} className="block">
                <div className="relative h-36 sm:h-48 overflow-hidden group">
                  {imageUrls.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`${product.title} - Image ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        currentIndex === idx ? "opacity-100" : "opacity-0"
                      }`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Available";
                      }}
                    />
                  ))}

                  {imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          prevImage(product._id, imageUrls);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft className="w-4 h-4 text-gray-700" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          nextImage(product._id, imageUrls);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                        aria-label="Next image"
                      >
                        <FiChevronRight className="w-4 h-4 text-gray-700" />
                      </button>

                      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                        {imageUrls.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setImageIndices(prev => ({
                                ...prev,
                                [product._id]: idx,
                              }));
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              currentIndex === idx ? "bg-white w-3" : "bg-white/50"
                            }`}
                            aria-label={`Image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {product.ad && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                      AD
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-2 sm:p-4">
                <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 line-clamp-2 leading-tight">
                  {product.title || product.name}
                </h3>

                {product.verified && (
                  <div className="flex items-center mb-2">
                    <span className="text-blue-500 text-xs mr-1">Verified</span>
                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <p className="text-sm sm:text-lg font-bold text-gray-900">
                    ${product.price}
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 sm:mt-0">
                    Min. Order: {product.minOrder || "1 piece"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;