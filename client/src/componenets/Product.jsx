import React from "react";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import star from "../assets/star.png";

const Product = ({ name, price, _id, averageRating, freeDelivery, image }) => {
  const { deleteProduct, setEditId, user, addToCart } = useAppContext();
  return (
    <article className="card w-96 bg-base-100 border hover:shadow-2xl hover:-translate-y-4 transition-all h-1/2 lg:h-3/4">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h1 className="card-title text-2xl lg:text-3xl text-thulian-pink">
            {name}
          </h1>
          {averageRating !== 0 && (
            <div className="flex justify-center items-center gap-x-2">
              <p>{averageRating}</p>

              <img
                src={star}
                alt="Rating"
                title="product rating"
                className="w-[25px] h-8"
              />
            </div>
          )}
        </div>
        <h2 className="text-2xl">Rs.{price}</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit magni commodi, ex atque repudiandae necessitatibus veritatis .</p>
        <div className="card-actions justify-end mt-4">
          {user?.role === "admin" ? (
            <>
              <Link
                to={`/admin-home/products/${_id}`}
                className="btn btn-accent text-white"
              >
                View
              </Link>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => deleteProduct(_id)}
              >
                Delete
              </button>
              <Link
                type="button"
                className="btn btn-secondary"
                to="/admin-home/add-product"
                onClick={() => setEditId(_id)}
              >
                Update
              </Link>
            </>
          ) : (
            <>
              <button
                className="btn btn-accent text-white"
                onClick={() => {
                  addToCart(_id);
                }}
              >
                Add To Cart
              </button>
              <Link
                to={`/dashboard/products/${_id}`}
                className="btn btn-secondary"
              >
                View
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default Product;

{
  /* <article className="flex flex-col border border-thulian-pink rounded-lg h-5/6">
      <img src={image} alt={name} className="w-full h-3/5 rounded-lg" />
      <div className="flex justify-between">
        <h2 className="text-xl lg:text-2xl">{name}</h2>
        <h3>Rs.{price}</h3>
      </div>
      {user?.role === "admin" ? (
        <div>
          <Link to={`/admin-home/products/${_id}`}>view</Link>
          <button type="button" onClick={() => deleteProduct(_id)}>
            Delete
          </button>
          <Link to="/admin-home/add-product" onClick={() => setEditId(_id)}>
            Update
          </Link>
        </div>
      ) : (
        <div>
          <Link to={`/dashboard/products/${_id}`}>view</Link>
          <button
            type="button"
            onClick={() => {
              addToCart(_id);
            }}
          >
            Add to Cart
          </button>
        </div>
      )}
    </article> */
}
