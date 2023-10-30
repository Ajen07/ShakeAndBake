import React from "react";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import star from "../assets/star.png";

const Product = ({ name, price, _id, averageRating, freeDelivery, image,ratingCount }) => {
  const { deleteProduct, setEditId, user, addToCart } = useAppContext();
  return (
    <article className="card w-96 bg-base-100 border hover:shadow-2xl hover:-translate-y-4 transition-all h-1/2 lg:h-3/4 ">
      <figure>
        <img src={image} alt="Shoes" className="" />
      </figure>
      <div className="card-body">
        <div className="flex  flex-col">
          <h1 className="card-title text-2xl lg:text-3xl text-thulian-pink">
            {name}
          </h1>
          <div>
            {parseFloat(averageRating) === 0 ? null : (
              <div className="flex items-center gap-x-2">
                <span>{averageRating}</span>
                <img
                  src={star}
                  alt="Rating"
                  title="product rating"
                  className="w-[25px] h-8 inline-block self-start"
                />
                <span>&#40;{ratingCount}&#41;</span>
              </div>
            )}
          </div>
        </div>
        <h2 className="text-2xl">Rs.{price}</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit magni
          commodi, ex atque repudiandae necessitatibus veritatis .
        </p>
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
  
}
