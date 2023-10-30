import React, { useEffect } from "react";
import Product from "./Product";
import { useAppContext } from "../context/appContext";

const ProductConatiner = () => {
  const { products } = useAppContext();


  return (
    <section className="max-w-7xl mx-auto flex flex-col items-center justify-center w-[320px] lg:w-full md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 lg:gap-x-6 2xl:px-4">
      {products.map((product) => {
        const { name, price, image, averageRating, _id, freeDelivery ,ratingCount} =
          product;
        return (
          <Product
            key={_id}
            name={name}
            price={price}
            image={image}
            averageRating={averageRating}
            _id={_id}
            freeDelivery={freeDelivery}
            ratingCount={ratingCount}
          />
        );
      })}
    </section>
  );
};

export default ProductConatiner;

