// ShopPage.jsx (or any parent component)
import React from "react";
import Card from "../../components/Card";

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
    link: "/product-detail"
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
    link: "/product-detail"
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
    link: "/product-detail"
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
    link: "/product-detail"
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
    link: "/product-detail"
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
    link: "/product-detail"
  }
];

const CollectionCards = () => {
  return (
    <div className="mt-8">
      <Card products={products} />
    </div>
  );
};

export default CollectionCards;
