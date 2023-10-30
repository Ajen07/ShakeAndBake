import React from "react";
import { Link } from "react-router-dom";

const OrderSingleItem = ({ name, image, price, quantity ,_id}) => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-3 mx-2 lg:mx-auto border shadow-inner">
      <div className="flex gap-x-8">
        <img src={image} alt={name} className="w-1/4 md:w-[20%]" />
        <div className="flex flex-col justify-evenly">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p>Price: Rs {price}</p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
      <p className=" md:self-center text-center mx-auto font-semibold">Amount:&nbsp;Rs&nbsp;{price * quantity}</p>
      <Link to={`/dashboard/products/${_id}`} className=" md:self-center mx-auto text-center btn w-1/2 btn-secondary">View Details</Link>
    </div>
  );
};

export default OrderSingleItem;
