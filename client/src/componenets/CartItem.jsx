import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useAppContext } from "../context/appContext";

const CartItem = ({
  _id,
  image,
  name,
  price,
  inventory,
  flavour,
  quantity,
  index,
}) => {
  const { updatecartitemquantity, removeItemFromCart } = useAppContext();
  return (
    <article className="lg:flex lg:justify-between">
      <div className="lg:flex lg:gap-x-4  w-2/4">
        <img src={image} alt={name} className="w-1/6 block" />
        <div className="lg:flex lg:flex-col lg:justify-between">
          <h2 className="text-lg font-semibold text-thulian-pink">{name}</h2>
          <p>{flavour}</p>
          <button className="" onClick={() => removeItemFromCart(_id)}>
            <RiDeleteBin6Line className="text-rose-600" />
          </button>
        </div>
      </div>
      <div className="lg:flex lg:gap-x-6  w-1/2 lg:justify-between lg:items-center">
        <div className="flex justify-between items-center  w-24 ">
          <button
            type="button"
            onClick={() => {
              updatecartitemquantity(_id, "decrement", index);
            }}
          >
            <AiOutlineMinus />
          </button>
          <p className="border-thulian-pink-light border px-4 py-2">
            {quantity}
          </p>
          <button
            type="button"
            onClick={() => {
              updatecartitemquantity(_id, "increment", index);
            }}
          >
            <AiOutlinePlus />
          </button>
        </div>
        <div className=" text-center  w-32">Rs {price}</div>
        <div className="text-center w-2/5">Rs {quantity * price}</div>
      </div>
    </article>
  );
};

export default CartItem;
