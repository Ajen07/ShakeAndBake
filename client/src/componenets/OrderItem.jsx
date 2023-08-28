import React from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ _id, slno}) => {
  return (
    <div className="flex gap-x-8 border hover:shadow-xl items-center py-6 px-12 rounded-xl">
      <h3 className="">{slno}</h3>
      <p className="text-thulian-pink" title="orderId">{_id}</p>
      <Link to={`${_id}`} className="btn btn-secondary">view</Link>
    </div>
  );
};

export default OrderItem;
