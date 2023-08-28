import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useParams } from "react-router-dom";
import OrderSingleItem from "../componenets/OrderSingleItem";

const SingleOrderPage = () => {
  const { orderId } = useParams();
  const { getSingleOrder, order, isLoading, user, cancelOrder } =
    useAppContext();
  const { orderItems, status, _id, total } = order;
  const date = order?.updatedAt?.split("T")[0];
  useEffect(() => {
    getSingleOrder(orderId);
  }, []);
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <article className="mx-auto">
      <div className="w-full lg:flex justify-between text-xl mx-2 lg:mx-auto">
        <div>
          OrderId: <span className="font-bold">{_id}</span>
        </div>
        <div className="">
          Ordered On: <span className="font-bold">{date}</span>
        </div>
        <div className="">
          Total Amount: <span className="font-bold">Rs {total}</span>{" "}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 mt-16 border p-4 shadow-md">
        {orderItems?.map((item) => {
          return <OrderSingleItem key={item._id} {...item} />;
        })}
      </div>
      <h1 className="text-xl font-semibold mt-8">Delivery Details</h1>
      <div className="border mt-4 md:grid md:grid-cols-3 p-8 mb-16 shadow-md">
        <div className="text-center">
          <h2 className="font-semibold">Address To be Delivered:</h2>
          <p>{user.address}</p>
        </div>
        <div className="text-center">
          <h1 className="font-semibold">Contact:</h1>
          <p>{user.phoneNumber}</p>
        </div>
        {status === "paid" ? (
          <div className="text-center">
            <button
              className="btn btn-outline btn-error w-1/2 mx-auto"
              onClick={() => window.my_modal_1.showModal()}
            >
              Cancel Order
            </button>
          </div>
        ) : (
          <div
            className={
              status === "canceled"
                ? "text-center text-red-600 font-bold capitalize"
                : "text-center text-green-400 font-bold capitalize"
            }
          >
            {status}
          </div>
        )}
      </div>
      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h1 className="py-4 text-xl">Are you sure to cancel the order ?</h1>
          <div className="modal-action">
            <button className="btn" onClick={() => cancelOrder(_id)}>
              Yes
            </button>
            <button className="btn">No</button>
          </div>
        </form>
      </dialog>
    </article>
  );
};

export default SingleOrderPage;
