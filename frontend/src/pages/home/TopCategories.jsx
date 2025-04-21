import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, title: "Earphone & Headphone", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=60" },
  { id: 2, title: "Mobile Phone & Computer", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60" },
  { id: 3, title: "Computer Hardware", img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60" },
  { id: 4, title: "Used Electronics", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=60" },
  { id: 5, title: "Portable Audio", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60" },
  { id: 6, title: "Cables & Accessories", img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60" },
  { id: 7, title: "Television, Home Audio", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=60" },
  { id: 8, title: "Smart Electronics", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60" },
  { id: 9, title: "Mobile Accessories", img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60" },
  { id: 10, title: "TV Receiver", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60" },
  { id: 11, title: "Clothing & Fashion", img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60" },
];

const TopCategoriesCarousel = () => {
  const controls = useAnimation();

  const startAnimation = () => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        ease: "linear",
        duration: 60,
        repeat: Infinity,
      },
    });
  };

  const stopAnimation = () => {
    controls.stop();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-[76rem] px-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Top Categories
        </h2>
      </div>

      <div className="bg-gray-200 py-6">
        <div className="container mx-auto max-w-[76rem] overflow-hidden px-4">
          <motion.div className="flex gap-6 w-max" animate={controls}>
            {[...categories, ...categories].map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 md:w-36 flex flex-col items-center text-center"
                onMouseEnter={stopAnimation}
                onMouseLeave={startAnimation}
              >
                {/* Link wrapped around the image */}
                <Link to={`/product-detail/${category.id}`} className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Link>
                <p className="mt-2 text-xs md:text-sm text-gray-700 truncate w-full">{category.title}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TopCategoriesCarousel;
