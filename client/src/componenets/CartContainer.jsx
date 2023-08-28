import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { HiArrowLongLeft } from "react-icons/hi2";

const CartContainer = () => {
  const { cartItems, updateTotalAmount, totalAmount, totalQuantity } =
    useAppContext();
  useEffect(() => {
    if (cartItems.length) {
      updateTotalAmount();
    }
  }, [cartItems]);
  if (cartItems.length === 0) {
    return (
      <h1 className="text-center text-2xl text-thulian-pink-md mt-8 font-extrabold uppercase">
        No items in the cart
      </h1>
    );
  }
  return (
    <>
      <main className="max-w-7xl mx-auto lg:flex mt-8">
        <section className="flex-col flex gap-y-6 max-w-4xl">
          <div className="flex justify-between py-6 items-center">
            <h2 className="text-2xl font-bold">My Shopping Cart</h2>
            <h4 className="text-2xl px-8">{`${cartItems.length} Items`}</h4>
          </div>
          <hr />
          {cartItems.map((item, index) => {
            return <CartItem {...item} key={index} />;
          })}
        </section>
        <section className="px-4 bg-slate-100 w-1/2 py-6 flex flex-col justify-between items-center h-fit gap-y-4 self-end">
          <h2 className="text-2xl font-semibold self-start pl-4">
            Order Summary
          </h2>
          <div className="flex w-full px-4 justify-between">
            <p>Total Quantity</p>
            <p>{totalQuantity}</p>
          </div>
          <div className="flex w-full px-4 justify-between">
            <p>Total Amount</p>
            <p>Rs {totalAmount}</p>
          </div>
          <button
            type="button"
            className="bg-thulian-pink text-white w-4/5 py-1 hover:bg-fuchsia-500"
          >
            <Link to="/checkout">Proceed To Checkout</Link>
          </button>
        </section>
      </main>
      <Link
        to="/dashboard"
        className="max-w-7xl mx-auto mt-12 flex text-thulian-pink items-center gap-x-2"
      >
        <HiArrowLongLeft className="text-2xl" />
        <div>Continue Eating</div>
      </Link>
    </>
  );
};

export default CartContainer;
