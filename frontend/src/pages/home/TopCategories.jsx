import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const categories = [
  { title: "Earphone & Headphone", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=60" },
  { title: "Mobile Phone & Computer", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60" },
  { title: "Computer Hardware", img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60" },
  { title: "Used Electronics", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=60" },
  { title: "Portable Audio", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60" },
  { title: "Cables & Accessories", img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60" },
  { title: "Television, Home Audio", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=60" },
  { title: "Smart Electronics", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60" },
  { title: "Mobile Accessories", img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60" },
  { title: "TV Receiver", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60" },
  {
    title: "Clothing & Fashion",
    img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60",
  },
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
    <div className="bg-gray-200 py-6 container mx-auto max-w-[76rem]">
      <div className=" mx-auto overflow-hidden">
        <motion.div className="flex gap-6 w-max" animate={controls}>
          {[...categories, ...categories].map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-28 md:w-36 flex flex-col items-center text-center"
              onMouseEnter={stopAnimation}
              onMouseLeave={startAnimation}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <a
                href="#"
                className="mt-2 text-xs md:text-sm text-gray-700 truncate w-full hover:text-blue-600"
              >
                {category.title}
              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TopCategoriesCarousel;
