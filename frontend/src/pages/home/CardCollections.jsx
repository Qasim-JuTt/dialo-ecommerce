import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CollectionCards = () => {
  const [imageIndices, setImageIndices] = useState({});

  const products = [
    {
      id: 1,
      title: "Men's Casual Slim Fit T-Shirts (Pack of 3)",
      verified: true,
      price: "$24.99-29.99",
      minOrder: "2 pieces",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop&q=60"
      ],
      ad: true,
      link: "/products/mens-casual-tshirts"
    },
    {
      id: 2,
      title: "Women's Floral Summer Dress",
      verified: true,
      price: "$35.50-45.80",
      minOrder: "1 piece",
      images: [
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60"
      ],
      ad: true,
      link: "/products/womens-floral-dress"
    },
    {
      id: 3,
      title: "Unisex Hooded Sweatshirt (Multiple Colors)",
      verified: false,
      price: "$39.99",
      minOrder: "1 piece",
      images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1620799139834-6b8f8448be1b?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1620799139652-715e4d5b232d?w=500&auto=format&fit=crop&q=60"
      ],
      ad: true,
      link: "/products/unisex-hoodie"
    },
    {
      id: 4,
      title: "Women's High-Waist Yoga Pants",
      verified: false,
      price: "$28.50",
      minOrder: "1 piece",
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1583744946564-b52d01e2da64?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop&q=60"
      ],
      ad: true,
      link: "/products/womens-yoga-pants"
    },
    {
      id: 5,
      title: "Men's Classic Denim Jeans",
      verified: false,
      price: "$49.99",
      minOrder: "1 piece",
      images: [
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1472749591034-046ab199b537?w=500&auto=format&fit=crop&q=60"
      ],
      ad: true,
      link: "/products/mens-denim-jeans"
    },
    {
      id: 6,
      title: "Women's Winter Knit Sweater",
      verified: false,
      price: "$45.00",
      minOrder: "1 piece",
      images: [
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1551488831-00ddcb6d6bd3?w=500&auto=format&fit=crop&q=60"
      ],
      ad: true,
      link: "/products/womens-knit-sweater"
    }
  ];

  // Handle individual image carousel navigation
  const nextImage = (productId) => {
    setImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % products.find(p => p.id === productId).images.length
    }));
  };

  const prevImage = (productId) => {
    const product = products.find(p => p.id === productId);
    setImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + product.images.length) % product.images.length
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
      
      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image carousel */}
            <div className="relative h-48 overflow-hidden group">
              {product.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`${product.title} - Image ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    (imageIndices[product.id] || 0) === idx ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              
              {/* Navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage(product.id);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage(product.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                aria-label="Next image"
              >
                <FiChevronRight className="w-4 h-4 text-gray-700" />
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageIndices(prev => ({ ...prev, [product.id]: idx }));
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      (imageIndices[product.id] || 0) === idx ? 'bg-white w-3' : 'bg-white/50'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
              
              {product.ad && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                  AD
                </span>
              )}
            </div>
            
            {/* Product info */}
            <div className="p-4">
              <a 
                href={product.link} 
                className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors"
              >
                {product.title}
              </a>
              
              {product.verified && (
                <div className="flex items-center mb-2">
                  <span className="text-blue-500 text-xs mr-1">Verified</span>
                  <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">{product.price}</p>
                <p className="text-xs text-gray-500">Min. Order: {product.minOrder}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionCards;