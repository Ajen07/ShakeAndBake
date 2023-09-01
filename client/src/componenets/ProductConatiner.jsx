import React from "react";
import Product from "./Product";
import { useAppContext } from "../context/appContext";

const ProductConatiner = () => {
  const { products } = useAppContext();
  return (
    <section className="max-w-7xl mx-auto flex flex-col items-center justify-center w-[320px] lg:w-full md:grid md:grid-cols-2 gap-y-8 lg:grid lg:grid-cols-3 lg:gap-x-4 2xl:px-4">
      {products.map((product) => {
        const { name, price, image, averageRating, _id, freeDelivery } =
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
          />
        );
      })}
    </section>
  );
};

export default ProductConatiner;
