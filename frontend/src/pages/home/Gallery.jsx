import React from "react";

const Gallery = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-8">
      <h2 className="text-gray-800 text-2xl font-bold mb-4">Gallery</h2>
      <p className="text-gray-600 text-center max-w-lg mb-6">
        These are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full">
        <img
          src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=500&q=80"
          alt="Gallery Item"
          className="w-full h-48 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60"
          alt="Gallery Item"
          className="w-full h-64 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?w=500&auto=format&fit=crop&q=60"
          alt="Gallery Item"
          className="w-full h-40 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60"
          alt="Gallery Item"
          className="w-full h-48 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?w=500&auto=format&fit=crop&q=60"
          alt="Gallery Item"
          className="w-full h-40 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://plus.unsplash.com/premium_photo-1675186049222-0b5018db6ce9?w=500&auto=format&fit=crop&q=60"
          alt="Gallery Item"
          className="w-full h-64 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=500&q=80"
          alt="Gallery Item"
          className="w-full h-72 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=500&q=80"
          alt="Gallery Item"
          className="w-full h-48 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://plus.unsplash.com/premium_photo-1675186049222-0b5018db6ce9?w=500&auto=format&fit=crop&q=60"
          alt="Gallery Item"
          className="w-full h-64 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Gallery;
