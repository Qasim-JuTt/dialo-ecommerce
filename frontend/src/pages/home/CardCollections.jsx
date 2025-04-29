import React from "react";
import Card from "../../components/Card";

const CollectionCards = ({ products = [] }) => {
  return (
    <div className="mt-8">
      <Card products={products} />
    </div>
  );
};

export default CollectionCards;