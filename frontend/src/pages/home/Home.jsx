import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Button from "../../components/Button";
import CollectionCards from "./CardCollections";
import Gallery from "./Gallery";
import TopCategoriesCarousel from "./TopCategories";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/getAllProducts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading products...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1556909212-d5b604d0c90d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
          backgroundColor: "#f5f5f5",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Design Your Kitchen with the Experts
          </h1>
          <p className="text-lg md:text-xl mb-6">
            We bring a touch of elegance to your home.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300">
            Get Started
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-8">
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-yellow-500">25</span> Years of Excellence in Online Shopping
            </h2>
            <p className="text-lg mb-6">
              Your one-stop destination for premium products and unbeatable deals.
            </p>
            <p className="text-base mb-6">
              With over two decades of experience, we bring you the best selection of high-quality products at competitive prices. Whether you're looking for the latest trends, everyday essentials, or exclusive collections, we've got it all. Shop with confidence and enjoy seamless service.
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300">
              Shop Now
            </Button>
          </div>
          <div className="md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="About Our Store"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1556909211-d5b604d0c90d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }}
            />
          </div>
        </div>
      </section>
      
      <CollectionCards products={products} />
      <TopCategoriesCarousel />
      
      <Gallery />
    </Layout>
  );
};

export default Home;