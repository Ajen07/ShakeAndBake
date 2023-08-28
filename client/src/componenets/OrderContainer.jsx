import React, { useEffect } from "react";
import OrderItem from "./OrderItem";
import { useAppContext } from "../context/appContext";

const OrderContainer = () => {
  const { orderedItems, orderedItemsArray } = useAppContext();
  useEffect(() => {
    orderedItems();
  }, []);
  return (
    <article className=" flex flex-col justify-center items-center gap-y-6">
      {orderedItemsArray.map((item, index) => {
        const { _id } = item;
        return <OrderItem key={_id} _id={_id} slno={index + 1} />;
      })}
    </article>
  );
};

export default OrderContainer;
