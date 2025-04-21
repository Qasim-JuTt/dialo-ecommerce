import React from "react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=500&q=80",
      height: "h-48",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60",
      height: "h-64",
    },
    {
      id: 3,
      src: "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?w=500&auto=format&fit=crop&q=60",
      height: "h-40",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60",
      height: "h-48",
    },
    {
      id: 5,
      src: "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?w=500&auto=format&fit=crop&q=60",
      height: "h-40",
    },
    {
      id: 6,
      src: "https://plus.unsplash.com/premium_photo-1675186049222-0b5018db6ce9?w=500&auto=format&fit=crop&q=60",
      height: "h-64",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=500&q=80",
      height: "h-72",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=500&q=80",
      height: "h-48",
    },
    {
      id: 9,
      src: "https://plus.unsplash.com/premium_photo-1675186049222-0b5018db6ce9?w=500&auto=format&fit=crop&q=60",
      height: "h-64",
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-8">
      <h2 className="text-gray-800 text-2xl font-bold mb-4">Gallery</h2>
      <p className="text-gray-600 text-center max-w-lg mb-6">
        These are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {images.map((item) => (
          <Link key={item.id} to={`/product-detail/${item.id}`}>
            <img
              src={item.src}
              alt={`Gallery Item ${item.id}`}
              className={`w-full ${item.height} object-cover rounded-2xl transition-transform duration-300 hover:scale-105`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
